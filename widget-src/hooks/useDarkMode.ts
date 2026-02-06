/**
 * Hook for detecting system dark mode preference.
 *
 * @remarks
 * Widgets run in a sandboxed environment and don't have direct access to
 * window.matchMedia or system preferences. This hook stores a user preference
 * that can be manually set, but cannot automatically detect system dark mode.
 *
 * @returns The current dark mode state (user preference, defaults to light mode)
 *
 * @since 1.2.1
 */
const { widget } = figma;
const { useSyncedState } = widget;

/**
 * Custom hook that manages dark mode preference.
 *
 * @remarks
 * Widgets cannot detect system dark mode preferences automatically because they
 * don't have access to window.matchMedia. This hook stores a user preference
 * in synced state. When theme is set to "system", it defaults to light mode.
 *
 * Users can manually select "Dark" theme via the property menu for dark mode.
 *
 * @returns Boolean indicating dark mode preference (defaults to false/light mode)
 *
 * @example
 * ```ts
 * const isDarkMode = useDarkMode();
 * ```
 */
function useDarkMode(): boolean {
  // Store dark mode preference in synced state
  // Note: Widgets cannot detect system preferences, so this defaults to false (light mode)
  // When theme is "system", it will use this value (which defaults to light)
  const [isDarkMode] = useSyncedState<boolean>("systemDarkMode", false);

  // Widgets cannot detect system dark mode preferences
  // Return the stored value (defaults to false/light mode)
  // For "system" theme, users will see light mode unless they manually set dark mode
  return isDarkMode;
}

export default useDarkMode;
