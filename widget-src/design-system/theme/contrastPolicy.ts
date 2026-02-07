export type AccentStepDirection = "lighter" | "darker";
export type ContrastMode = "light" | "dark";

export interface AccentStepPolicyMode {
  primaryDirection: AccentStepDirection;
  fallbackDirection: AccentStepDirection;
}

export interface AccentStepPolicy {
  stepSize: 100;
  mode: Record<ContrastMode, AccentStepPolicyMode>;
  stopCondition: "first-pass";
  unresolvedBehavior: "fail-validation-no-silent-mutation";
  thresholds: {
    normalTextAA: 4.5;
    largeTextAA: 3.0;
  };
}

/**
 * Phase 2 deterministic accent-step policy.
 *
 * This policy describes how runtime accent fallback should behave when an accent
 * fails required contrast checks. Runtime integration is implemented separately.
 */
export const accentStepPolicy: AccentStepPolicy = {
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
} as const;

