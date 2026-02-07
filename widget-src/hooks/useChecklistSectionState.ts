import { useChecklistProgress } from "hooks/useChecklistProgress";
import { useOpenSections } from "hooks/useOpenSections";
import { useBulkActions } from "hooks/useBulkActions";
import { withOpacity } from "design-system/theme/default";
import type { ChecklistSectionType } from "types";
import type { ChecklistVariables } from "design-system";

type UseChecklistSectionStateOptions = {
  section: ChecklistSectionType;
  taskCompletion: Record<string, boolean>;
  handleCheckChange: (taskId: string, isChecked: boolean) => void;
  hideCompleted?: boolean;
  labels?: { checkAll: string; uncheckAll: string };
  ui: ChecklistVariables;
};

export function useChecklistSectionState({
  section,
  taskCompletion,
  handleCheckChange,
  hideCompleted,
  labels,
  ui,
}: UseChecklistSectionStateOptions) {
  const { openSections, toggleSection } = useOpenSections();
  const isOpen = openSections[section.title] || false;
  const { completedCount, totalCount } = useChecklistProgress(
    section,
    taskCompletion
  );
  const isSectionComplete = totalCount > 0 && completedCount === totalCount;
  const progressTrackerColors = isSectionComplete
    ? {
        bg: ui.colors.progressFill,
        text: ui.colors.panelBg,
      }
    : {
        bg: withOpacity(ui.colors.progressFill, 0.16),
        text: ui.colors.progressFill,
      };

  const { toggleSection: toggleSectionItems } =
    useBulkActions(handleCheckChange);

  const itemsWithIds = section.items.filter((item) => item.id);
  const allItemsComplete =
    itemsWithIds.length > 0 &&
    itemsWithIds.every((item) => taskCompletion[item.id]);
  const showBulkLabel = totalCount > 0 && completedCount > 0;
  const bulkActionLabel = allItemsComplete
    ? labels?.uncheckAll ?? "Uncheck all"
    : labels?.checkAll ?? "Check all";

  const visibleItems = isOpen
    ? section.items.filter((item) => !(hideCompleted && taskCompletion[item.id]))
    : [];

  return {
    isOpen,
    toggleSection,
    toggleSectionItems,
    completed: completedCount,
    total: totalCount,
    progressTrackerColors,
    showBulkLabel,
    bulkActionLabel,
    visibleItems,
  };
}
