/**
 * Hook for managing search/filter functionality.
 *
 * @remarks
 * Provides search functionality to filter checklist items by text.
 *
 * @since 1.2.0
 */
const { widget } = figma
const { useSyncedState } = widget

/**
 * Returns search state and filtered results.
 *
 * @param sections - Array of all checklist sections
 * @returns Object with search state and filtered sections
 *
 * @example
 * ```ts
 * const { searchQuery, setSearchQuery, filteredSections } = useSearch(sections)
 * ```
 */
export function useSearch<T extends { items: Array<{ id: string; text: string; wcag?: string }> }>(
  sections: T[]
) {
  const [searchQuery, setSearchQuery] = useSyncedState<string>('searchQuery', '')

  /**
   * Filters sections based on search query.
   * Matches against item text and WCAG codes.
   */
  const filteredSections = searchQuery
    ? sections
        .map((section) => {
          const filteredItems = section.items.filter((item) => {
            const query = searchQuery.toLowerCase()
            return (
              item.text.toLowerCase().includes(query) ||
              item.wcag?.toLowerCase().includes(query) ||
              false
            )
          })
          return { ...section, items: filteredItems }
        })
        .filter((section) => section.items.length > 0)
    : sections

  return {
    searchQuery,
    setSearchQuery,
    filteredSections,
  }
}




