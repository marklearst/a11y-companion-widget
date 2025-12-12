/**
 * Hook for managing bulk actions on checklist sections.
 *
 * @remarks
 * Provides functionality to mark all items in a section as complete or incomplete.
 *
 * @since 1.2.0
 */
const { widget } = figma
const { useSyncedState } = widget

import type { ChecklistSectionType } from 'types'

/**
 * Returns handlers for bulk actions on checklist sections.
 *
 * @param handleCheckChange - Function to handle individual checkbox changes
 * @returns Object with bulk action handlers
 *
 * @example
 * ```ts
 * const { markSectionComplete, markSectionIncomplete } = useBulkActions(handleCheckChange)
 * ```
 */
export function useBulkActions(
  handleCheckChange: (taskId: string, isChecked: boolean) => void
) {
  /**
   * Marks all items in a section as complete.
   */
  const markSectionComplete = (section: ChecklistSectionType) => {
    section.items.forEach((item) => {
      if (!item.id) return
      handleCheckChange(item.id, true)
    })
  }

  /**
   * Marks all items in a section as incomplete.
   */
  const markSectionIncomplete = (section: ChecklistSectionType) => {
    section.items.forEach((item) => {
      if (!item.id) return
      handleCheckChange(item.id, false)
    })
  }

  /**
   * Toggles all items in a section (complete if any incomplete, incomplete if all complete).
   */
  const toggleSection = (
    section: ChecklistSectionType,
    taskCompletion: Record<string, boolean>
  ) => {
    const allComplete = section.items.every((item) => taskCompletion[item.id])
    const newState = !allComplete
    section.items.forEach((item) => {
      if (!item.id) return
      handleCheckChange(item.id, newState)
    })
  }

  return {
    markSectionComplete,
    markSectionIncomplete,
    toggleSection,
  }
}




