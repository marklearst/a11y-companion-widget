const { widget } = figma;
const { AutoLayout, Text } = widget;

import { ChecklistSectionProps } from "types/index";
import { ProgressTracker, RichText } from "components/primitives";
import { ChecklistItem } from "components/checklist";
import { useChecklistSectionState } from "hooks/useChecklistSectionState";
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
 * @returns The rendered ChecklistSection component.
 *
 * @example
 * ```ts
 * <ChecklistSection
 *   section={section}
 *   taskCompletion={taskCompletion}
 *   handleCheckChange={handleCheckChange}
 * />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistSection({
  section,
  taskCompletion,
  handleCheckChange,
  hideCompleted,
  isHighlighted: _isHighlighted,
  colors,
  ui,
  labels,
  showItemDescriptions,
  onBulkAction,
}: ChecklistSectionProps) {
  if (!section || !Array.isArray(section.items)) {
    return null;
  }

  const uiTokens = ui;
  const palette = colors ?? {
    textPrimary: uiTokens.colors.textPrimary,
    textSecondary: uiTokens.colors.textSecondary,
    sectionTitle: uiTokens.colors.textPrimary,
    sectionIcon: uiTokens.colors.textSecondary,
    sectionDescBg: uiTokens.colors.sectionDescBg,
    sectionDescText: uiTokens.colors.textStrong,
    progressTracker: {
      bg: uiTokens.colors.progressFill,
      text: uiTokens.colors.panelBg,
    },
    checkbox: {
      bgChecked: uiTokens.colors.checkboxBgChecked,
      bgUnchecked: uiTokens.colors.checkboxBgUnchecked,
      stroke: uiTokens.colors.checkboxStroke,
    },
  };
  const primaryText = palette.textPrimary ?? uiTokens.colors.textPrimary;
  const secondaryText = palette.textSecondary ?? uiTokens.colors.textSecondary;

  const {
    isOpen,
    toggleSection,
    toggleSectionItems,
    completed,
    total,
    progressTrackerColors,
    showBulkLabel,
    bulkActionLabel,
    visibleItems,
  } = useChecklistSectionState({
    section,
    taskCompletion,
    handleCheckChange,
    hideCompleted,
    labels,
    ui: uiTokens,
  });

  // Handle checklist item check/uncheck
  const handleCheckChangeSimple = (taskId: string, isChecked: boolean) => {
    handleCheckChange(taskId, isChecked);
  };

  /**
   * Renders the ChecklistSection component, which displays a list of items.
   *
   * @returns {JSX.Element} The rendered ChecklistSection component.
   */
  return (
    <AutoLayout
      name="Section"
      direction="vertical"
      spacing={uiTokens.section.spacing}
      width="fill-parent"
    >
      <AutoLayout
        padding={{
          top: uiTokens.section.headerPaddingY,
          bottom: uiTokens.section.headerPaddingY,
        }}
        spacing={uiTokens.section.headerGap}
        verticalAlignItems="center"
        width="fill-parent"
        height={uiTokens.section.headerHeight}
        horizontalAlignItems="center"
        {...(uiTokens.section.headerFullClick
          ? { onClick: () => toggleSection(section.id) }
          : {})}
        {...(uiTokens.section.headerHoverBg
          ? { hoverStyle: { fill: uiTokens.section.headerHoverBg } }
          : {})}
      >
        <AutoLayout
          onClick={
            uiTokens.section.headerFullClick
              ? undefined
              : () => toggleSection(section.id)
          }
          spacing={uiTokens.section.headerGap}
          verticalAlignItems="center"
          horizontalAlignItems="center"
          cornerRadius={uiTokens.section.headerRadius}
          {...(uiTokens.section.headerFullClick
            ? {}
            : { hoverStyle: { opacity: 0.7 } })}
        >
          <AutoLayout padding={{ top: uiTokens.section.caretOffsetY ?? 0 }}>
            <CaretIcon
              open={isOpen}
              color={palette.sectionIcon ?? secondaryText}
              size={uiTokens.section.caretSize}
              strokeWidth={uiTokens.section.caretStrokeWidth}
            />
          </AutoLayout>
          <Text
            name="SectionTitle"
            fill={palette.sectionTitle ?? primaryText}
            fontFamily={uiTokens.section.title.fontFamily}
            fontSize={uiTokens.section.title.fontSize}
            fontWeight={uiTokens.section.title.fontWeight}
            lineHeight={uiTokens.section.title.lineHeight}
          >
            {section.title}
          </Text>
        </AutoLayout>
        <AutoLayout width="fill-parent" height="fill-parent" />
        <AutoLayout
          direction="horizontal"
          spacing={uiTokens.section.headerGap}
          verticalAlignItems="center"
        >
          {isOpen && section.items.length > 0 && showBulkLabel ? (
            <AutoLayout
              onClick={() => {
                onBulkAction?.();
                toggleSectionItems(section, taskCompletion);
              }}
              direction="horizontal"
              spacing={uiTokens.section.bulkAction.gap}
              verticalAlignItems="center"
              padding={{
                vertical: uiTokens.section.bulkAction.padding,
                horizontal: uiTokens.section.bulkAction.padding,
              }}
              cornerRadius={uiTokens.section.bulkAction.radius}
              hoverStyle={{
                fill: uiTokens.colors.hoverBg,
              }}
            >
              <Text
                fill={secondaryText ?? primaryText}
                fontFamily={uiTokens.section.bulkAction.fontFamily}
                fontSize={uiTokens.section.bulkAction.fontSize}
                fontWeight={uiTokens.section.bulkAction.fontWeight}
                lineHeight="140%"
              >
                {bulkActionLabel}
              </Text>
            </AutoLayout>
          ) : null}
          <ProgressTracker
            completed={completed}
            total={total}
            colors={progressTrackerColors}
            padding={{
              vertical: uiTokens.progressTracker.paddingY,
              horizontal: uiTokens.progressTracker.paddingX,
            }}
            radius={uiTokens.progressTracker.radius}
            fontSize={uiTokens.progressTracker.fontSize}
            fontWeight={uiTokens.progressTracker.fontWeight}
            fontFamily={uiTokens.progressTracker.fontFamily}
            gap={uiTokens.progressTracker.gap}
          />
        </AutoLayout>
      </AutoLayout>
      {isOpen && section.description ? (
        <AutoLayout
          fill={palette.sectionDescBg}
          padding={{
            vertical: uiTokens.section.description.paddingY,
            horizontal: uiTokens.section.description.paddingX,
          }}
          cornerRadius={uiTokens.section.description.radius}
          width="fill-parent"
          verticalAlignItems="center"
        >
          <RichText
            text={section.description}
            inlineStyles={uiTokens.inline}
            width="fill-parent"
            fill={palette.sectionDescText}
            lineHeight={uiTokens.section.description.lineHeight}
            fontFamily={uiTokens.section.description.fontFamily}
            fontSize={uiTokens.section.description.fontSize}
            fontWeight={uiTokens.section.description.fontWeight}
          />
        </AutoLayout>
      ) : null}
      {visibleItems.map((item, index) => (
        <ChecklistItem
          key={item.id ?? `${section.id}-${index}`}
          item={item}
          checked={taskCompletion[item.id] || false}
          onCheckChange={handleCheckChangeSimple}
          textColor={primaryText}
          checkboxColors={palette.checkbox}
          ui={uiTokens}
          showDescription={showItemDescriptions}
        />
      ))}
    </AutoLayout>
  );
}

export default ChecklistSection;
