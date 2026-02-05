import { createTheme } from "../createTheme";

const indigoBrand = {
  50: "#EEF2FF",
  100: "#E0E7FF",
  200: "#C7D2FE",
  300: "#A5B4FC",
  400: "#818CF8",
  500: "#6366F1",
  600: "#4F46E5",
  700: "#4338CA",
  800: "#312E81",
  900: "#1E1B4B",
  950: "#0F0B2E",
} as const;

const indigoAccent = {
  light: "#A5B4FC",
  medium: "#6366F1",
  dark: "#4338CA",
} as const;

/**
 * Example preset: Indigo
 *
 * Overrides the base brand palette while keeping layout, spacing, and other
 * primitives unchanged. Useful as a reference for custom branding.
 */
export const indigoTheme = createTheme({
  brand: {
    purple: indigoBrand,
    accent: indigoAccent,
  },
});
