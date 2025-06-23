import { DropShadowEffect } from '../types'

/**
 * Defines a drop shadow effect configuration object.
 *
 * This effect can be used to apply a drop shadow to a UI element.
 *
 * @property {string} type - The type of effect, always 'drop-shadow'.
 * @property {string} color - The color of the drop shadow, in RGBA format.
 * @property {{x: number, y: number}} offset - The offset of the drop shadow from the element.
 * @property {number} blur - The blur radius of the drop shadow.
 * @property {boolean} showShadowBehindNode - Whether the shadow should be visible behind the element.
 */
/**
 * Drop shadow effect configuration for use in Figma widget UI elements.
 *
 * @remarks
 * This object provides a consistent drop shadow style for visual elements in the widget, leveraging the Figma Widget API's effect types.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#effect | Figma Widget API Reference: Effect}
 *
 * @example
 * ```ts
 * import { dropShadowEffect } from './effects/dropShadows'
 * node.effects = [dropShadowEffect]
 * ```
 */
const dropShadowEffect: DropShadowEffect = {
  type: 'drop-shadow',
  color: '#212A6A25',
  offset: {
    x: 0,
    y: 0,
  },
  blur: 15,
  showShadowBehindNode: true,
}

export { dropShadowEffect }
