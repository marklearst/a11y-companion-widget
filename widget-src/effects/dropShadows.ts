import { DropShadowEffect } from 'types/index'

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
 * import { dropShadowEffect, createDropShadowEffect } from './effects/dropShadows'
 *
 * // Use the default effect
 * node.effects = [dropShadowEffect]
 *
 * // Or create a custom one with overrides
 * const subtleShadow = createDropShadowEffect({ blur: 8, offset: { x: 0, y: 2 } })
 * node.effects = [subtleShadow]
 * ```
 */
/**
 * Default configuration for a drop shadow.
 */
const DROP_SHADOW_DEFAULTS: DropShadowEffect = {
  type: 'drop-shadow',
  color: '#212A6A25',
  offset: { x: 0, y: 0 },
  blur: 15,
  showShadowBehindNode: true,
}

/**
 * Options to customize the drop shadow. Omits the immutable `type` field
 * and allows partial overrides for nested `offset`.
 */
type DropShadowOptions = {
  color?: string
  offset?: Partial<DropShadowEffect['offset']>
  blur?: number
  showShadowBehindNode?: boolean
}

/**
 * Factory to create a drop shadow effect using sensible defaults with optional overrides.
 *
 * @param options - Partial overrides for default values.
 * @returns A fully-formed DropShadowEffect object.
 */
function createDropShadowEffect(options: DropShadowOptions = {}): DropShadowEffect {
  const d = DROP_SHADOW_DEFAULTS
  return {
    type: 'drop-shadow',
    color: options.color ?? d.color,
    offset: {
      x: options.offset?.x ?? d.offset.x,
      y: options.offset?.y ?? d.offset.y,
    },
    blur: options.blur ?? d.blur,
    showShadowBehindNode: options.showShadowBehindNode ?? d.showShadowBehindNode,
  }
}

// Backwards-compatible default export for existing imports
const dropShadowEffect: DropShadowEffect = createDropShadowEffect()

export { dropShadowEffect, createDropShadowEffect, DROP_SHADOW_DEFAULTS }
