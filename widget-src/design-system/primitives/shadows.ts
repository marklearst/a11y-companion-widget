/**
 * Shadow Primitive
 *
 * Layered shadow system for depth and elevation.
 * Each shadow level combines multiple shadow layers for realistic depth.
 */

import type { ShadowScale, Shadow } from "../types/primitives";

/**
 * Shadow scale
 *
 * Progressive elevation system. Higher values = more elevation.
 *
 * Each shadow is an array because Figma supports multiple shadow layers.
 * Combining ambient + directional shadows creates realistic depth.
 */
export const shadows: ShadowScale = {
  // No shadow
  none: [],

  // Subtle elevation (1-2px)
  sm: [
    {
      offsetX: 0,
      offsetY: 1,
      blur: 2,
      spread: 0,
      color: "rgba(0, 0, 0, 0.05)",
    },
  ] as Shadow[],

  // Default elevation (2-4px)
  base: [
    {
      offsetX: 0,
      offsetY: 1,
      blur: 3,
      spread: 0,
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      offsetX: 0,
      offsetY: 1,
      blur: 2,
      spread: 0,
      color: "rgba(0, 0, 0, 0.06)",
    },
  ] as Shadow[],

  // Medium elevation (4-8px)
  md: [
    {
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: -1,
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      offsetX: 0,
      offsetY: 2,
      blur: 4,
      spread: -1,
      color: "rgba(0, 0, 0, 0.06)",
    },
  ] as Shadow[],

  // High elevation (8-16px)
  lg: [
    {
      offsetX: 0,
      offsetY: 10,
      blur: 15,
      spread: -3,
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: -2,
      color: "rgba(0, 0, 0, 0.05)",
    },
  ] as Shadow[],

  // Very high elevation (16-24px)
  xl: [
    {
      offsetX: 0,
      offsetY: 20,
      blur: 25,
      spread: -5,
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      offsetX: 0,
      offsetY: 10,
      blur: 10,
      spread: -5,
      color: "rgba(0, 0, 0, 0.04)",
    },
  ] as Shadow[],

  // Maximum elevation (24px+)
  "2xl": [
    {
      offsetX: 0,
      offsetY: 25,
      blur: 50,
      spread: -12,
      color: "rgba(0, 0, 0, 0.25)",
    },
  ] as Shadow[],

  // Inner shadow (inset effect)
  inner: [
    {
      offsetX: 0,
      offsetY: 2,
      blur: 4,
      spread: 0,
      color: "rgba(0, 0, 0, 0.06)",
    },
  ] as Shadow[],
} as const;

/**
 * Semantic shadow tokens
 *
 * Pre-defined shadows for common UI elements.
 */
export const semanticShadows = {
  card: shadows.sm, // Cards, panels
  dropdown: shadows.lg, // Dropdowns, popovers
  modal: shadows["2xl"], // Modals, dialogs
  tooltip: shadows.base, // Tooltips
  button: shadows.none, // Buttons (flat by default)
  buttonHover: shadows.sm, // Button hover state
  input: shadows.none, // Inputs
  inputFocus: shadows.base, // Input focus state
} as const;

/**
 * Color-specific shadows
 *
 * Shadows with color tints for brand elements.
 */
export const coloredShadows = {
  // Indigo shadow (brand primary)
  indigo: [
    {
      offsetX: 0,
      offsetY: 4,
      blur: 12,
      spread: 0,
      color: "rgba(99, 102, 241, 0.3)", // indigo-500 at 30%
    },
  ] as Shadow[],

  // Purple shadow (brand accent)
  purple: [
    {
      offsetX: 0,
      offsetY: 4,
      blur: 12,
      spread: 0,
      color: "rgba(168, 85, 247, 0.3)", // purple-500 at 30%
    },
  ] as Shadow[],

  // Success shadow
  success: [
    {
      offsetX: 0,
      offsetY: 4,
      blur: 12,
      spread: 0,
      color: "rgba(34, 197, 94, 0.3)", // green-500 at 30%
    },
  ] as Shadow[],

  // Error shadow
  error: [
    {
      offsetX: 0,
      offsetY: 4,
      blur: 12,
      spread: 0,
      color: "rgba(239, 68, 68, 0.3)", // red-500 at 30%
    },
  ] as Shadow[],
} as const;
