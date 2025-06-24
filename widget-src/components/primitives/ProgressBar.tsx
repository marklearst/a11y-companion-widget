const { widget } = figma
const { AutoLayout, Rectangle } = widget

import { ProgressBarProps } from 'types/index'

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
const ProgressBar = ({ total, completed, parentWidth }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : (completed / total) * 100
  let calculatedWidth = (percentage / 100) * parentWidth

  // Ensure calculatedWidth is at least 1 to avoid rendering issues
  if (calculatedWidth === 0) {
    calculatedWidth = 0.25
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
      height={20}
      fill="#9299ce"
      cornerRadius={4}
      padding={0}
      spacing={0}>
      <Rectangle
        width={calculatedWidth}
        height="fill-parent"
        fill="#212a6a"
        // cornerRadius={4}
      />
    </AutoLayout>
  )
}

export default ProgressBar
