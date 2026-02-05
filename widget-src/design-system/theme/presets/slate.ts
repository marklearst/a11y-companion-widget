import { createTheme } from "../createTheme";

const slateBrand = {
  50: "#F8FAFC",
  100: "#F1F5F9",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
  950: "#020617",
} as const;

const slateAccent = {
  light: "#CBD5E1",
  medium: "#64748B",
  dark: "#334155",
} as const;

/**
 * Example preset: Slate
 *
 * Neutral-forward palette with low saturation for calm UI.
 */
export const slateTheme = createTheme({
  brand: {
    purple: slateBrand,
    accent: slateAccent,
  },
});
