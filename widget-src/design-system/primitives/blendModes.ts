/**
 * Blend Mode Primitive
 *
 * All 18 blend modes supported by Figma widgets.
 * These affect how layers composite with layers beneath them.
 */

import type { BlendMode } from "../types/primitives";

/**
 * Blend mode constants
 *
 * Figma Widget API supports all 18 blend modes.
 * Use these for layer compositing effects.
 *
 * @see https://www.figma.com/widget-docs/api/type-BlendMode/
 */
export const blendModes = {
  // Normal blending (default)
  passThrough: "pass-through" as BlendMode, // Inherit from parent
  normal: "normal" as BlendMode, // Standard alpha compositing

  // Darken modes
  darken: "darken" as BlendMode, // Keeps darkest pixels
  multiply: "multiply" as BlendMode, // Multiplies colors (darkens)
  colorBurn: "color-burn" as BlendMode, // Increases contrast, darkens

  // Lighten modes
  lighten: "lighten" as BlendMode, // Keeps lightest pixels
  screen: "screen" as BlendMode, // Inverts, multiplies, inverts (lightens)
  colorDodge: "color-dodge" as BlendMode, // Decreases contrast, lightens

  // Contrast modes
  overlay: "overlay" as BlendMode, // Multiply + screen (increases contrast)
  softLight: "soft-light" as BlendMode, // Subtle contrast increase
  hardLight: "hard-light" as BlendMode, // Strong contrast increase

  // Inversion modes
  difference: "difference" as BlendMode, // Subtracts colors
  exclusion: "exclusion" as BlendMode, // Similar to difference, lower contrast

  // Component modes (HSL-based)
  hue: "hue" as BlendMode, // Takes hue, keeps saturation/luminosity
  saturation: "saturation" as BlendMode, // Takes saturation, keeps hue/luminosity
  color: "color" as BlendMode, // Takes hue + saturation, keeps luminosity
  luminosity: "luminosity" as BlendMode, // Takes luminosity, keeps hue/saturation
} as const;

/**
 * Semantic blend mode usage
 *
 * Common use cases for blend modes in UI design.
 */
export const semanticBlendModes = {
  // Default (no blending)
  default: blendModes.normal,

  // Overlay effects
  overlay: {
    subtle: blendModes.softLight,
    strong: blendModes.overlay,
  },

  // Image effects
  image: {
    duotone: blendModes.color, // For duotone image effects
    tint: blendModes.hue, // For tinting images
  },

  // Shadow/highlight effects
  shadow: blendModes.multiply, // Darken for shadows
  highlight: blendModes.screen, // Lighten for highlights

  // Special effects
  invert: blendModes.difference, // Inversion effects
} as const;

/**
 * Blend mode descriptions for documentation
 *
 * Helpful when choosing the right blend mode.
 */
export const blendModeDescriptions: Record<BlendMode, string> = {
  "pass-through": "Inherits blend mode from parent group",
  normal: "Standard alpha compositing (default)",
  darken: "Keeps the darkest color from each pixel",
  multiply: "Multiplies colors, always darkens",
  "color-burn": "Increases contrast and darkens",
  lighten: "Keeps the lightest color from each pixel",
  screen: "Opposite of multiply, always lightens",
  "color-dodge": "Decreases contrast and lightens",
  overlay: "Combines multiply and screen for contrast",
  "soft-light": "Subtle version of overlay",
  "hard-light": "Strong version of overlay",
  difference: "Subtracts colors, creates inversion",
  exclusion: "Like difference but lower contrast",
  hue: "Takes hue, preserves saturation and luminosity",
  saturation: "Takes saturation, preserves hue and luminosity",
  color: "Takes hue and saturation, preserves luminosity",
  luminosity: "Takes luminosity, preserves hue and saturation",
};
