/**
 * UI-related types for visual effects and styling.
 *
 * @remarks
 * This module contains types related to visual effects, styling,
 * and other UI-specific interfaces used in the Figma widget.
 * These types ensure compatibility with the Figma Widget API.
 *
 * @since 1.0.0 - Extracted from monolithic types file
 */

/**
 * Represents a drop shadow effect that can be applied to a UI element.
 *
 * @remarks
 * Used to describe visual effects for Figma widget UI elements. Matches the Figma Widget API's drop-shadow effect type.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#effect | Figma Widget API Reference: Effect}
 *
 * @example
 * ```ts
 * const effect: DropShadowEffect = {
 *   type: 'drop-shadow',
 *   color: '#212A6A25',
 *   offset: { x: 0, y: 0 },
 *   blur: 15,
 *   showShadowBehindNode: true
 * };
 * ```
 */
export interface DropShadowEffect {
  /** The type of effect, always 'drop-shadow' for this interface. */
  type: 'drop-shadow'
  /** The color of the drop shadow in hex format. */
  color: string
  /** The offset of the shadow from the element. */
  offset: { x: number; y: number }
  /** The blur radius of the shadow. */
  blur: number
  /** Whether to show the shadow behind the node. */
  showShadowBehindNode: boolean
}
