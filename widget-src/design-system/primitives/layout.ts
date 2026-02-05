/**
 * Layout Primitive
 *
 * Constants for z-index layering, overflow behavior, and alignment.
 * These provide consistent layout behavior across the widget.
 */

import type {
  ZIndex,
  Overflow,
  Alignment,
  LayoutConstants,
} from "../types/primitives";

/**
 * Z-index scale
 *
 * Standardized layering system for stacking contexts.
 * Use these to ensure consistent stacking order.
 *
 * Scale: 0 (base) to 50 (tooltip) in increments of 10.
 */
export const zIndex: ZIndex = {
  base: 0, // Base layer (default)
  dropdown: 10, // Dropdowns, menus
  sticky: 20, // Sticky elements
  modal: 30, // Modal dialogs
  popover: 40, // Popovers
  tooltip: 50, // Tooltips (highest)
} as const;

/**
 * Overflow behavior
 *
 * How content behaves when it exceeds container bounds.
 */
export const overflow = {
  visible: "visible" as Overflow, // Content extends beyond bounds
  hidden: "hidden" as Overflow, // Content is clipped
  scroll: "scroll" as Overflow, // Scrollable content
} as const;

/**
 * Alignment constants
 *
 * Figma uses 'min', 'center', 'max' for alignment.
 * These map to start/center/end semantically.
 */
export const alignment = {
  start: "min" as Alignment, // Align to start (left/top)
  center: "center" as Alignment, // Align to center
  end: "max" as Alignment, // Align to end (right/bottom)
} as const;

/**
 * Spacing distribution
 *
 * How space is distributed in AutoLayout.
 */
export const spacingMode = {
  packed: "packed", // No space distribution
  spaceBetween: "space-between", // Space between items
} as const;

/**
 * Sizing modes
 *
 * How components size themselves in AutoLayout.
 */
export const sizing = {
  fixed: "fixed", // Fixed size
  hug: "hug", // Hug contents
  fill: "fill", // Fill container
} as const;

/**
 * Layout direction
 *
 * AutoLayout direction (horizontal or vertical).
 */
export const direction = {
  horizontal: "horizontal",
  vertical: "vertical",
} as const;

/**
 * All layout constants
 */
export const layout: LayoutConstants = {
  zIndex,
  overflow,
  alignment,
} as const;

/**
 * Common layout patterns
 *
 * Pre-defined layout configurations for common UI patterns.
 */
export const layoutPatterns = {
  // Stack layouts (vertical)
  stack: {
    direction: direction.vertical,
    spacing: 12,
    alignment: alignment.start,
  },

  // Inline layouts (horizontal)
  inline: {
    direction: direction.horizontal,
    spacing: 8,
    alignment: alignment.center,
  },

  // Centered content
  centered: {
    horizontalAlign: alignment.center,
    verticalAlign: alignment.center,
  },

  // Space between layout
  spaceBetween: {
    direction: direction.horizontal,
    spacing: spacingMode.spaceBetween,
    alignment: alignment.center,
  },
} as const;
