const { widget } = figma
const { AutoLayout, Text } = widget

/**
 * Defines the props for the ProgressTracker component.
 * @property {number} completed - The number of completed tasks.
 * @property {number} total - The total number of tasks.
 */
interface ProgressTrackerProps {
  completed: number
  total: number
}

/**
 * Renders a ProgressTracker component to display the completion status of a task.
 *
 * @param {ProgressTrackerProps} props - The props for the ProgressTracker component.
 * @param {number} props.completed - The number of completed tasks.
 * @param {number} props.total - The total number of tasks.
 * @returns {JSX.Element} The rendered ProgressTracker component.
 */
const ProgressTracker = ({ completed, total }: ProgressTrackerProps) => {
  const isAllCompleted = total > 0 && total === completed
  /**
   * Determines the fill color for the ProgressTracker component based on whether all tasks are completed.
   *
   * @param {boolean} isAllCompleted - A flag indicating whether all tasks are completed.
   * @returns {string} The fill color for the ProgressTracker component.
   */
  const fillColor = isAllCompleted ? '#212a6a' : '#9299ce'
  /**
   * Determines the text color for the ProgressTracker component based on whether all tasks are completed.
   *
   * @param {boolean} isAllCompleted - A flag indicating whether all tasks are completed.
   * @returns {string} The text color for the ProgressTracker component.
   */
  const textColor = isAllCompleted ? '#FFFFFF' : '#FFFFFF'

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
      verticalAlignItems="center">
      <Text
        fill={textColor}
        verticalAlignText="center"
        horizontalAlignText="right"
        lineHeight="150%"
        fontFamily="Anaheim"
        fontSize={18}
        fontWeight={800}>
        {completed} / {total}
      </Text>
    </AutoLayout>
  )
}

export default ProgressTracker
