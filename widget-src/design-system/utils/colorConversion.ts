/**
 * Color Conversion Utilities
 *
 * Convert between color formats: HEX, RGB, HSL.
 * All functions handle edge cases and return null for invalid inputs.
 */

import type { RGB, HSL } from "../types/primitives";

// ============================================
// HEX <-> RGB
// ============================================

/**
 * Convert hex color to RGB
 *
 * Supports 3-digit (#RGB), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA) hex codes.
 * Alpha channel is ignored.
 *
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 *
 * @example
 * ```ts
 * hexToRgb('#FF5733')  // { r: 255, g: 87, b: 51 }
 * hexToRgb('FF5733')   // { r: 255, g: 87, b: 51 }
 * hexToRgb('#F57')     // { r: 255, g: 85, b: 119 }
 * hexToRgb('invalid')  // null
 * ```
 */
export function hexToRgb(hex: string): RGB | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "");

  // Validate hex format
  if (!/^[0-9A-Fa-f]{3,8}$/.test(cleanHex)) {
    return null;
  }

  let r: number, g: number, b: number;

  if (cleanHex.length === 3) {
    // 3-digit hex (#RGB -> #RRGGBB)
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6 || cleanHex.length === 8) {
    // 6-digit or 8-digit hex (ignore alpha)
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return null;
  }

  // Validate parsed values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

  return { r, g, b };
}

/**
 * Convert RGB to hex color
 *
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns Hex color string (e.g., '#FF5733')
 *
 * @example
 * ```ts
 * rgbToHex(255, 87, 51)  // '#FF5733'
 * rgbToHex(0, 0, 0)      // '#000000'
 * ```
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // Clamp values to 0-255
  const rClamped = Math.min(255, Math.max(0, Math.round(r)));
  const gClamped = Math.min(255, Math.max(0, Math.round(g)));
  const bClamped = Math.min(255, Math.max(0, Math.round(b)));

  // Convert to hex with padding
  const rHex = rClamped.toString(16).padStart(2, "0");
  const gHex = gClamped.toString(16).padStart(2, "0");
  const bHex = bClamped.toString(16).padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

/**
 * Convert RGB object to hex
 */
export function rgbObjectToHex(rgb: RGB): string {
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ============================================
// HSL <-> RGB
// ============================================

/**
 * Convert HSL to RGB
 *
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns RGB object
 *
 * @example
 * ```ts
 * hslToRgb(0, 100, 50)    // { r: 255, g: 0, b: 0 } (red)
 * hslToRgb(120, 100, 50)  // { r: 0, g: 255, b: 0 } (green)
 * hslToRgb(240, 100, 50)  // { r: 0, g: 0, b: 255 } (blue)
 * ```
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  // Normalize inputs
  const hNorm = ((h % 360) + 360) % 360; // Wrap to 0-360
  const sNorm = Math.min(100, Math.max(0, s)) / 100; // Clamp to 0-1
  const lNorm = Math.min(100, Math.max(0, l)) / 100; // Clamp to 0-1

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm; // Chroma
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (hNorm >= 0 && hNorm < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hNorm >= 60 && hNorm < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hNorm >= 120 && hNorm < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hNorm >= 180 && hNorm < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hNorm >= 240 && hNorm < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Convert HSL object to RGB
 */
export function hslObjectToRgb(hsl: HSL): RGB {
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

/**
 * Convert RGB to HSL
 *
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns HSL object
 *
 * @example
 * ```ts
 * rgbToHsl(255, 0, 0)    // { h: 0, s: 100, l: 50 } (red)
 * rgbToHsl(0, 255, 0)    // { h: 120, s: 100, l: 50 } (green)
 * rgbToHsl(0, 0, 255)    // { h: 240, s: 100, l: 50 } (blue)
 * ```
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  // Normalize to 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    // Calculate saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Calculate hue
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / delta + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert RGB object to HSL
 */
export function rgbObjectToHsl(rgb: RGB): HSL {
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// ============================================
// Parsing & Named Colors
// ============================================

/**
 * Named CSS colors
 */
const NAMED_COLORS: Record<string, RGB> = {
  black: { r: 0, g: 0, b: 0 },
  white: { r: 255, g: 255, b: 255 },
  red: { r: 255, g: 0, b: 0 },
  green: { r: 0, g: 128, b: 0 },
  blue: { r: 0, g: 0, b: 255 },
  yellow: { r: 255, g: 255, b: 0 },
  cyan: { r: 0, g: 255, b: 255 },
  magenta: { r: 255, g: 0, b: 255 },
  gray: { r: 128, g: 128, b: 128 },
  silver: { r: 192, g: 192, b: 192 },
  maroon: { r: 128, g: 0, b: 0 },
  olive: { r: 128, g: 128, b: 0 },
  lime: { r: 0, g: 255, b: 0 },
  aqua: { r: 0, g: 255, b: 255 },
  teal: { r: 0, g: 128, b: 128 },
  navy: { r: 0, g: 0, b: 128 },
  fuchsia: { r: 255, g: 0, b: 255 },
  purple: { r: 128, g: 0, b: 128 },
  orange: { r: 255, g: 165, b: 0 },
};

/**
 * Parse color string to RGB
 *
 * Supports:
 * - Hex: #RGB, #RRGGBB, #RRGGBBAA
 * - RGB: rgb(r, g, b)
 * - Named colors: red, blue, etc.
 *
 * @param color - Color string
 * @returns RGB object or null if invalid
 *
 * @example
 * ```ts
 * parseColor('#FF5733')           // { r: 255, g: 87, b: 51 }
 * parseColor('rgb(255, 87, 51)')  // { r: 255, g: 87, b: 51 }
 * parseColor('red')               // { r: 255, g: 0, b: 0 }
 * parseColor('invalid')           // null
 * ```
 */
export function parseColor(color: string): RGB | null {
  const trimmed = color.trim().toLowerCase();

  // Try hex
  if (trimmed.startsWith("#") || /^[0-9a-f]{3,8}$/i.test(trimmed)) {
    return hexToRgb(trimmed);
  }

  // Try rgb(r, g, b)
  const rgbMatch = trimmed.match(
    /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
  );
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    return {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
    };
  }

  // Try named color
  if (NAMED_COLORS[trimmed]) {
    return NAMED_COLORS[trimmed];
  }

  return null;
}

// ============================================
// Opacity Utilities
// ============================================

/**
 * Add opacity to hex color (returns rgba string for Figma)
 *
 * Note: Figma widgets accept hex colors but opacity is set separately.
 * This function is for reference/documentation purposes.
 *
 * @param hexColor - Hex color string
 * @param opacity - Opacity (0-1)
 * @returns RGBA string
 *
 * @example
 * ```ts
 * withOpacity('#FF5733', 0.5)  // 'rgba(255, 87, 51, 0.5)'
 * ```
 */
export function withOpacity(hexColor: string, opacity: number): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;

  const clampedOpacity = Math.min(1, Math.max(0, opacity));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedOpacity})`;
}

/**
 * Convert opacity to hex alpha value
 *
 * @param opacity - Opacity (0-1)
 * @returns Hex alpha (00-FF)
 */
export function opacityToHex(opacity: number): string {
  const clampedOpacity = Math.min(1, Math.max(0, opacity));
  const alpha = Math.round(clampedOpacity * 255);
  return alpha.toString(16).padStart(2, "0").toUpperCase();
}

/**
 * Add alpha channel to hex color
 *
 * @param hexColor - Hex color string
 * @param opacity - Opacity (0-1)
 * @returns 8-digit hex color with alpha
 *
 * @example
 * ```ts
 * hexWithAlpha('#FF5733', 0.5)  // '#FF573380'
 * ```
 */
export function hexWithAlpha(hexColor: string, opacity: number): string {
  const cleanHex = hexColor.replace(/^#/, "");
  const alpha = opacityToHex(opacity);

  // Handle 3-digit hex
  if (cleanHex.length === 3) {
    const expanded = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
    return `#${expanded}${alpha}`;
  }

  // Handle 6-digit hex
  if (cleanHex.length === 6) {
    return `#${cleanHex}${alpha}`;
  }

  // Handle 8-digit hex (replace alpha)
  if (cleanHex.length === 8) {
    return `#${cleanHex.substring(0, 6)}${alpha}`;
  }

  return hexColor;
}
