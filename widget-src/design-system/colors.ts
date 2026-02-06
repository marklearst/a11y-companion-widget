/**
 * Color system for A11y Companion Widget
 *
 * @remarks
 * Centralized color palette with semantic naming.
 * Includes both light and dark mode variants.
 */

/**
 * Brand colors - purple theme
 */
export const brand = {
  purple: {
    // Primary purple scale
    50: "#F5F6FF",
    100: "#E8EAFF",
    200: "#D4D8F0",
    300: "#B8BDEC",
    400: "#8B92C7",
    500: "#5B64A8", // Primary brand color
    600: "#4E56A0",
    700: "#1E2557", // Deep purple
    800: "#1A1F4D",
    900: "#12163B",
    950: "#0F1128", // Darkest purple-black
  },

  accent: {
    light: "#7A84D8",
    medium: "#5B64A8",
    dark: "#4E56A0",
  },
} as const;

/**
 * Neutral colors - purple-tinted for cohesion
 */
export const neutral = {
  white: "#FFFFFF",
  offWhite: "#FAFAFA", // Neutral off-white
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  black: "#000000",
} as const;

/**
 * Semantic colors - context-based
 */
export const semantic = {
  success: {
    light: "#4ADE80",
    medium: "#22C55E",
    dark: "#16A34A",
  },
  warning: {
    light: "#FBBF24",
    medium: "#F59E0B",
    dark: "#D97706",
  },
  error: {
    light: "#F87171",
    medium: "#EF4444",
    dark: "#DC2626",
  },
  info: {
    light: "#60A5FA",
    medium: "#3B82F6",
    dark: "#2563EB",
  },
} as const;

/**
 * Light theme colors
 */
export const lightTheme = {
  // Backgrounds
  panelBg: neutral.offWhite,
  headerBg: neutral.offWhite,
  sectionDescBg: neutral.gray[100],

  // Borders
  panelStroke: neutral.gray[300],

  // Text
  headerText: neutral.gray[700],
  textPrimary: neutral.gray[700],
  textSecondary: neutral.gray[500],
  textStrong: neutral.gray[900],

  // Interactive elements
  progressBg: neutral.gray[200],
  progressFill: brand.purple[600],

  // Checkbox
  checkboxBgChecked: brand.purple[600],
  checkboxBgUnchecked: neutral.white,
  checkboxStroke: brand.purple[600],

  // WCAG Badge
  wcagBadge: neutral.gray[200],
  wcagBadgeText: neutral.gray[500],

  // Hover states
  hoverBg: `${neutral.gray[700]}10`, // 10% opacity
  hoverStroke: neutral.gray[400],
} as const;

/**
 * Dark theme colors
 */
export const darkTheme = {
  // Backgrounds
  panelBg: neutral.gray[900],
  headerBg: neutral.gray[900],
  sectionDescBg: withOpacity(neutral.white, 0.06),

  // Borders
  panelStroke: neutral.gray[800],

  // Text
  headerText: neutral.gray[50],
  textPrimary: neutral.gray[100],
  textSecondary: neutral.gray[400],
  textStrong: neutral.gray[50],

  // Interactive elements
  progressBg: neutral.gray[800],
  progressFill: brand.accent.light,

  // Checkbox
  checkboxBgChecked: brand.accent.light,
  checkboxBgUnchecked: neutral.gray[900],
  checkboxStroke: neutral.gray[500],

  // WCAG Badge
  wcagBadge: neutral.gray[800],
  wcagBadgeText: neutral.gray[200],

  // Hover states
  hoverBg: `${neutral.gray[100]}12`, // 12% opacity
  hoverStroke: neutral.gray[600],
} as const;

/**
 * Shadow colors with opacity
 */
export const shadows = {
  light: {
    color: "#0000001A", // 10% opacity neutral shadow
    offset: { x: 0, y: 4 },
    blur: 24,
  },
  dark: {
    color: `${neutral.black}50`, // 50% opacity
    offset: { x: 0, y: 4 },
    blur: 24,
  },
} as const;

/**
 * Helper function to add opacity to hex colors
 */
export function withOpacity(hexColor: string, opacity: number): string {
  // Convert opacity (0-1) to hex (00-FF)
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hexColor}${opacityHex}`;
}

export type Brand = typeof brand;
export type Neutral = typeof neutral;
export type Semantic = typeof semantic;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type Shadows = typeof shadows;
