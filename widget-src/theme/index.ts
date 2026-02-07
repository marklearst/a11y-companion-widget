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

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function normalizeHexColor(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!HEX_COLOR_REGEX.test(trimmed)) return undefined;
  if (trimmed.length === 4) {
    const [r, g, b] = trimmed.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return trimmed.toUpperCase();
}

export function inferThemePresetFromAccent(
  accentColor?: string,
): ThemePresetName | undefined {
  const normalized = normalizeHexColor(accentColor);
  if (!normalized) return undefined;

  const presetEntries = Object.entries(themePresets) as Array<
    [ThemePresetName, (typeof themePresets)[ThemePresetName]]
  >;

  for (const [name, preset] of presetEntries) {
    const candidates = [
      preset.lightTheme.progressFill,
      preset.darkTheme.progressFill,
      preset.brand.accent.light,
      preset.brand.accent.medium,
      preset.brand.accent.dark,
    ]
      .map(normalizeHexColor)
      .filter((value): value is string => Boolean(value));

    if (candidates.includes(normalized)) {
      return name;
    }
  }

  return undefined;
}

export function resolveTheme(
  isDark: boolean,
  preset: ThemePresetName = "default",
  accentColor?: string,
): ThemeTokens {
  const theme = themePresets[preset] ?? defaultTheme;
  const base = (isDark ? theme.darkTheme : theme.lightTheme) as ThemeTokens;
  const normalizedAccent = normalizeHexColor(accentColor);
  if (!normalizedAccent) return base;
  return {
    ...base,
    progressFill: normalizedAccent,
    checkboxBgChecked: normalizedAccent,
    checkboxStroke: normalizedAccent,
  };
}
