const { widget } = figma;
const { AutoLayout, Text } = widget;

import { ProgressTrackerProps } from "types/index";
/**
 * Renders a pill-shaped progress tracker showing completed and total tasks.
 *
 * @remarks
 * This component visually displays checklist progress in a compact format. Uses Figma Widget API primitives for layout and text rendering.
 *
 * @param completed - Number of completed tasks.
 * @param total - Total number of tasks.
 * @returns The rendered ProgressTracker component.
 *
 * @example
 * ```ts
 * <ProgressTracker completed={5} total={10} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const ProgressTracker = ({
  completed,
  total,
  colors,
}: ProgressTrackerProps) => {
  const isAllCompleted = total > 0 && total === completed;
  /**
   * Determines the fill color for the ProgressTracker component based on whether all tasks are completed.
   * When all tasks are completed, use dark color regardless of colors.bg prop.
   *
   * @param {boolean} isAllCompleted - A flag indicating whether all tasks are completed.
   * @returns {string} The fill color for the ProgressTracker component.
   */
  const fillColor = isAllCompleted ? "#212a6a" : colors?.bg ?? "#9299ce";
  /**
   * Determines the text color for the ProgressTracker component based on whether all tasks are completed.
   *
   * @param {boolean} isAllCompleted - A flag indicating whether all tasks are completed.
   * @returns {string} The text color for the ProgressTracker component.
   */
  const textColor = colors?.text ?? "#FFFFFF";

  /**
   * Renders the ProgressTracker component, which displays the completion status of a task.
   *
   * @returns {JSX.Element} The rendered ProgressTracker component.
   */
  return (
    <AutoLayout
      fill={fillColor}
      cornerRadius={16}
      spacing={10}
      padding={{
        vertical: 2,
        horizontal: 10,
      }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text
        fill={textColor}
        verticalAlignText="center"
        horizontalAlignText="right"
        lineHeight="150%"
        fontFamily="Anaheim"
        fontSize={18}
        fontWeight={800}
      >
        {completed} / {total}
      </Text>
    </AutoLayout>
  );
};

export default ProgressTracker;
