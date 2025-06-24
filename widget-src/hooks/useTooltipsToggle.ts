/**
 * Hook for managing the tooltip toggle property menu in the checklist widget.
 *
 * @remarks
 * Provides state and helpers for enabling or disabling tooltips on checklist items via the Figma property menu. Uses Figma's `useSyncedState` and `usePropertyMenu` hooks.
 *
 * @since 1.0.0
 */
const { widget } = figma
const { usePropertyMenu, useSyncedState } = widget

/**
 * Returns state and helpers for controlling tooltip visibility via the property menu.
 *
 * @returns An object with:
 * - `tooltipsEnabled`: Boolean state for whether tooltips are enabled
 * - `setTooltipsEnabled`: State updater for tooltipsEnabled
 *
 * @example
 * ```ts
 * const { tooltipsEnabled, setTooltipsEnabled } = useTooltipsToggle()
 * ```
 *
 * @sideEffects
 * Registers a property menu item in the Figma widget UI for toggling tooltips.
 */
export function useTooltipsToggle() {
  const [tooltipsEnabled, setTooltipsEnabled] = useSyncedState('tooltipsEnabled', false)

  usePropertyMenu(
    [
      {
        itemType: 'toggle',
        propertyName: 'show-tooltips',
        tooltip: 'Show tooltips on checkable items',
        isToggled: tooltipsEnabled,
      },
    ],
    ({ propertyName }) => {
      if (propertyName === 'show-tooltips') {
        setTooltipsEnabled(!tooltipsEnabled)
      }
    }
  )

  return { tooltipsEnabled, setTooltipsEnabled }
}
