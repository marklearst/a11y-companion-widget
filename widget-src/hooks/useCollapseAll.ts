/**
 * Hook for managing collapse/expand all sections functionality.
 *
 * @remarks
 * Provides functionality to collapse or expand all sections at once.
 *
 * @since 1.2.0
 */
import type { ChecklistSectionType } from 'types'
import { useOpenSections } from 'hooks/useOpenSections'

/**
 * Returns handlers for collapsing/expanding all sections.
 *
 * @param sections - Array of all checklist sections
 * @returns Object with collapse/expand handlers
 *
 * @example
 * ```ts
 * const { collapseAll, expandAll, isAllCollapsed, isAllExpanded } = useCollapseAll(sections)
 * ```
 */
export function useCollapseAll(sections: ChecklistSectionType[]) {
  const { openSections, setOpenSections } = useOpenSections()

  /**
   * Collapses all sections.
   */
  const collapseAll = () => {
    const newState: Record<string, boolean> = {}
    sections.forEach((section) => {
      newState[section.id] = false
    })
    setOpenSections(newState)
  }

  /**
   * Expands all sections.
   */
  const expandAll = () => {
    const newState: Record<string, boolean> = {}
    sections.forEach((section) => {
      newState[section.id] = true
    })
    setOpenSections(newState)
  }

  /**
   * Checks if all sections are collapsed.
   */
  const isAllCollapsed = sections.every((section) => !openSections[section.id])

  /**
   * Checks if all sections are expanded.
   */
  const isAllExpanded = sections.every((section) => openSections[section.id] === true)

  return {
    collapseAll,
    expandAll,
    isAllCollapsed,
    isAllExpanded,
  }
}

