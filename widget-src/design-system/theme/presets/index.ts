import { defaultTheme } from "../default";
import { cyanTheme } from "./cyan";
import { emeraldTheme } from "./emerald";
import { indigoTheme } from "./indigo";
import { roseTheme } from "./rose";
import { slateTheme } from "./slate";

export const themePresets = {
  default: defaultTheme,
  indigo: indigoTheme,
  emerald: emeraldTheme,
  rose: roseTheme,
  slate: slateTheme,
  cyan: cyanTheme,
} as const;

export type ThemePresetName = keyof typeof themePresets;

export function getThemePreset(name: ThemePresetName) {
  return themePresets[name];
}
