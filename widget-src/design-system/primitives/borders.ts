/**
 * Border Primitive
 *
 * Standardized border widths and radius values.
 * Follows the mathematical spacing scale for consistency.
 */

import type { BorderWidth, BorderRadius } from "../types/primitives";

/**
 * Border width scale
 *
 * Use these for stroke widths on shapes and dividers.
 */
export const borderWidth: BorderWidth = {
  none: 0, // No border
  thin: 1, // Thin border (most common)
  base: 2, // Default border
  medium: 3, // Medium border (checkbox emphasis)
  thick: 4, // Thick border (emphasis)
} as const;

/**
 * Border radius scale
 *
 * Mathematical progression for rounded corners.
 */
export const borderRadius: BorderRadius = {
  none: 0, // Sharp corners
  sm: 4, // Subtle rounding
  base: 8, // Default rounding
  md: 12, // Medium rounding
  lg: 16, // Large rounding
  xl: 20, // Extra large rounding
  "2xl": 24, // Very large rounding
  full: 9999, // Circular/pill shape
} as const;

/**
 * Semantic border tokens
 *
 * Pre-defined border styles for common use cases.
 */
export const borders = {
  // Component borders
  input: {
    width: borderWidth.thin,
    radius: borderRadius.base,
  },

  button: {
    width: borderWidth.none,
    radius: borderRadius.base,
  },

  card: {
    width: borderWidth.thin,
    radius: borderRadius.md,
  },

  badge: {
    width: borderWidth.thin,
    radius: borderRadius.sm,
  },

  checkbox: {
    width: borderWidth.medium,
    radius: borderRadius.sm,
  },

  // Dividers
  divider: {
    width: borderWidth.thin,
  },

  // Focus states
  focus: {
    width: borderWidth.base,
    radius: borderRadius.base,
  },
} as const;

/**
 * Stroke alignment options
 *
 * Figma-specific stroke positioning.
 */
export const strokeAlign = {
  center: "center",
  inside: "inside",
  outside: "outside",
} as const;
