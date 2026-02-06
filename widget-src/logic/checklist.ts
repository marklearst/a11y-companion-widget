/**
 * Business logic helpers for checklist progress.
 */
import type { ChecklistSectionType } from "types";

export function getSectionProgress(
  section: ChecklistSectionType,
  taskCompletion: Record<string, boolean>
) {
  const completedCount = section.items.filter(
    (item) => taskCompletion[item.id]
  ).length;
  const totalCount = section.items.length;
  const isDone = completedCount === totalCount && totalCount > 0;
  return { completedCount, totalCount, isDone };
}

export function getChecklistProgress(
  sections: { items: { id: string }[] }[],
  taskCompletion: Record<string, boolean>
): { total: number; completed: number } {
  let total = 0;
  let completed = 0;

  sections.forEach((section) => {
    section.items.forEach((item) => {
      total += 1;
      if (taskCompletion[item.id]) completed += 1;
    });
  });

  return { total, completed };
}
