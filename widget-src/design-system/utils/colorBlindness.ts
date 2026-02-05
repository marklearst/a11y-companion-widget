/**
 * Color Blindness Simulation Utilities
 *
 * Simulate how colors appear to people with different types of color vision deficiency.
 * Uses Brettel et al. transformation matrices for accurate simulation.
 *
 * @see https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
 * @see Gustavo M. Machado, Manuel M. Oliveira, and Leandro A. F. Fernandes
 *      "A Physiologically-based Model for Simulation of Color Vision Deficiency"
 */

import type { RGB } from "../types/primitives";
import { calculateContrastRatio } from "./contrast";

/**
 * Types of color blindness
 */
export type ColorBlindnessType =
  | "protanopia" // Red-blind (missing L cones)
  | "deuteranopia" // Green-blind (missing M cones)
  | "tritanopia"; // Blue-blind (missing S cones)

/**
 * Transformation matrix (3x3)
 */
type Matrix3x3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

// ============================================
// Transformation Matrices (Brettel et al.)
// ============================================

/**
 * Protanopia (red-blind) transformation matrix
 *
 * Missing L (long-wavelength) cones. Red hues shift toward yellow/brown.
 */
const PROTANOPIA_MATRIX: Matrix3x3 = [
  [0.56667, 0.43333, 0.0],
  [0.55833, 0.44167, 0.0],
  [0.0, 0.24167, 0.75833],
];

/**
 * Deuteranopia (green-blind) transformation matrix
 *
 * Missing M (medium-wavelength) cones. Green hues shift toward beige/yellow.
 */
const DEUTERANOPIA_MATRIX: Matrix3x3 = [
  [0.625, 0.375, 0.0],
  [0.7, 0.3, 0.0],
  [0.0, 0.3, 0.7],
];

/**
 * Tritanopia (blue-blind) transformation matrix
 *
 * Missing S (short-wavelength) cones. Blue hues shift toward green/pink.
 */
const TRITANOPIA_MATRIX: Matrix3x3 = [
  [0.95, 0.05, 0.0],
  [0.0, 0.43333, 0.56667],
  [0.0, 0.475, 0.525],
];

// ============================================
// Matrix Operations
// ============================================

/**
 * Normalize RGB to 0-1 range
 */
function normalizeRgb(rgb: RGB): [number, number, number] {
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

/**
 * Denormalize RGB from 0-1 range to 0-255
 */
function denormalizeRgb(rgb: [number, number, number]): RGB {
  return {
    r: Math.min(255, Math.max(0, Math.round(rgb[0] * 255))),
    g: Math.min(255, Math.max(0, Math.round(rgb[1] * 255))),
    b: Math.min(255, Math.max(0, Math.round(rgb[2] * 255))),
  };
}

/**
 * Apply 3x3 matrix transformation to RGB vector
 */
function applyMatrix(
  matrix: Matrix3x3,
  rgb: [number, number, number],
): [number, number, number] {
  return [
    matrix[0][0] * rgb[0] + matrix[0][1] * rgb[1] + matrix[0][2] * rgb[2],
    matrix[1][0] * rgb[0] + matrix[1][1] * rgb[1] + matrix[1][2] * rgb[2],
    matrix[2][0] * rgb[0] + matrix[2][1] * rgb[1] + matrix[2][2] * rgb[2],
  ];
}

// ============================================
// Simulation Functions
// ============================================

/**
 * Simulate color blindness for a given color
 *
 * @param color - Original RGB color
 * @param type - Type of color blindness
 * @returns Simulated RGB color as seen by person with color blindness
 *
 * @example
 * ```ts
 * const red = { r: 255, g: 0, b: 0 }
 * const redAsProtanope = simulateColorBlindness(red, 'protanopia')
 * // Red appears as muddy yellow/brown to protanopes
 * ```
 */
export function simulateColorBlindness(
  color: RGB,
  type: ColorBlindnessType,
): RGB {
  // Select transformation matrix
  let matrix: Matrix3x3;
  switch (type) {
    case "protanopia":
      matrix = PROTANOPIA_MATRIX;
      break;
    case "deuteranopia":
      matrix = DEUTERANOPIA_MATRIX;
      break;
    case "tritanopia":
      matrix = TRITANOPIA_MATRIX;
      break;
  }

  // Normalize, transform, denormalize
  const normalized = normalizeRgb(color);
  const transformed = applyMatrix(matrix, normalized);
  return denormalizeRgb(transformed);
}

// ============================================
// Contrast Testing for Color Blindness
// ============================================

/**
 * Contrast result for specific color blindness type
 */
export interface ColorBlindnessContrastResult {
  type: ColorBlindnessType | "normal";
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  foregroundSimulated: RGB;
  backgroundSimulated: RGB;
}

/**
 * Test contrast for all color blindness types
 *
 * @param foreground - Foreground color (e.g., text)
 * @param background - Background color
 * @param isLargeText - Whether text is large (≥18pt or ≥14pt bold)
 * @returns Contrast results for normal vision and all CVD types
 *
 * @example
 * ```ts
 * const results = testContrastForColorBlindness(
 *   { r: 0, g: 128, b: 0 },    // green text
 *   { r: 255, g: 255, b: 255 }, // white background
 *   false
 * )
 *
 * console.log(results.deuteranopia.passAA) // May fail for green-blind users
 * ```
 */
export function testContrastForColorBlindness(
  foreground: RGB,
  background: RGB,
  isLargeText: boolean = false,
): {
  normal: ColorBlindnessContrastResult;
  protanopia: ColorBlindnessContrastResult;
  deuteranopia: ColorBlindnessContrastResult;
  tritanopia: ColorBlindnessContrastResult;
} {
  const aaThreshold = isLargeText ? 3.0 : 4.5;
  const aaaThreshold = isLargeText ? 4.5 : 7.0;

  // Test normal vision
  const normalRatio = calculateContrastRatio(foreground, background);

  // Test each CVD type
  // Test protanopia
  const fgProtanopia = simulateColorBlindness(foreground, "protanopia");
  const bgProtanopia = simulateColorBlindness(background, "protanopia");
  const ratioProtanopia = calculateContrastRatio(fgProtanopia, bgProtanopia);

  // Test deuteranopia
  const fgDeuteranopia = simulateColorBlindness(foreground, "deuteranopia");
  const bgDeuteranopia = simulateColorBlindness(background, "deuteranopia");
  const ratioDeuteranopia = calculateContrastRatio(
    fgDeuteranopia,
    bgDeuteranopia,
  );

  // Test tritanopia
  const fgTritanopia = simulateColorBlindness(foreground, "tritanopia");
  const bgTritanopia = simulateColorBlindness(background, "tritanopia");
  const ratioTritanopia = calculateContrastRatio(fgTritanopia, bgTritanopia);

  return {
    normal: {
      type: "normal",
      ratio: normalRatio,
      passAA: normalRatio >= aaThreshold,
      passAAA: normalRatio >= aaaThreshold,
      foregroundSimulated: foreground,
      backgroundSimulated: background,
    },
    protanopia: {
      type: "protanopia",
      ratio: ratioProtanopia,
      passAA: ratioProtanopia >= aaThreshold,
      passAAA: ratioProtanopia >= aaaThreshold,
      foregroundSimulated: fgProtanopia,
      backgroundSimulated: bgProtanopia,
    },
    deuteranopia: {
      type: "deuteranopia",
      ratio: ratioDeuteranopia,
      passAA: ratioDeuteranopia >= aaThreshold,
      passAAA: ratioDeuteranopia >= aaaThreshold,
      foregroundSimulated: fgDeuteranopia,
      backgroundSimulated: bgDeuteranopia,
    },
    tritanopia: {
      type: "tritanopia",
      ratio: ratioTritanopia,
      passAA: ratioTritanopia >= aaThreshold,
      passAAA: ratioTritanopia >= aaaThreshold,
      foregroundSimulated: fgTritanopia,
      backgroundSimulated: bgTritanopia,
    },
  };
}

/**
 * Check if color combination is accessible for all vision types
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @param isLargeText - Whether text is large
 * @returns True if passes WCAG AA for normal and all CVD types
 */
export function isAccessibleForAll(
  foreground: RGB,
  background: RGB,
  isLargeText: boolean = false,
): boolean {
  const results = testContrastForColorBlindness(
    foreground,
    background,
    isLargeText,
  );

  return (
    results.normal.passAA &&
    results.protanopia.passAA &&
    results.deuteranopia.passAA &&
    results.tritanopia.passAA
  );
}

/**
 * Get failing CVD types for color combination
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @param isLargeText - Whether text is large
 * @returns Array of CVD types that fail WCAG AA
 */
export function getFailingCvdTypes(
  foreground: RGB,
  background: RGB,
  isLargeText: boolean = false,
): (ColorBlindnessType | "normal")[] {
  const results = testContrastForColorBlindness(
    foreground,
    background,
    isLargeText,
  );
  const failing: (ColorBlindnessType | "normal")[] = [];

  if (!results.normal.passAA) failing.push("normal");
  if (!results.protanopia.passAA) failing.push("protanopia");
  if (!results.deuteranopia.passAA) failing.push("deuteranopia");
  if (!results.tritanopia.passAA) failing.push("tritanopia");

  return failing;
}

// ============================================
// Batch Testing
// ============================================

/**
 * Color pair with label
 */
export interface LabeledColorPair {
  label: string;
  foreground: RGB;
  background: RGB;
}

/**
 * CVD validation report for a color pair
 */
export interface CvdValidationReport {
  pair: LabeledColorPair;
  results: ReturnType<typeof testContrastForColorBlindness>;
  passesAll: boolean;
  failingTypes: (ColorBlindnessType | "normal")[];
}

/**
 * Validate multiple color pairs for CVD accessibility
 *
 * @param pairs - Array of labeled color pairs
 * @param isLargeText - Whether text is large
 * @returns Array of validation reports
 */
export function validateCvdAccessibility(
  pairs: LabeledColorPair[],
  isLargeText: boolean = false,
): CvdValidationReport[] {
  return pairs.map((pair) => {
    const results = testContrastForColorBlindness(
      pair.foreground,
      pair.background,
      isLargeText,
    );
    const failingTypes = getFailingCvdTypes(
      pair.foreground,
      pair.background,
      isLargeText,
    );

    return {
      pair,
      results,
      passesAll: failingTypes.length === 0,
      failingTypes,
    };
  });
}

// ============================================
// Descriptions
// ============================================

/**
 * Human-readable descriptions of each CVD type
 */
export const CVD_DESCRIPTIONS: Record<ColorBlindnessType, string> = {
  protanopia:
    "Red-blind (missing L cones). Affects ~1% of males. Red appears as muddy yellow/brown.",
  deuteranopia:
    "Green-blind (missing M cones). Affects ~1% of males. Green appears as beige/yellow.",
  tritanopia:
    "Blue-blind (missing S cones). Very rare. Blue appears as green/pink.",
};

/**
 * Statistics about CVD prevalence
 */
export const CVD_PREVALENCE = {
  protanopia: {
    male: 0.01, // 1% of males
    female: 0.0001, // 0.01% of females
  },
  deuteranopia: {
    male: 0.01, // 1% of males
    female: 0.0001, // 0.01% of females
  },
  tritanopia: {
    male: 0.0001, // 0.01% of males
    female: 0.0001, // 0.01% of females
  },
} as const;
