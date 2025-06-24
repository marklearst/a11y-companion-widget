/**
 * Hook for computing progress state for a checklist section.
 *
 * @remarks
 * Provides a simple interface to get the number of completed and total tasks in a section, using checklist section data and the current task completion state.
 *
 * @since 1.0.0
 */
import { ChecklistSectionType } from 'types'
import { getSectionProgress } from 'utils/checklist'

/**
 * Returns the progress for a checklist section.
 *
 * @param section - The checklist section to compute progress for.
 * @param taskCompletion - An object mapping task IDs to their completion state.
 * @returns An object with `completed` and `total` counts for the section.
 *
 * @example
 * ```ts
 * const { completed, total } = useChecklistProgress(section, taskCompletion)
 * ```
 */
export function useChecklistProgress(
  section: ChecklistSectionType,
  taskCompletion: Record<string, boolean>
) {
  return getSectionProgress(section, taskCompletion)
}
