const { widget } = figma;
const { AutoLayout, Text } = widget;

import { ProgressTrackerProps } from "types/index";
import {
  defaultTheme,
  padding as dsPadding,
  radius as dsRadius,
  gap as dsGap,
  fontFamily as dsFontFamily,
  fontSize as dsFontSize,
} from "design-system";
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
  padding,
  radius,
  fontSize,
  fontWeight,
  fontFamily,
  gap,
}: ProgressTrackerProps) => {
  /**
   * Determines the fill color for the ProgressTracker component.
   */
  const fillColor = colors?.bg ?? defaultTheme.lightTheme.progressFill;
  /**
   * Determines the text color for the ProgressTracker component based on whether all tasks are completed.
   *
   * @param {boolean} isAllCompleted - A flag indicating whether all tasks are completed.
   * @returns {string} The text color for the ProgressTracker component.
   */
  const textColor = colors?.text ?? defaultTheme.lightTheme.panelBg;

  /**
   * Renders the ProgressTracker component, which displays the completion status of a task.
   *
   * @returns {JSX.Element} The rendered ProgressTracker component.
   */
  return (
    <AutoLayout
      fill={fillColor}
      cornerRadius={radius ?? dsRadius.full}
      spacing={gap ?? dsGap.compact}
      padding={{
        vertical: padding?.vertical ?? dsPadding.progressTracker.vertical,
        horizontal: padding?.horizontal ?? dsPadding.progressTracker.horizontal,
      }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text
        fill={textColor}
        verticalAlignText="center"
        horizontalAlignText="right"
        lineHeight="140%"
        fontFamily={fontFamily ?? dsFontFamily.sans}
        fontSize={fontSize ?? dsFontSize.sm}
        fontWeight={fontWeight ?? 600}
      >
        {completed} / {total}
      </Text>
    </AutoLayout>
  );
};

export default ProgressTracker;
