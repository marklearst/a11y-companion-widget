const { widget } = figma;
const { AutoLayout, Text } = widget;

import { ProgressTrackerProps } from "types/index";
import { defaultTheme } from "design-system/theme/default";
import { componentPrimitives } from "design-system/components/primitives";
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
  label,
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
      cornerRadius={radius ?? componentPrimitives.progressTracker.radius}
      spacing={gap ?? componentPrimitives.progressTracker.gap}
      padding={{
        vertical:
          padding?.vertical ?? componentPrimitives.progressTracker.paddingY,
        horizontal:
          padding?.horizontal ?? componentPrimitives.progressTracker.paddingX,
      }}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text
        fill={textColor}
        verticalAlignText="center"
        horizontalAlignText="right"
        lineHeight="140%"
        fontFamily={
          fontFamily ?? componentPrimitives.progressTracker.fontFamily
        }
        fontSize={fontSize ?? componentPrimitives.progressTracker.fontSize}
        fontWeight={
          fontWeight ?? componentPrimitives.progressTracker.fontWeight
        }
      >
        {label ?? `${completed} / ${total}`}
      </Text>
    </AutoLayout>
  );
};

export default ProgressTracker;
