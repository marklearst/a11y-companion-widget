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
interface TaskProps {
  task: ProgressTaskType
  checked: boolean
  onCheckChange: (taskId: string, isChecked: boolean) => void
}

/**
 * Renders a single task with a checkbox.
 *
 * @param task - The task object containing the task details.
 * @param checked - Whether the task is currently checked or not.
 * @param onCheckChange - Callback function to handle the checkbox change event.
 * @returns The rendered Task component.
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
