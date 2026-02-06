import { defaultTheme, themePresets, type ThemePresetName } from "design-system";

export type ThemeName = "light" | "dark";

export type ThemeTokens = {
  panelBg: string;
  panelStroke: string;
  headerBg: string;
  headerText: string;
  sectionDescBg: string;
  textPrimary: string;
  textSecondary: string;
  textStrong: string;
  progressBg: string;
  progressFill: string;
  checkboxBgChecked: string;
  checkboxBgUnchecked: string;
  checkboxStroke: string;
  wcagBadge: string;
  wcagBadgeText?: string;
  hoverBg?: string;
  hoverStroke?: string;
};

/**
 * @deprecated Use theme presets + resolveTheme instead
 */
export const light: ThemeTokens = defaultTheme.lightTheme;

/**
 * @deprecated Use theme presets + resolveTheme instead
 */
export const dark: ThemeTokens = defaultTheme.darkTheme;

export { themePresets };
export type { ThemePresetName };

export function resolveTheme(
  isDark: boolean,
  preset: ThemePresetName = "default",
  accentColor?: string,
): ThemeTokens {
  const theme = themePresets[preset] ?? defaultTheme;
  const base = (isDark ? theme.darkTheme : theme.lightTheme) as ThemeTokens;
  if (!accentColor) return base;
  return {
    ...base,
    progressFill: accentColor,
    checkboxBgChecked: accentColor,
    checkboxStroke: accentColor,
  };
}
