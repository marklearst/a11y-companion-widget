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
import { getMessages } from 'i18n'

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
  const [hideCompleted, setHideCompleted] = useSyncedState('hideCompleted', false)
  const [language, setLanguage] = useSyncedState<'en' | 'es'>('language', 'en')

  const messages = getMessages(language)

  usePropertyMenu(
    [
      {
        itemType: 'toggle',
        propertyName: 'show-tooltips',
        tooltip: messages.tooltipsToggle,
        isToggled: tooltipsEnabled,
      },
      {
        itemType: 'toggle',
        propertyName: 'hide-completed',
        tooltip: messages.hideCompletedToggle,
        isToggled: hideCompleted,
      },
      {
        itemType: 'dropdown',
        propertyName: 'language',
        tooltip: 'Language',
        selectedOption: language,
        options: [
          { option: 'en', label: 'English' },
          { option: 'es', label: 'Español' },
        ],
      },
    ],
    (event: { propertyName: string; propertyValue?: string }) => {
      const { propertyName, propertyValue } = event
      if (propertyName === 'show-tooltips') {
        setTooltipsEnabled(!tooltipsEnabled)
      }
      if (propertyName === 'hide-completed') {
        setHideCompleted(!hideCompleted)
      }
      if (propertyName === 'language' && propertyValue) {
        setLanguage(propertyValue as 'en' | 'es')
      }
    }
  )

  return { tooltipsEnabled, setTooltipsEnabled, hideCompleted, setHideCompleted, language }
}
