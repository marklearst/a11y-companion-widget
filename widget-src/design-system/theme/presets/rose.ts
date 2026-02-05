import { createTheme } from "../createTheme";

const roseBrand = {
  50: "#FFF1F2",
  100: "#FFE4E6",
  200: "#FECDD3",
  300: "#FDA4AF",
  400: "#FB7185",
  500: "#F43F5E",
  600: "#E11D48",
  700: "#BE123C",
  800: "#9F1239",
  900: "#881337",
  950: "#4C0519",
} as const;

const roseAccent = {
  light: "#FDA4AF",
  medium: "#F43F5E",
  dark: "#E11D48",
} as const;

/**
 * Example preset: Rose
 *
 * A warm, bold brand palette with high contrast for highlights.
 */
export const roseTheme = createTheme({
  brand: {
    purple: roseBrand,
    accent: roseAccent,
  },
});
