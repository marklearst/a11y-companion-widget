/**
 * Gradient Primitive
 *
 * Pre-defined gradient styles for backgrounds and decorative elements.
 * Figma widgets support linear, radial, angular, and diamond gradients.
 */

import type {
  LinearGradient,
  RadialGradient,
  AngularGradient,
  DiamondGradient,
} from "../types/primitives";
import { indigo, purple, gray, blue } from "./color";

/**
 * Linear gradients
 */
export const linearGradients = {
  // Brand gradients
  brandPrimary: {
    type: "linear",
    angle: 135, // Diagonal top-left to bottom-right
    stops: [
      { color: indigo[500], position: 0 },
      { color: purple[500], position: 1 },
    ],
  } as LinearGradient,

  brandSubtle: {
    type: "linear",
    angle: 135,
    stops: [
      { color: indigo[100], position: 0 },
      { color: purple[100], position: 1 },
    ],
  } as LinearGradient,

  // Neutral gradients
  neutralLight: {
    type: "linear",
    angle: 180, // Top to bottom
    stops: [
      { color: gray[50], position: 0 },
      { color: gray[100], position: 1 },
    ],
  } as LinearGradient,

  neutralDark: {
    type: "linear",
    angle: 180,
    stops: [
      { color: gray[800], position: 0 },
      { color: gray[900], position: 1 },
    ],
  } as LinearGradient,

  // Accent gradients
  ocean: {
    type: "linear",
    angle: 135,
    stops: [
      { color: blue[400], position: 0 },
      { color: indigo[600], position: 1 },
    ],
  } as LinearGradient,

  sunset: {
    type: "linear",
    angle: 135,
    stops: [
      { color: "#F59E0B", position: 0 }, // amber-500
      { color: "#EF4444", position: 1 }, // red-500
    ],
  } as LinearGradient,
} as const;

/**
 * Radial gradients
 */
export const radialGradients = {
  // Spotlight effect
  spotlight: {
    type: "radial",
    stops: [
      { color: "rgba(255, 255, 255, 0.2)", position: 0 },
      { color: "rgba(255, 255, 255, 0)", position: 1 },
    ],
  } as RadialGradient,

  // Glow effect
  glow: {
    type: "radial",
    stops: [
      { color: indigo[400], position: 0 },
      { color: indigo[600], position: 0.5 },
      { color: "transparent", position: 1 },
    ],
  } as RadialGradient,
} as const;

/**
 * Angular gradients (conic)
 */
export const angularGradients = {
  // Rainbow spinner
  spinner: {
    type: "angular",
    angle: 0,
    stops: [
      { color: indigo[500], position: 0 },
      { color: purple[500], position: 0.33 },
      { color: blue[500], position: 0.66 },
      { color: indigo[500], position: 1 },
    ],
  } as AngularGradient,
} as const;

/**
 * Diamond gradients
 */
export const diamondGradients = {
  // Subtle diamond
  subtle: {
    type: "diamond",
    stops: [
      { color: gray[100], position: 0 },
      { color: gray[200], position: 1 },
    ],
  } as DiamondGradient,
} as const;

/**
 * All gradients export
 */
export const gradients = {
  linear: linearGradients,
  radial: radialGradients,
  angular: angularGradients,
  diamond: diamondGradients,
} as const;
