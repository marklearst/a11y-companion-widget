import {
  brand as defaultBrand,
  neutral as defaultNeutral,
  semantic as defaultSemantic,
  type ThemeBase,
  createThemeTokens,
} from "./default";
import type { ThemeConfig, ThemeOverrides } from "./types";

const baseTheme: ThemeBase = {
  brand: defaultBrand,
  neutral: defaultNeutral,
  semantic: defaultSemantic,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overrides: Partial<T>): T {
  if (!isPlainObject(base) || !isPlainObject(overrides)) {
    return (overrides !== undefined ? overrides : base) as T;
  }

  const result: Record<string, unknown> = { ...base };

  for (const [key, overrideValue] of Object.entries(overrides)) {
    if (overrideValue === undefined) continue;

    const baseValue = (base as Record<string, unknown>)[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

function pick<T extends Record<string, unknown>, K extends keyof T>(
  source: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in source) {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Create a theme by deep-merging overrides onto the default theme.
 * Base palettes are merged first, then tokens are derived, then token overrides apply.
 */
export function createTheme(overrides: ThemeOverrides = {}): ThemeConfig {
  const baseOverrides = pick(overrides as ThemeConfig, [
    "brand",
    "neutral",
    "semantic",
  ]);
  const tokenOverrides = pick(overrides as ThemeConfig, [
    "lightTheme",
    "darkTheme",
    "shadows",
  ]);

  const mergedBase = deepMerge(baseTheme, baseOverrides as Partial<ThemeBase>);
  const derivedTokens = createThemeTokens(mergedBase);
  const merged = deepMerge(
    { ...mergedBase, ...derivedTokens },
    tokenOverrides as Partial<ThemeConfig>,
  );

  return merged as ThemeConfig;
}
