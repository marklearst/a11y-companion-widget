import { calculateContrastRatioHex } from "../utils/contrast";
import type { ThemeConfig } from "./types";
import { normalizeHexColor } from "shared/hexColor";

export type AccentStepDirection = "lighter" | "darker";
export type ContrastMode = "light" | "dark";

export interface AccentStepPolicyMode {
  readonly primaryDirection: AccentStepDirection;
  readonly fallbackDirection: AccentStepDirection;
}

export interface AccentStepPolicy {
  readonly stepSize: number;
  readonly mode: Record<ContrastMode, AccentStepPolicyMode>;
  readonly stopCondition: "first-pass";
  readonly unresolvedBehavior: "fail-validation-no-silent-mutation";
  readonly thresholds: {
    readonly normalTextAA: number;
    readonly largeTextAA: number;
  };
}

export interface ResolvedAccentResult {
  accent: string;
  source: "input" | "mapped" | "stepped" | "unresolved";
  shadeStep: number;
}

interface BrandScaleEntry {
  shade: number;
  color: string;
}

const policyDirectionOffset: Record<AccentStepDirection, number> = {
  lighter: -1,
  darker: 1,
};

/**
 * Phase 2 deterministic accent-step policy.
 */
export const accentStepPolicy = {
  stepSize: 100,
  mode: {
    light: {
      primaryDirection: "darker",
      fallbackDirection: "lighter",
    },
    dark: {
      primaryDirection: "lighter",
      fallbackDirection: "darker",
    },
  },
  stopCondition: "first-pass",
  unresolvedBehavior: "fail-validation-no-silent-mutation",
  thresholds: {
    normalTextAA: 4.5,
    largeTextAA: 3.0,
  },
} as const satisfies AccentStepPolicy;

function buildBrandScale(theme: ThemeConfig): BrandScaleEntry[] {
  return Object.entries(theme.brand.purple)
    .map(([shade, color]) => {
      const normalizedColor = normalizeHexColor(String(color));
      if (!normalizedColor) {
        return null;
      }
      return {
        shade: Number(shade),
        color: normalizedColor,
      };
    })
    .filter(
      (entry): entry is BrandScaleEntry => {
        if (!entry) return false;
        return Number.isFinite(entry.shade);
      }
    )
    .sort((left, right) => left.shade - right.shade);
}

function parseHexRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function colorDistance(hexA: string, hexB: string): number {
  const [ar, ag, ab] = parseHexRgb(hexA);
  const [br, bg, bb] = parseHexRgb(hexB);
  return Math.sqrt(
    (ar - br) * (ar - br) +
      (ag - bg) * (ag - bg) +
      (ab - bb) * (ab - bb)
  );
}

function findNearestScaleIndex(scale: BrandScaleEntry[], accent: string): number {
  const exactIndex = scale.findIndex((entry) => entry.color === accent);
  if (exactIndex >= 0) return exactIndex;

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < scale.length; index += 1) {
    const distance = colorDistance(accent, scale[index].color);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}

function buildCandidateIndices(
  referenceIndex: number,
  scaleLength: number,
  mode: ContrastMode
): number[] {
  const result: number[] = [];
  const modePolicy = accentStepPolicy.mode[mode];
  const primaryOffset = policyDirectionOffset[modePolicy.primaryDirection];
  const fallbackOffset = policyDirectionOffset[modePolicy.fallbackDirection];

  const pushIndex = (index: number) => {
    if (index < 0 || index >= scaleLength) return;
    if (result.includes(index)) return;
    result.push(index);
  };

  pushIndex(referenceIndex);

  for (let delta = 1; delta < scaleLength; delta += 1) {
    pushIndex(referenceIndex + primaryOffset * delta);
  }

  for (let delta = 1; delta < scaleLength; delta += 1) {
    pushIndex(referenceIndex + fallbackOffset * delta);
  }

  return result;
}

function passesRequiredContrast(accent: string, backgrounds: string[]): boolean {
  const threshold = accentStepPolicy.thresholds.normalTextAA;
  for (const background of backgrounds) {
    const ratio = calculateContrastRatioHex(accent, background);
    if (typeof ratio !== "number" || ratio < threshold) {
      return false;
    }
  }
  return true;
}

/**
 * Resolve an accent color using deterministic stepping rules so runtime values
 * can meet required text contrast thresholds.
 */
export function resolveContrastSafeAccent(
  accent: string,
  mode: ContrastMode,
  theme: ThemeConfig,
  backgrounds: string[]
): ResolvedAccentResult {
  const normalizedAccent = normalizeHexColor(accent);
  const normalizedBackgrounds = backgrounds
    .map((value) => normalizeHexColor(value))
    .filter((value): value is string => Boolean(value));

  if (!normalizedAccent || normalizedBackgrounds.length === 0) {
    return {
      accent,
      source: "unresolved",
      shadeStep: 0,
    };
  }

  if (passesRequiredContrast(normalizedAccent, normalizedBackgrounds)) {
    return {
      accent: normalizedAccent,
      source: "input",
      shadeStep: 0,
    };
  }

  const scale = buildBrandScale(theme);
  if (scale.length === 0) {
    return {
      accent: normalizedAccent,
      source: "unresolved",
      shadeStep: 0,
    };
  }

  const referenceIndex = findNearestScaleIndex(scale, normalizedAccent);
  const referenceShade = scale[referenceIndex].shade;
  const candidateIndices = buildCandidateIndices(referenceIndex, scale.length, mode);

  for (const candidateIndex of candidateIndices) {
    const candidate = scale[candidateIndex];
    if (!passesRequiredContrast(candidate.color, normalizedBackgrounds)) {
      continue;
    }

    return {
      accent: candidate.color,
      source:
        candidate.color === normalizedAccent
          ? "input"
          : candidateIndex === referenceIndex
            ? "mapped"
            : "stepped",
      shadeStep: candidate.shade - referenceShade,
    };
  }

  return {
    accent: normalizedAccent,
    source: "unresolved",
    shadeStep: 0,
  };
}
