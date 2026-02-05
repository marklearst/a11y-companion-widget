import { createTheme } from "../createTheme";

const cyanBrand = {
  50: "#ECFEFF",
  100: "#CFFAFE",
  200: "#A5F3FC",
  300: "#67E8F9",
  400: "#22D3EE",
  500: "#06B6D4",
  600: "#0891B2",
  700: "#0E7490",
  800: "#155E75",
  900: "#164E63",
  950: "#083344",
} as const;

const cyanAccent = {
  light: "#67E8F9",
  medium: "#06B6D4",
  dark: "#0891B2",
} as const;

/**
 * Example preset: Cyan
 *
 * Bright, crisp palette with strong contrast for accents.
 */
export const cyanTheme = createTheme({
  brand: {
    purple: cyanBrand,
    accent: cyanAccent,
  },
});
