const { widget } = figma;
const { AutoLayout, Rectangle } = widget;

import { ProgressBarProps } from "types/index";
import { defaultTheme } from "design-system/theme/default";
import { componentPrimitives } from "design-system/components/primitives";

/**
 * Renders a horizontal progress bar showing completion status for tasks.
 *
 * @remarks
 * This component visually represents checklist progress. Uses Figma Widget API primitives for layout and rectangle rendering.
 *
 * @param total - The total number of tasks.
 * @param completed - The number of completed tasks.
 * @param parentWidth - The width of the parent container.
 * @returns The rendered ProgressBar component.
 *
 * @example
 * ```ts
 * <ProgressBar total={10} completed={7} parentWidth={400} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const ProgressBar = ({
  total,
  completed,
  parentWidth,
  colors,
  height,
  radius,
}: ProgressBarProps) => {
  const resolvedParentWidth = Math.max(0, parentWidth);
  const percentage = total <= 0 ? 0 : completed / total;
  const rawFillWidth = percentage * resolvedParentWidth;
  const hasProgress = completed > 0 && total > 0;
  const minVisibleFillWidth = componentPrimitives.progressBar.minVisibleFillWidth;
  const fillWidth = hasProgress
    ? Math.min(
        resolvedParentWidth,
        Math.max(minVisibleFillWidth, rawFillWidth)
      )
    : 0;

  /**
   * Renders the progress bar component.
   * @returns The progress bar component.
   */
  return (
    <AutoLayout
      direction="horizontal"
      overflow="hidden"
      width={resolvedParentWidth}
      height={height ?? componentPrimitives.progressBar.height}
      fill={colors?.track ?? defaultTheme.lightTheme.progressBg}
      cornerRadius={radius ?? componentPrimitives.progressBar.radius}
      padding={0}
      spacing={0}
    >
      {fillWidth > 0 && (
        <Rectangle
          width={fillWidth}
          height="fill-parent"
          fill={colors?.fill ?? defaultTheme.lightTheme.progressFill}
        />
      )}
    </AutoLayout>
  );
};

export default ProgressBar;
