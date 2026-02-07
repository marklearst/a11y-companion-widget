/**
 * Design System for A11y Companion Widget
 *
 * @remarks
 * Professional design system with mathematically-grounded primitives.
 * All primitives follow consistent scales and are WCAG AA compliant.
 *
 * Architecture:
 * - **Primitives**: Raw design values (colors, spacing, typography, etc.)
 * - **Semantic**: Named variables that reference primitives (future)
 * - **Utils**: Helper functions for accessibility and color manipulation
 *
 * @example
 * ```tsx
 * import { primitives } from 'design-system'
 *
 * <Text
 *   fontSize={primitives.typography.fontSize.base}
 *   fontWeight={primitives.typography.fontWeight.medium}
 *   fill={primitives.color.light.text.primary}
 * />
 *
 * <AutoLayout
 *   padding={primitives.spacing[16]}
 *   gap={primitives.spacing[8]}
 * />
 * ```
 */

// ============================================
// Primitives
// ============================================

export * from "./primitives/color";
export * from "./primitives/typography";
export * from "./primitives/spacing";
export * from "./primitives/sizing";
export * from "./primitives/borders";
export * from "./primitives/shadows";
export * from "./primitives/opacity";
export * from "./primitives/gradients";
export * from "./primitives/blendModes";
export * from "./primitives/layout";

// ============================================
// Theme
// ============================================

export { createTheme, defaultTheme, themePresets, getThemePreset } from "./theme";
export type {
  ThemeConfig,
  ThemeOverrides,
  ThemePresetName,
} from "./theme";

// ============================================
// Component Variables
// ============================================

export { createChecklistVariables } from "./components/checklist";
export type { ChecklistVariables } from "./components/checklist";
export { createOverlayVariables } from "./components/overlays";
export type { OverlayVariables } from "./components/overlays";
export { componentPrimitives } from "./components/primitives";
export type { ComponentPrimitives } from "./components/primitives";

// Import primitives for bundled export
import {
  colors,
  getThemeColors,
} from "./primitives/color";
import {
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
} from "./primitives/typography";
import {
  spacing,
  semanticSpacing,
  inset,
  squish,
  stretch,
} from "./primitives/spacing";
import {
  iconSizes,
  componentSizes,
  containerWidths,
  dimensions,
} from "./primitives/sizing";
import {
  borderWidth,
  borderRadius,
  borders,
  strokeAlign,
} from "./primitives/borders";
import { shadows, semanticShadows, coloredShadows } from "./primitives/shadows";
import { opacity, semanticOpacity } from "./primitives/opacity";
import { gradients } from "./primitives/gradients";
import { blendModes, semanticBlendModes } from "./primitives/blendModes";
import {
  layoutPatterns,
  zIndex,
  overflow,
  alignment,
} from "./primitives/layout";

// ============================================
// Types
// ============================================

export * from "./types/primitives";

// ============================================
// Bundled Primitives Export
// ============================================

/**
 * All primitives in one convenient object
 *
 * @example
 * ```tsx
 * import { primitives } from 'design-system'
 *
 * const buttonStyles = {
 *   padding: primitives.spacing[12],
 *   fontSize: primitives.typography.fontSize.base,
 *   color: primitives.color.light.text.primary,
 * }
 * ```
 */
export const primitives = {
  color: colors,
  typography: {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    fontFamily,
    textStyles,
  },
  spacing: {
    scale: spacing,
    semantic: semanticSpacing,
    inset,
    squish,
    stretch,
  },
  sizing: {
    icon: iconSizes,
    component: componentSizes,
    container: containerWidths,
    dimensions,
  },
  borders: {
    width: borderWidth,
    radius: borderRadius,
    semantic: borders,
    strokeAlign,
  },
  shadows: {
    scale: shadows,
    semantic: semanticShadows,
    colored: coloredShadows,
  },
  opacity: {
    scale: opacity,
    semantic: semanticOpacity,
  },
  gradients,
  blendModes: {
    all: blendModes,
    semantic: semanticBlendModes,
  },
  layout: {
    zIndex,
    overflow,
    alignment,
    patterns: layoutPatterns,
  },
} as const;

// ============================================
// Helper Functions
// ============================================

/**
 * Get theme colors based on dark mode
 *
 * @param isDark - Whether dark mode is active
 * @returns Theme color variables
 *
 * @example
 * ```tsx
 * const themeColors = getThemeColorsHelper(isDark)
 * <Text fill={themeColors.text.primary} />
 * ```
 */
export function getThemeColorsHelper(isDark: boolean) {
  return getThemeColors(isDark ? "dark" : "light");
}

// ============================================
// Type Exports
// ============================================

export type Primitives = typeof primitives;
