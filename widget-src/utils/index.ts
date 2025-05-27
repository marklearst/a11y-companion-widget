/**
 * Calculates the total and completed tasks for a checklist (sections/items structure).
 * @param sections - Array of checklist sections, each with an items array.
 * @param taskCompletion - Record of task completion states keyed by item id.
 * @returns An object containing the total number of tasks and the number of completed tasks.
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
