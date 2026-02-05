/**
 * Sizing Primitive
 *
 * Standardized dimensions for components and UI elements.
 * Uses the same mathematical scale as spacing for consistency.
 */

import type { IconSizes, ComponentSizes } from "../types/primitives";

/**
 * Icon sizes
 *
 * Standard sizes for icons across the UI.
 */
export const iconSizes: IconSizes = {
  xs: 12, // Tiny icons (inline with small text)
  sm: 16, // Small icons (inline with body text)
  base: 20, // Default icon size
  md: 24, // Medium icons (section headers)
  lg: 32, // Large icons (featured elements)
  xl: 40, // Extra large icons (hero sections)
} as const;

/**
 * Component-specific sizes
 *
 * Pre-defined sizes for common UI components.
 */
export const componentSizes: ComponentSizes = {
  button: {
    height: {
      sm: 28, // Small button (compact UIs)
      md: 36, // Default button
      lg: 44, // Large button (CTAs)
    },
    minWidth: 80, // Minimum button width for usability
  },

  input: {
    height: {
      sm: 28, // Small input
      md: 36, // Default input
      lg: 44, // Large input
    },
  },

  checkbox: {
    size: 16, // Standard checkbox size
  },

  badge: {
    height: 20, // Badge height
    minWidth: 20, // Minimum badge width (circular)
  },
} as const;

/**
 * Container widths
 *
 * Standard widths for containers and panels.
 */
export const containerWidths = {
  xs: 320, // Narrow sidebars, mobile
  sm: 384, // Small panels
  md: 448, // Medium panels
  lg: 512, // Large panels
  xl: 640, // Extra large panels
  "2xl": 768, // Wide panels
  "3xl": 896, // Very wide panels
  full: "100%" as const, // Full width
} as const;

/**
 * Common dimensions
 *
 * Frequently used dimensions that don't fit other categories.
 */
export const dimensions = {
  divider: 1, // Divider thickness
  focusRing: 2, // Focus ring width
  scrollbarWidth: 8, // Scrollbar width
  avatarSm: 24, // Small avatar
  avatarMd: 32, // Medium avatar
  avatarLg: 48, // Large avatar
} as const;
