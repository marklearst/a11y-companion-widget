/**
 * Widget theme tokens
 *
 * @remarks
 * Canonical theme definition for the widget.
 * This is the single source of truth for brand + semantic color tokens.
 */

export type ThemeBase = {
  brand: {
    purple: Record<number, string>;
    accent: { light: string; medium: string; dark: string };
  };
  neutral: {
    white: string;
    offWhite: string;
    gray: Record<number, string>;
    black: string;
  };
  semantic: {
    success: { light: string; medium: string; dark: string };
    warning: { light: string; medium: string; dark: string };
    error: { light: string; medium: string; dark: string };
    info: { light: string; medium: string; dark: string };
  };
};

/**
 * Brand colors - purple theme
 */
export const brand: ThemeBase["brand"] = {
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
};

/**
 * Neutral colors - purple-tinted for cohesion
 */
export const neutral: ThemeBase["neutral"] = {
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
};

/**
 * Semantic colors - context-based
 */
export const semantic: ThemeBase["semantic"] = {
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
};

export function createThemeTokens(base: ThemeBase) {
  const { brand: b, neutral: n } = base;

  const lightTheme = {
    // Backgrounds
    panelBg: n.offWhite,
    headerBg: n.offWhite,
    sectionDescBg: withOpacity(n.gray[900], 0.04),

    // Borders
    panelStroke: n.gray[300],

    // Text
    headerText: n.gray[700],
    textPrimary: n.gray[700],
    textSecondary: n.gray[500],
    textStrong: n.gray[900],

    // Interactive elements
    progressBg: n.gray[200],
    progressFill: b.purple[600],

    // Checkbox
    checkboxBgChecked: b.purple[600],
    checkboxBgUnchecked: n.white,
    checkboxStroke: b.purple[600],

    // WCAG Badge
    wcagBadge: n.gray[200],
    wcagBadgeText: n.gray[600],

    // Hover states
    hoverBg: `${n.gray[700]}10`, // 10% opacity
    hoverStroke: n.gray[400],
  } as const;

  const darkTheme = {
    // Backgrounds
    panelBg: n.gray[900],
    headerBg: n.gray[900],
    sectionDescBg: withOpacity(n.white, 0.06),

    // Borders
    panelStroke: n.gray[800],

    // Text
    headerText: n.gray[50],
    textPrimary: n.gray[100],
    textSecondary: n.gray[400],
    textStrong: n.gray[50],

    // Interactive elements
    progressBg: n.gray[800],
    progressFill: b.accent.light,

    // Checkbox
    checkboxBgChecked: b.accent.light,
    checkboxBgUnchecked: n.gray[900],
    checkboxStroke: n.gray[500],

    // WCAG Badge
    wcagBadge: n.gray[800],
    wcagBadgeText: n.gray[200],

    // Hover states
    hoverBg: `${n.gray[100]}12`, // 12% opacity
    hoverStroke: n.gray[600],
  } as const;

  const shadows = {
    light: {
      color: "#0000001A", // 10% opacity neutral shadow
      offset: { x: 0, y: 4 },
      blur: 24,
    },
    dark: {
      color: `${n.black}50`, // 50% opacity
      offset: { x: 0, y: 4 },
      blur: 24,
    },
  } as const;

  return { lightTheme, darkTheme, shadows };
}

const derived = createThemeTokens({ brand, neutral, semantic });

export const lightTheme = derived.lightTheme;
export const darkTheme = derived.darkTheme;
export const shadows = derived.shadows;

/**
 * Default widget theme bundle
 */
export const defaultTheme = {
  brand,
  neutral,
  semantic,
  lightTheme,
  darkTheme,
  shadows,
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
