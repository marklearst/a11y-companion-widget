/**
 * Spacing Primitive
 *
 * Mathematical spacing scale based on powers of 2 and multiples of 4.
 *
 * Scale progression:
 * - Early values: Powers of 2 (1, 2, 4, 8)
 * - Mid-range: 4px increments (12, 16, 20, 24)
 * - Large values: 8px increments (32, 40, 48, 56, 64)
 * - Massive values: 16px increments (80, 96, 128)
 *
 * This creates a harmonious, predictable system that:
 * - Maintains visual rhythm
 * - Scales proportionally
 * - Avoids arbitrary "magic numbers"
 * - Works across all component sizes
 */

import type { Spacing } from "../types/primitives";

/**
 * Core spacing scale
 *
 * Use these values for:
 * - Padding (internal spacing)
 * - Margin (external spacing)
 * - Gap (flexbox/grid spacing)
 * - Positioning offsets
 *
 * @example
 * ```tsx
 * <AutoLayout padding={spacing[16]} gap={spacing[8]}>
 *   <Text>Content</Text>
 * </AutoLayout>
 * ```
 */
export const spacing: Record<Spacing, number> = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  128: 128,
} as const;

/**
 * Semantic spacing tokens
 *
 * Pre-defined spacing for common use cases. These reference the core scale
 * but provide semantic meaning.
 */
export const semanticSpacing = {
  // Component internal spacing
  component: {
    xs: spacing[4], // Tight spacing (badges, small buttons)
    sm: spacing[8], // Small spacing (buttons, inputs)
    md: spacing[12], // Medium spacing (cards, panels)
    lg: spacing[16], // Large spacing (sections)
    xl: spacing[24], // Extra large spacing (major sections)
  },

  // Layout spacing
  layout: {
    gutter: spacing[16], // Grid gutter
    section: spacing[32], // Between major sections
    page: spacing[40], // Page margins
  },

  // Stack spacing (vertical rhythm)
  stack: {
    xs: spacing[4], // Tightly related items
    sm: spacing[8], // Related items
    md: spacing[12], // Default stack
    lg: spacing[16], // Loosely related items
    xl: spacing[24], // Separate sections
  },

  // Inline spacing (horizontal rhythm)
  inline: {
    xs: spacing[4], // Tight inline (icon + text)
    sm: spacing[8], // Default inline
    md: spacing[12], // Loose inline
    lg: spacing[16], // Extra loose inline
  },
} as const;

/**
 * Inset spacing (padding on all sides)
 *
 * Common padding patterns for components
 */
export const inset = {
  xs: spacing[4],
  sm: spacing[8],
  md: spacing[12],
  lg: spacing[16],
  xl: spacing[24],
} as const;

/**
 * Squish spacing (vertical padding < horizontal padding)
 *
 * Common for buttons, badges, and inline elements
 *
 * @example
 * ```tsx
 * <AutoLayout
 *   padding={{
 *     vertical: squish.md.vertical,
 *     horizontal: squish.md.horizontal
 *   }}
 * >
 * ```
 */
export const squish = {
  sm: {
    vertical: spacing[4],
    horizontal: spacing[8],
  },
  md: {
    vertical: spacing[8],
    horizontal: spacing[12],
  },
  lg: {
    vertical: spacing[12],
    horizontal: spacing[16],
  },
} as const;

/**
 * Stretch spacing (vertical padding > horizontal padding)
 *
 * Common for vertical navigation, sidebars
 */
export const stretch = {
  sm: {
    vertical: spacing[8],
    horizontal: spacing[4],
  },
  md: {
    vertical: spacing[12],
    horizontal: spacing[8],
  },
  lg: {
    vertical: spacing[16],
    horizontal: spacing[12],
  },
} as const;
