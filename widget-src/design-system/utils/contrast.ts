/**
 * WCAG Contrast Utilities
 *
 * Calculate and validate color contrast ratios according to WCAG 2.1 standards.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html
 */

import type { RGB } from "../types/primitives";
import { parseColor } from "./colorConversion";

// ============================================
// WCAG Threshold Constants
// ============================================

/**
 * WCAG AA contrast requirements
 */
export const WCAG_AA = {
  normal: 4.5, // Normal text (< 18pt or < 14pt bold)
  large: 3.0, // Large text (≥ 18pt or ≥ 14pt bold)
} as const;

/**
 * WCAG AAA contrast requirements
 */
export const WCAG_AAA = {
  normal: 7.0, // Normal text
  large: 4.5, // Large text
} as const;

/**
 * Text size thresholds for "large text" classification
 */
export const LARGE_TEXT_THRESHOLD = {
  fontSize: 18, // 18pt+ is considered large
  fontSizeBold: 14, // 14pt+ bold is considered large
} as const;

// ============================================
// Core WCAG Calculations
// ============================================

/**
 * Calculate relative luminance of an RGB color
 *
 * Formula from WCAG 2.1:
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 *
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns Relative luminance (0-1)
 *
 * @example
 * ```ts
 * const luminance = calculateRelativeLuminance(255, 255, 255) // 1.0 (white)
 * const luminance = calculateRelativeLuminance(0, 0, 0)       // 0.0 (black)
 * ```
 */
export function calculateRelativeLuminance(
  r: number,
  g: number,
  b: number,
): number {
  // Normalize to 0-1 range
  const [rs, gs, bs] = [r / 255, g / 255, b / 255];

  // Apply gamma correction
  const rLinear =
    rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gLinear =
    gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bLinear =
    bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate relative luminance from RGB object
 */
export function getLuminance(color: RGB): number {
  return calculateRelativeLuminance(color.r, color.g, color.b);
}

/**
 * Calculate contrast ratio between two colors
 *
 * Formula from WCAG 2.1:
 * (L1 + 0.05) / (L2 + 0.05)
 * where L1 is lighter color and L2 is darker color
 *
 * @param color1 - First color (RGB)
 * @param color2 - Second color (RGB)
 * @returns Contrast ratio (1-21)
 *
 * @example
 * ```ts
 * const ratio = calculateContrastRatio(
 *   { r: 255, g: 255, b: 255 },  // white
 *   { r: 0, g: 0, b: 0 }          // black
 * ) // 21 (maximum contrast)
 * ```
 */
export function calculateContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate contrast ratio from hex colors
 *
 * @param hex1 - First color (hex string)
 * @param hex2 - Second color (hex string)
 * @returns Contrast ratio or null if invalid colors
 */
export function calculateContrastRatioHex(
  hex1: string,
  hex2: string,
): number | null {
  const color1 = parseColor(hex1);
  const color2 = parseColor(hex2);

  if (!color1 || !color2) return null;

  return calculateContrastRatio(color1, color2);
}

// ============================================
// WCAG Compliance Checking
// ============================================

/**
 * Check if contrast ratio meets WCAG AA requirements
 *
 * @param ratio - Contrast ratio (1-21)
 * @param isLargeText - Whether text is large (≥18pt or ≥14pt bold)
 * @returns True if compliant
 */
export function isCompliantAA(
  ratio: number,
  isLargeText: boolean = false,
): boolean {
  const threshold = isLargeText ? WCAG_AA.large : WCAG_AA.normal;
  return ratio >= threshold;
}

/**
 * Check if contrast ratio meets WCAG AAA requirements
 *
 * @param ratio - Contrast ratio (1-21)
 * @param isLargeText - Whether text is large (≥18pt or ≥14pt bold)
 * @returns True if compliant
 */
export function isCompliantAAA(
  ratio: number,
  isLargeText: boolean = false,
): boolean {
  const threshold = isLargeText ? WCAG_AAA.large : WCAG_AAA.normal;
  return ratio >= threshold;
}

/**
 * Determine if font size qualifies as "large text"
 *
 * @param fontSize - Font size in points
 * @param isBold - Whether font weight is ≥700
 * @returns True if large text
 */
export function isLargeText(
  fontSize: number,
  isBold: boolean = false,
): boolean {
  if (isBold) {
    return fontSize >= LARGE_TEXT_THRESHOLD.fontSizeBold;
  }
  return fontSize >= LARGE_TEXT_THRESHOLD.fontSize;
}

/**
 * Comprehensive compliance result
 */
export interface ComplianceResult {
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  level: "AAA" | "AA" | "fail";
  isLargeText: boolean;
}

/**
 * Get comprehensive compliance information
 *
 * @param foreground - Foreground color (RGB)
 * @param background - Background color (RGB)
 * @param fontSize - Font size in points
 * @param fontWeight - Font weight (400, 500, 600, 700, 800)
 * @returns Compliance result
 *
 * @example
 * ```ts
 * const result = getComplianceLevel(
 *   { r: 0, g: 0, b: 0 },      // black text
 *   { r: 255, g: 255, b: 255 }, // white background
 *   14,                         // 14pt
 *   400                         // normal weight
 * )
 * // result.level === 'AAA'
 * // result.passAA === true
 * // result.passAAA === true
 * ```
 */
export function getComplianceLevel(
  foreground: RGB,
  background: RGB,
  fontSize: number = 14,
  fontWeight: number = 400,
): ComplianceResult {
  const ratio = calculateContrastRatio(foreground, background);
  const large = isLargeText(fontSize, fontWeight >= 700);
  const passAA = isCompliantAA(ratio, large);
  const passAAA = isCompliantAAA(ratio, large);

  return {
    ratio,
    passAA,
    passAAA,
    level: passAAA ? "AAA" : passAA ? "AA" : "fail",
    isLargeText: large,
  };
}

// ============================================
// Color Finding & Suggestions
// ============================================

/**
 * Suggestion for improving contrast
 */
export interface ContrastSuggestion {
  type: "lighten" | "darken";
  targetColor: RGB;
  ratio: number;
  level: "AA" | "AAA";
}

/**
 * Find a compliant foreground color for given background
 *
 * Adjusts the foreground color's luminance to meet target compliance level.
 *
 * @param foreground - Starting foreground color
 * @param background - Background color (fixed)
 * @param target - Target compliance level
 * @param isLargeText - Whether text is large
 * @returns Compliant color or null if not achievable
 */
export function findCompliantColor(
  foreground: RGB,
  background: RGB,
  target: "AA" | "AAA" = "AA",
  isLargeText: boolean = false,
): RGB | null {
  const targetRatio =
    target === "AAA"
      ? isLargeText
        ? WCAG_AAA.large
        : WCAG_AAA.normal
      : isLargeText
        ? WCAG_AA.large
        : WCAG_AA.normal;

  const bgLum = getLuminance(background);

  // Determine if we need to lighten or darken foreground
  const currentRatio = calculateContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return foreground; // Already compliant
  }

  // Calculate target luminance needed
  // (L1 + 0.05) / (L2 + 0.05) = targetRatio
  // L1 = targetRatio * (L2 + 0.05) - 0.05

  const targetLumLight = targetRatio * (bgLum + 0.05) - 0.05;
  const targetLumDark = (bgLum + 0.05) / targetRatio - 0.05;

  // Choose the valid target (luminance must be 0-1)
  let targetLum: number;
  if (targetLumLight <= 1 && targetLumLight >= 0) {
    targetLum = targetLumLight;
  } else if (targetLumDark <= 1 && targetLumDark >= 0) {
    targetLum = targetLumDark;
  } else {
    return null; // No valid solution
  }

  // Approximate RGB from target luminance (simplified)
  // This is a rough approximation - true conversion requires HSL
  const currentLum = getLuminance(foreground);
  const scale = targetLum / currentLum;

  return {
    r: Math.min(255, Math.max(0, Math.round(foreground.r * scale))),
    g: Math.min(255, Math.max(0, Math.round(foreground.g * scale))),
    b: Math.min(255, Math.max(0, Math.round(foreground.b * scale))),
  };
}

/**
 * Get suggestions for improving contrast
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @returns Array of suggestions
 */
export function getContrastSuggestions(
  foreground: RGB,
  background: RGB,
): ContrastSuggestion[] {
  const suggestions: ContrastSuggestion[] = [];
  const currentRatio = calculateContrastRatio(foreground, background);

  // If already AAA compliant, no suggestions needed
  if (currentRatio >= WCAG_AAA.normal) {
    return suggestions;
  }

  // Try to find AA compliant color
  const aaColor = findCompliantColor(foreground, background, "AA", false);
  if (aaColor) {
    const aaRatio = calculateContrastRatio(aaColor, background);
    suggestions.push({
      type:
        getLuminance(aaColor) > getLuminance(foreground) ? "lighten" : "darken",
      targetColor: aaColor,
      ratio: aaRatio,
      level: "AA",
    });
  }

  // Try to find AAA compliant color
  const aaaColor = findCompliantColor(foreground, background, "AAA", false);
  if (aaaColor) {
    const aaaRatio = calculateContrastRatio(aaaColor, background);
    suggestions.push({
      type:
        getLuminance(aaaColor) > getLuminance(foreground)
          ? "lighten"
          : "darken",
      targetColor: aaaColor,
      ratio: aaaRatio,
      level: "AAA",
    });
  }

  return suggestions;
}

// ============================================
// Validation Reporting
// ============================================

/**
 * Color pair to validate
 */
export interface ColorPair {
  foreground: RGB;
  background: RGB;
  label: string;
}

/**
 * Validation report for a color pair
 */
export interface ValidationReport {
  pair: ColorPair;
  compliance: ComplianceResult;
  suggestions: ContrastSuggestion[];
}

/**
 * Validate a set of color pairs
 *
 * @param pairs - Array of color pairs to validate
 * @param fontSize - Font size in points
 * @param fontWeight - Font weight
 * @returns Array of validation reports
 */
export function validateColorPairs(
  pairs: ColorPair[],
  fontSize: number = 14,
  fontWeight: number = 400,
): ValidationReport[] {
  return pairs.map((pair) => ({
    pair,
    compliance: getComplianceLevel(
      pair.foreground,
      pair.background,
      fontSize,
      fontWeight,
    ),
    suggestions: getContrastSuggestions(pair.foreground, pair.background),
  }));
}
