const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Validate and normalize a hex color string to uppercase `#RRGGBB`.
 *
 * Returns `undefined` for invalid input.
 */
export function normalizeHexColor(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!HEX_COLOR_REGEX.test(trimmed)) return undefined;
  if (trimmed.length === 4) {
    const [r, g, b] = trimmed.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return trimmed.toUpperCase();
}

