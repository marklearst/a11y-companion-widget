/**
 * Hook for managing open/close state of checklist sections.
 *
 * @remarks
 * Provides state and helpers for toggling the expanded/collapsed state of checklist sections in the widget UI. Uses Figma's `useSyncedState` to persist state across widget instances.
 *
 * @since 1.0.0
 */
const { widget } = figma
const { useSyncedState } = widget

/**
 * Returns state and helpers for controlling open/close state of checklist sections.
 *
 * @returns An object with:
 * - `openSections`: Record of section titles to open/close state
 * - `setOpenSections`: State updater for open sections
 * - `toggleSection`: Function to toggle a section's open/close state
 *
 * @example
 * ```ts
 * const { openSections, toggleSection } = useOpenSections()
 * ```
 */
export function useOpenSections() {
  const [openSections, setOpenSections] = useSyncedState<Record<string, boolean>>(
    'openSections',
    {}
  )

  /**
   * Toggles the open/close state for a section by title.
   * @param sectionTitle - The title of the section to toggle.
   */
  function toggleSection(sectionTitle: string) {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  return { openSections, setOpenSections, toggleSection }
}
