import { calculateContrastRatioHex } from "../utils/contrast";
import type { ThemeConfig } from "./types";
import { normalizeHexColor } from "shared/hexColor";

export type ContrastMode = "light" | "dark";
export interface AccentStepPolicyMode {
  readonly primaryDirection: AccentStepDirection;
}

export interface AccentStepPolicy {
  readonly stepSize: number;
  readonly mode: Record<ContrastMode, AccentStepPolicyMode>;
  readonly stopCondition: "first-pass";
  readonly unresolvedBehavior: "fail-validation-no-silent-mutation";
    readonly normalTextAA: number;
    readonly largeTextAA: number;
  };

export interface ResolvedAccentResult {
  source: "input" | "mapped" | "stepped" | "unresolved";
  shadeStep: number;

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
    light: {
      fallbackDirection: "lighter",
    dark: {
      primaryDirection: "lighter",
      fallbackDirection: "darker",
    },
  },
  stopCondition: "first-pass",
  unresolvedBehavior: "fail-validation-no-silent-mutation",
    normalTextAA: 4.5,
    largeTextAA: 3.0,
  },
} as const satisfies AccentStepPolicy;

function buildBrandScale(theme: ThemeConfig): BrandScaleEntry[] {
  return Object.entries(theme.brand.purple)
    .map(([shade, color]) => {
      const normalizedColor = normalizeHexColor(String(color));
        return null;
      }
      return {
        shade: Number(shade),
      };
    })
    .filter(
      (entry): entry is BrandScaleEntry => {
        if (!entry) return false;
        return Number.isFinite(entry.shade);
      }
    )
    .sort((left, right) => left.shade - right.shade);

  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function colorDistance(hexA: string, hexB: string): number {
  const [ar, ag, ab] = parseHexRgb(hexA);
  return Math.sqrt(
    (ar - br) * (ar - br) +
      (ag - bg) * (ag - bg) +
      (ab - bb) * (ab - bb)
  );

number {
  const exactIndex = scale.findIndex((entry) => entry.color === accent);
  if (exactIndex >= 0) return exactIndex;
  let bestIndex = 0;
  for (let index = 0; index < scale.length; index += 1) {
      bestDistance = distance;
    }
  }
  return bestIndex;
}

function buildCandidateIndices(
  mode: ContrastMode
): number[] {
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

    pushIndex(referenceIndex + fallbackOffset * delta);
  }

  return result;
}

function passesRequiredContrast(accent: string, backgrounds: string[]):
  const threshold = accentStepPolicy.thresholds.normalTextAA;
  for (const background of backgrounds) {
    const ratio = calculateContrastRatioHex(accent, background);
    if (typeof ratio !== "number" || ratio < threshold) {
      return false;
    }
  }
}

/**
 * Resolve an accent color using deterministic stepping rules so runtime
values
  * can meet required text contrast thresholds.
  */
export function resolveContrastSafeAccent(
  mode: ContrastMode,
  theme: ThemeConfig,
  backgrounds: string[]
): ResolvedAccentResult {
  const normalizedBackgrounds = backgrounds
    .map((value) => normalizeHexColor(value))
    .filter((value): value is string => Boolean(value));

  if (!normalizedAccent || normalizedBackgrounds.length === 0) {
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
  }

  const scale = buildBrandScale(theme);
  if (scale.length === 0) {
      accent: normalizedAccent,
      source: "unresolved",
      shadeStep: 0,
    };
  }

  const referenceIndex = findNearestScaleIndex(scale, normalizedAccent);
  const referenceShade = scale[referenceIndex].shade;
  const candidateIndices = buildCandidateIndices(referenceIndex,
scale.length, mode);

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
      shadeStep: candidateIndex - referenceIndex,
    };
  }

  return {
    accent: normalizedAccent,
    source: "unresolved",
    shadeStep: 0,
  };
}