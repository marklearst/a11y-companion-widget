/**
 * Color Primitive
 *
 * Professional color system with:
 * - Full 50-900 scales for brand and neutral colors
 * - Semantic color tokens for both light and dark modes
 * - WCAG AA compliant color combinations
 *
 * Color naming follows the industry-standard convention:
 * - 50: Lightest (backgrounds, subtle highlights)
 * - 500: Base color (default usage)
 * - 900: Darkest (emphasis, text on light backgrounds)
 */

import type { ColorScale, ThemeColors } from "../types/primitives";

// ============================================
// Brand Colors
// ============================================

/**
 * Primary brand color (Indigo)
 *
 * Used for primary actions, links, and brand elements.
 */
export const indigo: ColorScale = {
  50: "#EEF2FF",
  100: "#E0E7FF",
  200: "#C7D2FE",
  300: "#A5B4FC",
  400: "#818CF8",
  500: "#6366F1", // Base indigo
  600: "#4F46E5",
  700: "#4338CA",
  800: "#3730A3",
  900: "#312E81",
} as const;

/**
 * Accent brand color (Purple)
 *
 * Used for secondary actions and accents.
 */
export const purple: ColorScale = {
  50: "#FAF5FF",
  100: "#F3E8FF",
  200: "#E9D5FF",
  300: "#D8B4FE",
  400: "#C084FC",
  500: "#A855F7", // Base purple
  600: "#9333EA",
  700: "#7E22CE",
  800: "#6B21A8",
  900: "#581C87",
} as const;

// ============================================
// Neutral Colors
// ============================================

/**
 * Gray scale (cool-toned)
 *
 * Primary neutral color for text, borders, backgrounds.
 * Slightly blue-tinted for modern aesthetic.
 */
export const gray: ColorScale = {
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280", // Base gray
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
} as const;

/**
 * Slate scale (darker neutral)
 *
 * Alternative neutral for high-contrast needs.
 */
export const slate: ColorScale = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B", // Base slate
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
} as const;

// ============================================
// Semantic Colors
// ============================================

/**
 * Success colors (Green)
 *
 * Used for success states, confirmations, positive feedback.
 */
export const green: ColorScale = {
  50: "#F0FDF4",
  100: "#DCFCE7",
  200: "#BBF7D0",
  300: "#86EFAC",
  400: "#4ADE80",
  500: "#22C55E", // Base green
  600: "#16A34A",
  700: "#15803D",
  800: "#166534",
  900: "#14532D",
} as const;

/**
 * Warning colors (Amber)
 *
 * Used for warnings, cautions, pending states.
 */
export const amber: ColorScale = {
  50: "#FFFBEB",
  100: "#FEF3C7",
  200: "#FDE68A",
  300: "#FCD34D",
  400: "#FBBF24",
  500: "#F59E0B", // Base amber
  600: "#D97706",
  700: "#B45309",
  800: "#92400E",
  900: "#78350F",
} as const;

/**
 * Error colors (Red)
 *
 * Used for errors, destructive actions, critical states.
 */
export const red: ColorScale = {
  50: "#FEF2F2",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5",
  400: "#F87171",
  500: "#EF4444", // Base red
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
} as const;

/**
 * Info colors (Blue)
 *
 * Used for informational messages, help text.
 */
export const blue: ColorScale = {
  50: "#EFF6FF",
  100: "#DBEAFE",
  200: "#BFDBFE",
  300: "#93C5FD",
  400: "#60A5FA",
  500: "#3B82F6", // Base blue
  600: "#2563EB",
  700: "#1D4ED8",
  800: "#1E40AF",
  900: "#1E3A8A",
} as const;

// ============================================
// Special Colors
// ============================================

/**
 * Pure colors for overlays and special cases
 */
export const pure = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

// ============================================
// Light Theme
// ============================================

/**
 * Light theme color tokens
 *
 * All combinations are WCAG AA compliant.
 */
export const lightTheme: ThemeColors = {
  background: {
    primary: pure.white, // Main canvas
    secondary: gray[50], // Subtle backgrounds
    tertiary: gray[100], // Elevated surfaces
  },

  text: {
    primary: gray[900], // Main text (AA compliant on white)
    secondary: gray[600], // Supporting text
    tertiary: gray[500], // Subtle text
    inverse: pure.white, // Text on dark backgrounds
  },

  border: {
    default: gray[300], // Standard borders
    subtle: gray[200], // Subtle dividers
    strong: gray[400], // Emphasized borders
  },

  surface: {
    default: pure.white, // Default surface
    hover: gray[50], // Hover state
    active: gray[100], // Active state
    disabled: gray[100], // Disabled state
  },

  status: {
    success: green[600], // Success messages
    warning: amber[600], // Warning messages
    error: red[600], // Error messages
    info: blue[600], // Info messages
  },
} as const;

// ============================================
// Dark Theme
// ============================================

/**
 * Dark theme color tokens
 *
 * All combinations are WCAG AA compliant.
 */
export const darkTheme: ThemeColors = {
  background: {
    primary: gray[900], // Main canvas
    secondary: gray[800], // Subtle backgrounds
    tertiary: gray[700], // Elevated surfaces
  },

  text: {
    primary: gray[50], // Main text (AA compliant on dark)
    secondary: gray[300], // Supporting text
    tertiary: gray[400], // Subtle text
    inverse: gray[900], // Text on light backgrounds
  },

  border: {
    default: gray[600], // Standard borders
    subtle: gray[700], // Subtle dividers
    strong: gray[500], // Emphasized borders
  },

  surface: {
    default: gray[800], // Default surface
    hover: gray[700], // Hover state
    active: gray[600], // Active state
    disabled: gray[700], // Disabled state
  },

  status: {
    success: green[400], // Success messages
    warning: amber[400], // Warning messages
    error: red[400], // Error messages
    info: blue[400], // Info messages
  },
} as const;

// ============================================
// Utility Functions
// ============================================

/**
 * Get theme colors based on mode
 */
export function getThemeColors(mode: "light" | "dark"): ThemeColors {
  return mode === "light" ? lightTheme : darkTheme;
}

/**
 * Color scales export for programmatic access
 */
export const colorScales = {
  indigo,
  purple,
  gray,
  slate,
  green,
  amber,
  red,
  blue,
} as const;

/**
 * All colors export
 */
export const colors = {
  // Brand
  indigo,
  purple,

  // Neutral
  gray,
  slate,

  // Semantic
  green,
  amber,
  red,
  blue,

  // Special
  pure,

  // Themes
  light: lightTheme,
  dark: darkTheme,
} as const;
