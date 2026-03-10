/**
 * Hook for checking color contrast from Figma selections.
 *
 * @remarks
 * Reads selected elements and calculates WCAG contrast ratios.
 *
 * @since 1.2.0
 */
import {
  getContrastNotice,
  type ContrastUnsupportedReason,
} from "shared/contrastMessages";
import { useUserPreferences } from "hooks/useUserPreferences";

const { widget } = figma;
const { useSyncedState } = widget;

type ColorKind = "solid" | "gradient";
type ContrastGrade = "AAA" | "AA" | "A" | "Failed";
type ContrastMeasurementMode = "exact" | "sampled-min";

export interface ContrastResult {
  ratio: number;
  ratioRaw: number;
  ratioDisplay: string;
  grade: ContrastGrade;
  measurementMode: ContrastMeasurementMode;
  swappable: boolean;
  passesAA: boolean;
  passesAAA: boolean;
  foreground: string;
  background: string;
  foregroundKind: ColorKind;
  foregroundStopCount?: number;
  foregroundStops?: Array<{
    position: number;
    color: string;
    alpha: number;
  }>;
  backgroundKind: ColorKind;
  backgroundStopCount?: number;
  backgroundStops?: Array<{
    position: number;
    color: string;
    alpha: number;
  }>;
  suggestion?: string;
}

type RgbaSample = {
  color: RGB;
  alpha: number;
  position?: number;
};

type PaintResolution =
  | { status: "none" }
  | { status: "image" }
  | { status: "mixed" }
  | { status: "multi" }
  | {
      status: "ok";
      kind: ColorKind;
      samples: RgbaSample[];
    };

type ContrastResolution =
  | {
      kind: "result";
      result: ContrastResult;
    }
  | {
      kind: "unsupported";
      reason: ContrastUnsupportedReason;
    };

const GRADIENT_TYPES = new Set<Paint["type"]>([
  "GRADIENT_LINEAR",
  "GRADIENT_RADIAL",
  "GRADIENT_ANGULAR",
  "GRADIENT_DIAMOND",
]);

function paintSupportsContrastSample(
  paint: Paint,
): paint is SolidPaint | GradientPaint {
  return paint.type === "SOLID" || GRADIENT_TYPES.has(paint.type);
}

/**
 * Calculates relative luminance for a color.
 */
function getLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates contrast ratio between two colors.
 */
function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getLuminance(color1.r * 255, color1.g * 255, color1.b * 255);
  const lum2 = getLuminance(color2.r * 255, color2.g * 255, color2.b * 255);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function clampAlpha(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

function extractRgbaSamplesFromPaint(
  paint: SolidPaint | GradientPaint,
): RgbaSample[] {
  if (paint.visible === false) return [];

  if (paint.type === "SOLID") {
    return [
      {
        color: paint.color,
        alpha: clampAlpha(paint.opacity ?? 1),
      },
    ];
  }

  const paintOpacity = clampAlpha(paint.opacity ?? 1);
  return paint.gradientStops.map((stop) => ({
    color: {
      r: stop.color.r,
      g: stop.color.g,
      b: stop.color.b,
    },
    alpha: clampAlpha(paintOpacity * clampAlpha(stop.color.a ?? 1)),
    position: stop.position,
  }));
}

function resolvePaint(
  paint: Paint | readonly Paint[] | typeof figma.mixed | null,
): PaintResolution {
  if (!paint) return { status: "none" };
  if (paint === figma.mixed) return { status: "mixed" };

  const paints = Array.isArray(paint) ? paint : [paint];
  const visible = paints.filter((entry) => entry.visible !== false);
  if (visible.length === 0) return { status: "none" };

  if (visible.some((entry) => entry.type === "IMAGE")) {
    return { status: "image" };
  }

  const supported = visible.filter((entry) =>
    paintSupportsContrastSample(entry),
  );
  if (supported.length === 0) return { status: "none" };

  // Multiple visible paints require full compositing and are not reliable here.
  if (supported.length > 1 || supported.length !== visible.length) {
    return { status: "multi" };
  }

  const source = supported[0];
  const samples = extractRgbaSamplesFromPaint(source);
  if (samples.length === 0) return { status: "none" };

  return {
    status: "ok",
    kind: source.type === "SOLID" ? "solid" : "gradient",
    samples,
  };
}

function toUnsupportedReason(
  status: Exclude<PaintResolution["status"], "ok" | "none">,
): ContrastUnsupportedReason {
  switch (status) {
    case "image":
      return "image";
    case "mixed":
      return "mixed-fills";
    case "multi":
      return "multi-fills";
  }
}

function blendOver(foreground: RGB, background: RGB, alpha: number): RGB {
  const a = clampAlpha(alpha);
  return {
    r: foreground.r * a + background.r * (1 - a),
    g: foreground.g * a + background.g * (1 - a),
    b: foreground.b * a + background.b * (1 - a),
  };
}

function colorsClose(a: RGB, b: RGB, epsilon = 0.0005): boolean {
  return (
    Math.abs(a.r - b.r) <= epsilon &&
    Math.abs(a.g - b.g) <= epsilon &&
    Math.abs(a.b - b.b) <= epsilon
  );
}

function samplesEquivalent(left: RgbaSample[], right: RgbaSample[]): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];
    if (!colorsClose(a.color, b.color)) return false;
    if (Math.abs(a.alpha - b.alpha) > 0.001) return false;
  }
  return true;
}

/**
 * Formats RGB color to hex string.
 */
function rgbToHex(color: RGB): string {
  const r = Math.round(color.r * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(color.g * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(color.b * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

function formatRatioDisplay(ratioRaw: number): string {
  // Do not round up threshold decisions in UI representation.
  const truncated = Math.floor(ratioRaw * 100) / 100;
  return truncated.toFixed(2);
}

function resolveGrade(ratioRaw: number): ContrastGrade {
  if (ratioRaw >= 7) return "AAA";
  if (ratioRaw >= 4.5) return "AA";
  if (ratioRaw >= 3) return "A";
  return "Failed";
}

function buildContrastResult(
  ratioRaw: number,
  foreground: RGB,
  background: RGB,
  foregroundKind: ColorKind,
  backgroundKind: ColorKind,
  swappable: boolean,
  foregroundStops?: ContrastResult["foregroundStops"],
  backgroundStops?: ContrastResult["backgroundStops"],
): ContrastResult {
  const grade = resolveGrade(ratioRaw);
  const passesAA = ratioRaw >= 4.5;
  const passesAAA = ratioRaw >= 7;

  let suggestion = "";
  if (ratioRaw < 3) {
    suggestion = "Contrast too low. Increase difference between colors.";
  } else if (ratioRaw < 4.5) {
    suggestion = "Large text only. Increase contrast for normal-size AA.";
  } else if (ratioRaw < 7) {
    suggestion = "Meets AA. Increase contrast for AAA.";
  }

  return {
    ratio: ratioRaw,
    ratioRaw,
    ratioDisplay: formatRatioDisplay(ratioRaw),
    grade,
    measurementMode:
      foregroundKind === "solid" && backgroundKind === "solid"
        ? "exact"
        : "sampled-min",
    swappable,
    passesAA,
    passesAAA,
    foreground: rgbToHex(foreground),
    background: rgbToHex(background),
    foregroundKind,
    foregroundStopCount:
      foregroundKind === "gradient" ? foregroundStops?.length : undefined,
    foregroundStops,
    backgroundKind,
    backgroundStopCount:
      backgroundKind === "gradient" ? backgroundStops?.length : undefined,
    backgroundStops,
    suggestion,
  };
}

function readNodePaint(
  node: BaseNode,
  key: "fills" | "strokes",
): Paint | readonly Paint[] | typeof figma.mixed | null {
  if (!(key in node)) return null;
  try {
    return (
      node as unknown as Record<
        string,
        Paint | readonly Paint[] | typeof figma.mixed
      >
    )[key];
  } catch {
    return null;
  }
}

function readNodeChildren(node: BaseNode): readonly BaseNode[] {
  if (!("children" in node)) return [];
  try {
    return node.children as readonly BaseNode[];
  } catch {
    return [];
  }
}

function readParent(node: BaseNode): BaseNode | null {
  if (!("parent" in node)) return null;
  try {
    return node.parent;
  } catch {
    return null;
  }
}

function readNodeOpacity(node: BaseNode): number {
  if (!("opacity" in node)) return 1;
  try {
    const value = (node as unknown as { opacity?: number }).opacity;
    return clampAlpha(value ?? 1);
  } catch {
    return 1;
  }
}

function resolveOpacityChain(node: BaseNode): number {
  let opacity = readNodeOpacity(node);
  let parent: BaseNode | null = readParent(node);
  while (parent) {
    opacity *= readNodeOpacity(parent);
    parent = readParent(parent);
  }
  return clampAlpha(opacity);
}

function serializeGradientStops(
  samples: RgbaSample[],
  opacityFactor = 1,
): Array<{ position: number; color: string; alpha: number }> {
  return samples
    .map((sample, index) => ({
      position:
        typeof sample.position === "number"
          ? sample.position
          : index / Math.max(samples.length - 1, 1),
      color: rgbToHex(sample.color),
      alpha: clampAlpha(sample.alpha * opacityFactor),
    }))
    .sort((left, right) => left.position - right.position);
}

function resolveForegroundPaint(node: SceneNode): PaintResolution {
  const fillPaint = readNodePaint(node, "fills");
  const fillResolution = resolvePaint(fillPaint);
  if (fillResolution.status === "ok") return fillResolution;
  if (
    fillResolution.status === "image" ||
    fillResolution.status === "mixed" ||
    fillResolution.status === "multi"
  ) {
    return fillResolution;
  }

  const strokePaint = readNodePaint(node, "strokes");
  return resolvePaint(strokePaint);
}

type BackgroundSource =
  | {
      kind: "ok";
      resolution: Extract<PaintResolution, { status: "ok" }>;
      node: BaseNode | null;
    }
  | {
      kind: "unsupported";
      reason: ContrastUnsupportedReason;
    };

function resolveBackgroundPaint(
  node: SceneNode,
  foregroundSamples: RgbaSample[],
): BackgroundSource {
  const inspectCandidate = (
    candidate: Paint | readonly Paint[] | typeof figma.mixed | null,
    sourceNode: BaseNode | null,
  ): BackgroundSource | null => {
    const resolution = resolvePaint(candidate);
    if (resolution.status === "none") return null;
    if (resolution.status === "ok") {
      if (samplesEquivalent(resolution.samples, foregroundSamples)) {
        return null;
      }
      return {
        kind: "ok",
        resolution,
        node: sourceNode,
      };
    }
    return {
      kind: "unsupported",
      reason: toUnsupportedReason(resolution.status),
    };
  };

  if (node.type === "FRAME") {
    const ownBackground = inspectCandidate(readNodePaint(node, "fills"), node);
    if (ownBackground) return ownBackground;
  }

  let parent: BaseNode | null = readParent(node);
  while (parent) {
    const parentBackground = inspectCandidate(
      readNodePaint(parent, "fills"),
      parent,
    );
    if (parentBackground) return parentBackground;
    parent = readParent(parent);
  }

  if ("backgrounds" in figma.currentPage) {
    const pageBackground = inspectCandidate(
      figma.currentPage.backgrounds,
      null,
    );
    if (pageBackground) return pageBackground;
  }

  return {
    kind: "unsupported",
    reason: "no-pair",
  };
}

function hasImagePaintWithin(node: BaseNode, depth = 0): boolean {
  const fills = resolvePaint(readNodePaint(node, "fills"));
  if (fills.status === "image") return true;
  const strokes = resolvePaint(readNodePaint(node, "strokes"));
  if (strokes.status === "image") return true;
  if (depth >= 2) return false;
  const children = readNodeChildren(node);
  for (const child of children) {
    if (hasImagePaintWithin(child, depth + 1)) {
      return true;
    }
  }
  return false;
}

function resolveContrastFromNode(node: SceneNode): ContrastResolution {
  const foregroundResolution = resolveForegroundPaint(node);
  if (foregroundResolution.status !== "ok") {
    if (foregroundResolution.status === "none") {
      return { kind: "unsupported", reason: "no-pair" };
    }
    return {
      kind: "unsupported",
      reason: toUnsupportedReason(foregroundResolution.status),
    };
  }

  const backgroundResolution = resolveBackgroundPaint(
    node,
    foregroundResolution.samples,
  );
  if (backgroundResolution.kind === "unsupported") {
    return backgroundResolution;
  }

  const backgroundPaint = backgroundResolution.resolution;
  if (
    foregroundResolution.kind === "gradient" &&
    backgroundPaint.kind === "gradient"
  ) {
    return {
      kind: "unsupported",
      reason: "two-gradients",
    };
  }

  const fallbackWhite: RGB = { r: 1, g: 1, b: 1 };
  const pageBackground =
    "backgrounds" in figma.currentPage
      ? resolvePaint(figma.currentPage.backgrounds)
      : { status: "none" as const };
  const baseBackground =
    pageBackground.status === "ok" && pageBackground.samples.length > 0
      ? pageBackground.samples[0].color
      : fallbackWhite;

  const foregroundOpacityFactor = resolveOpacityChain(node);
  const backgroundOpacityFactor = backgroundResolution.node
    ? resolveOpacityChain(backgroundResolution.node)
    : 1;

  let bestRatio = Number.POSITIVE_INFINITY;
  let bestForeground: RGB = fallbackWhite;
  let bestBackground: RGB = fallbackWhite;

  for (const bgSample of backgroundPaint.samples) {
    const effectiveBackground = blendOver(
      bgSample.color,
      baseBackground,
      bgSample.alpha * backgroundOpacityFactor,
    );

    for (const fgSample of foregroundResolution.samples) {
      const effectiveForeground = blendOver(
        fgSample.color,
        effectiveBackground,
        fgSample.alpha * foregroundOpacityFactor,
      );
      const candidateRatio = getContrastRatio(
        effectiveForeground,
        effectiveBackground,
      );
      if (candidateRatio < bestRatio) {
        bestRatio = candidateRatio;
        bestForeground = effectiveForeground;
        bestBackground = effectiveBackground;
      }
    }
  }

  if (!Number.isFinite(bestRatio)) {
    return { kind: "unsupported", reason: "no-pair" };
  }

  const foregroundStops =
    foregroundResolution.kind === "gradient"
      ? serializeGradientStops(
          foregroundResolution.samples,
          foregroundOpacityFactor,
        )
      : undefined;
  const backgroundStops =
    backgroundPaint.kind === "gradient"
      ? serializeGradientStops(backgroundPaint.samples, backgroundOpacityFactor)
      : undefined;
  // Allow swap preview for all supported contrast pairs, including gradient cases.
  // The ratio is symmetric and this unlocks useful "what-if" visual checks.
  const swappable = true;

  return {
    kind: "result",
    result: buildContrastResult(
      bestRatio,
      bestForeground,
      bestBackground,
      foregroundResolution.kind,
      backgroundPaint.kind,
      swappable,
      foregroundStops,
      backgroundStops,
    ),
  };
}

/**
 * Hook that provides contrast checking functionality.
 */
export function useContrastChecker() {
  const { preferences } = useUserPreferences();
  const { language } = preferences;
  const [contrastResult, setContrastResult] =
    useSyncedState<ContrastResult | null>("contrastResult", null);
  const [contrastNotice, setContrastNotice] = useSyncedState<string | null>(
    "contrastNotice",
    null,
  );
  const [contrastSwapped, setContrastSwapped] = useSyncedState<boolean>(
    "contrastSwapped",
    false,
  );

  const getNotice = (reason: ContrastUnsupportedReason) =>
    getContrastNotice(reason, language);

  /**
   * Checks contrast for currently selected elements.
   */
  const checkSelection = () => {
    try {
      const selection = figma.currentPage.selection;
      const node =
        selection.find((selectedNode) => selectedNode.type !== "WIDGET") ??
        null;
      if (!node) {
        setContrastResult(null);
        setContrastNotice(getNotice("no-selection"));
        setContrastSwapped(false);
        return;
      }

      if (hasImagePaintWithin(node)) {
        setContrastResult(null);
        setContrastNotice(getNotice("image"));
        setContrastSwapped(false);
        return;
      }

      const resolution = resolveContrastFromNode(node);
      if (resolution.kind === "result") {
        setContrastResult(resolution.result);
        setContrastNotice(null);
        setContrastSwapped(false);
        return;
      }

      setContrastResult(null);
      setContrastNotice(getNotice(resolution.reason));
      setContrastSwapped(false);
    } catch {
      // Ignore stale-node read errors from deleted or detached instance layers.
      setContrastResult(null);
      setContrastNotice(getNotice("stale-selection"));
      setContrastSwapped(false);
    }
  };

  /**
   * Clears the contrast result.
   */
  const clearResult = () => {
    setContrastResult(null);
    setContrastNotice(null);
    setContrastSwapped(false);
  };

  const toggleContrastSwap = () => {
    setContrastSwapped(!contrastSwapped);
  };

  return {
    contrastResult,
    contrastNotice,
    contrastSwapped,
    checkSelection,
    clearResult,
    toggleContrastSwap,
  };
}
