const { widget } = figma;
const { AutoLayout, Text } = widget;

import { ChecklistSectionProps } from "types/index";
import { ProgressTracker, Checkbox } from "components/primitives";
import { ChecklistItem } from "components/checklist";
import { useChecklistProgress } from "hooks/useChecklistProgress";
import { useOpenSections } from "hooks/useOpenSections";
import { useBulkActions } from "hooks/useBulkActions";
import CaretIcon from "components/checklist/CaretIcon";

/**
 * Renders a section of the accessibility checklist, displaying its items and completion state.
 *
 * @remarks
 * This component displays a group of checklist items, tracks their completion, and manages section-level UI state. Uses Figma Widget API primitives for layout and interactivity.
 *
 * @param section - The section data, including title, description, and items.
 * @param taskCompletion - Completion status of tasks in this section.
 * @param handleCheckChange - Handler for task completion changes.
 * @param tooltipsEnabled - Whether tooltips are enabled for the section.
 * @returns The rendered ChecklistSection component.
 *
 * @example
 * ```ts
 * <ChecklistSection
 *   section={section}
 *   taskCompletion={taskCompletion}
 *   handleCheckChange={handleCheckChange}
 *   tooltipsEnabled={true}
 * />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistSection({
  section,
  taskCompletion,
  handleCheckChange,
  tooltipsEnabled,
  hideCompleted,
  isHighlighted: _isHighlighted,
  colors,
}: ChecklistSectionProps) {
  if (!section || !Array.isArray(section.items)) {
    return null;
  }

  // Use section title as key for open/closed state
  // Use custom hook for open/close state
  const { openSections, toggleSection } = useOpenSections();
  const isOpen = openSections[section.title] || false;

  // Use custom hook for per-section progress
  const { completedCount: completed, totalCount: total } = useChecklistProgress(
    section,
    taskCompletion
  );

  // Bulk actions
  const { toggleSection: toggleSectionItems } = useBulkActions(handleCheckChange);

  // Handle checklist item check/uncheck
  const handleCheckChangeSimple = (taskId: string, isChecked: boolean) => {
    handleCheckChange(taskId, isChecked);
  };

  // Check if all items in section are complete
  const itemsWithIds = section.items.filter((item) => item.id);
  const allItemsComplete =
    itemsWithIds.length > 0 &&
    itemsWithIds.every((item) => taskCompletion[item.id]);

  // Caret SVG (right when closed, down when open)

  /**
   * Renders the ChecklistSection component, which displays a list of items.
   *
   * @returns {JSX.Element} The rendered ChecklistSection component.
   */
  return (
    <AutoLayout
      name="Section"
      direction="vertical"
      spacing={8}
      width="fill-parent"
    >
      <AutoLayout
        padding={{ top: 10, bottom: 10 }}
        spacing={12}
        verticalAlignItems="center"
        width="fill-parent"
        height={34}
        horizontalAlignItems="center"
      >
        <AutoLayout
          onClick={() => toggleSection(section.title)}
          spacing={12}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <CaretIcon open={isOpen} />
          <Text
            name="SectionTitle"
            fill={colors?.textPrimary ?? "#212A6A"}
            fontFamily="Anaheim"
            fontSize={20}
            fontWeight={700}
            lineHeight="150%"
          >
            {section.title}
          </Text>
        </AutoLayout>
        <AutoLayout width="fill-parent" />
        <AutoLayout
          direction="horizontal"
          spacing={8}
          verticalAlignItems="center"
        >
          {isOpen && section.items.length > 0 && (
            <AutoLayout
              onClick={() => toggleSectionItems(section, taskCompletion)}
              padding={4}
              cornerRadius={4}
              tooltip={
                allItemsComplete ? "Mark all incomplete" : "Mark all complete"
              }
            >
              <Checkbox checked={allItemsComplete} colors={colors?.checkbox} />
            </AutoLayout>
          )}
          <ProgressTracker
            completed={completed}
            total={total}
            colors={colors?.progressTracker}
          />
        </AutoLayout>
      </AutoLayout>
      {isOpen && section.description && (
        <AutoLayout
          fill={colors?.sectionDescBg ?? "#F3F4FC"}
          padding={{ vertical: 14, horizontal: 20 }}
          cornerRadius={16}
          width="fill-parent"
          verticalAlignItems="center"
        >
          <Text
            name="SectionDescription"
            fill={colors?.sectionDescText ?? "#212A6A"}
            opacity={0.7}
            fontFamily="Anaheim"
            fontSize={14}
            fontWeight={600}
            lineHeight="150%"
            width="fill-parent"
          >
            {section.description}
          </Text>
        </AutoLayout>
      )}
      {isOpen &&
        section.items
          .filter((item) => !(hideCompleted && taskCompletion[item.id]))
          .map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checked={taskCompletion[item.id] || false}
              onCheckChange={handleCheckChangeSimple}
              tooltipsEnabled={tooltipsEnabled}
              textColor={colors?.textPrimary}
              checkboxColors={colors?.checkbox}
              badgeColor={colors?.badge}
            />
          ))}
    </AutoLayout>
  );
}

export default ChecklistSection;
