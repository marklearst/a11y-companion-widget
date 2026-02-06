/**
 * WCAG-specific shared types.
 */

export const WCAG_LEVELS = ["A", "AA", "AAA"] as const;

export type WCAGLevel = (typeof WCAG_LEVELS)[number];

export type WcagCriterionCode = `${number}.${number}.${number}`;
