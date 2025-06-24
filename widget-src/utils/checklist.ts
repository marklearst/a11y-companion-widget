/**
 * Utility functions for computing checklist progress.
 *
 * @remarks
 * Provides helpers for calculating progress and completion state for checklist sections and the entire checklist.
 *
 * @since 1.0.0
 */
import { ChecklistSectionType } from 'types'

/**
 * Returns the progress for a checklist section: completed count, total count, and done state.
 *
 * @param section - The checklist section to compute progress for.
 * @param taskCompletion - An object mapping task IDs to their completion state.
 * @returns An object with:
 *   - `completedCount`: Number of completed tasks in the section
 *   - `totalCount`: Total number of tasks in the section
 *   - `isDone`: Whether all tasks in the section are completed
 *
 * @example
 * ```ts
 * const progress = getSectionProgress(section, taskCompletion)
 * // progress = { completedCount: 3, totalCount: 5, isDone: false }
 * ```
 */
export function getSectionProgress(
  section: ChecklistSectionType,
  taskCompletion: Record<string, boolean>
) {
  const completedCount = section.items.filter(
    (item) => taskCompletion[item.id]
  ).length
  const totalCount = section.items.length
  const isDone = completedCount === totalCount && totalCount > 0
  return { completedCount, totalCount, isDone }
}

/**
 * Returns the total and completed checklist items across all sections.
 *
 * @param sections - Array of checklist sections
 * @param taskCompletion - An object mapping task IDs to their completion state
 * @returns An object with `total` and `completed` counts for the checklist
 *
 * @example
 * ```ts
 * const progress = getChecklistProgress(sections, taskCompletion)
 * // progress = { total: 12, completed: 7 }
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
export function getChecklistProgress(
  sections: { items: { id: string }[] }[],
  taskCompletion: Record<string, boolean>
): { total: number; completed: number } {
  let total = 0
  let completed = 0

  sections.forEach((section) => {
    section.items.forEach((item) => {
      total += 1
      if (taskCompletion[item.id]) completed += 1
    })
  })

  return { total, completed }
}
