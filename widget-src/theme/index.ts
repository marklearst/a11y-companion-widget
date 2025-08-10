export type ThemeName = 'light' | 'dark'

export type ThemeTokens = {
  panelBg: string
  panelStroke: string
  headerBg: string
  headerText: string
  textPrimary: string
  textSecondary: string
  progressBg: string
  progressFill: string
  checkboxBgChecked: string
  checkboxBgUnchecked: string
  checkboxStroke: string
  wcagBadge: string
}

export const light: ThemeTokens = {
  panelBg: '#FFFFFF',
  panelStroke: '#212A6A',
  headerBg: '#212A6A',
  headerText: '#FFFFFF',
  textPrimary: '#212A6A',
  textSecondary: '#212A6A',
  progressBg: '#9299ce',
  progressFill: '#212a6a',
  checkboxBgChecked: '#212a6a',
  checkboxBgUnchecked: '#FFFFFF',
  checkboxStroke: '#212a6a',
  wcagBadge: '#9299CE',
}

export const dark: ThemeTokens = {
  panelBg: '#222222',
  panelStroke: '#B7BCE6',
  headerBg: '#12163b',
  headerText: '#FFFFFF',
  textPrimary: '#E6E8FF',
  textSecondary: '#C8CBF2',
  progressBg: '#4e5594',
  progressFill: '#b8bdf7',
  checkboxBgChecked: '#b8bdf7',
  checkboxBgUnchecked: '#222222',
  checkboxStroke: '#b8bdf7',
  wcagBadge: '#B7BCE6',
}

export function resolveTheme(isDark: boolean): ThemeTokens {
  return isDark ? dark : light
}
