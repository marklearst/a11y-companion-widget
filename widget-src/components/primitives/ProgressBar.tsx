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
  // Heuristic: derive dark mode based on background—widgets don't provide direct theme here.
  // For now, keep original colors; ChecklistPanel wraps it with context colors if needed later.
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  let calculatedWidth = (percentage / 100) * parentWidth;

  // Ensure calculatedWidth is at least 1 to avoid rendering issues
  if (calculatedWidth === 0) {
    calculatedWidth = 0.25;
  }

  /**
   * Renders the progress bar component.
   * @returns The progress bar component.
   */
  return (
    <AutoLayout
      direction="horizontal"
      overflow="hidden"
      width={parentWidth}
      height={height ?? componentPrimitives.progressBar.height}
      fill={colors?.track ?? defaultTheme.lightTheme.progressBg}
      cornerRadius={radius ?? componentPrimitives.progressBar.radius}
      padding={0}
      spacing={0}
    >
      <Rectangle
        width={calculatedWidth}
        height="fill-parent"
        fill={colors?.fill ?? defaultTheme.lightTheme.progressFill}
      />
    </AutoLayout>
  );
};

export default ProgressBar;
