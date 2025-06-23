const { widget } = figma
const { AutoLayout, Text } = widget

import Checkbox from '../shared/Checkbox'
import { ProgressTaskType } from '../types'

/**
 * Defines the props for the `Task` component.
 *
 * @property {ProgressTaskType} task - The task object containing the task details.
 * @property {boolean} checked - Whether the task is currently checked or not.
 * @property {(taskId: string, isChecked: boolean) => void} onCheckChange - Callback function to handle the checkbox change event.
 */
/**
 * Props for the progress task component.
 *
 * @remarks
 * Used to render and manage a single checklist task's state and UI.
 */
interface TaskProps {
  /** The task data object. */
  task: ProgressTaskType
  /** Whether the task is currently checked. */
  checked: boolean
  /** Handler for checkbox state changes. */
  onCheckChange: (taskId: string, isChecked: boolean) => void
}

/**
 * Renders a single checklist task with a checkbox and label.
 *
 * @remarks
 * This component displays a task and allows toggling its completion state. Uses Figma Widget API primitives for layout and interactivity.
 *
 * @param task - The task object containing the task details.
 * @param checked - Whether the task is currently checked or not.
 * @param onCheckChange - Callback function to handle the checkbox change event.
 * @returns The rendered Task component.
 *
 * @example
 * ```ts
 * <ProgressTask task={task} checked={checked} onCheckChange={handleCheckChange} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ProgressTask({ task, checked, onCheckChange }: TaskProps) {
  const { id, text } = task

  /**
   * Handles the checkbox change event for a task.
   *
   * @param {string} id - The ID of the task.
   * @param {boolean} isChecked - The new checked state of the task.
   * @returns {void}
   */
  const handleChange = () => {
    onCheckChange(id, !checked)
  }

  /**
   * Renders the main content of the Task component, including the checkbox and task text.
   *
   * @returns The rendered Task component.
   */
  return (
    <AutoLayout
      name="Task"
      direction="horizontal"
      verticalAlignItems="start"
      spacing={14}
      padding={{ vertical: 10 }}
      width={520}
      onClick={handleChange}>
      <Checkbox checked={checked} />
      <Text
        name="TaskText"
        width="fill-parent"
        fill="#000"
        lineHeight="150%"
        fontFamily="Anaheim"
        fontSize={16}
        fontWeight={400}>
        {text}
      </Text>
    </AutoLayout>
  )
}

export default ProgressTask
