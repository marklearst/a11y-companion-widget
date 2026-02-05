/**
 * Opacity Primitive
 *
 * Standardized transparency levels for overlays, disabled states,
 * and visual hierarchy.
 */

import type { OpacityScale } from "../types/primitives";

/**
 * Opacity scale
 *
 * Use these for transparency effects.
 *
 * @example
 * ```tsx
 * <Rectangle opacity={opacity[50]} />
 * ```
 */
export const opacity: OpacityScale = {
  0: 0, // Fully transparent (hidden)
  10: 0.1, // Very subtle
  25: 0.25, // Subtle overlay
  50: 0.5, // Half transparent
  75: 0.75, // Mostly opaque
  90: 0.9, // Nearly opaque
  100: 1.0, // Fully opaque (default)
} as const;

/**
 * Semantic opacity tokens
 *
 * Pre-defined opacity for common use cases.
 */
export const semanticOpacity = {
  // Disabled states
  disabled: opacity[50],

  // Overlays
  overlay: {
    light: opacity[75], // Light overlay (modals, dropdowns)
    medium: opacity[50], // Medium overlay
    dark: opacity[25], // Dark overlay
  },

  // Hover states
  hover: opacity[90],

  // Focus states
  focus: opacity[75],

  // Subtle backgrounds
  subtle: opacity[10],

  // Decorative elements
  decorative: opacity[25],
} as const;
