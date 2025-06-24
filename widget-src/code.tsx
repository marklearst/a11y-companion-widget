/**
 * Entry point for the Figma accessibility companion widget.
 *
 * @remarks
 * This file initializes the widget and registers the main component with the Figma Widget API. It manages state for task completion and renders the accessibility checklist interface.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const { widget } = figma
const { useSyncedState } = widget

import checklistData from 'data/a11yChecklistData.json'
import CompanionPanel from 'components/CompanionPanel'

/**
 * Main widget function component.
 *
 * @remarks
 * Handles state and rendering for the accessibility checklist, including role selector, checklist, and task completion.
 *
 * @returns The widget's main UI as a React JSX element.
 *
 * @example
 * ```ts
 * // This function is registered as the widget entry point
 * widget.register(Widget)
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#widgetregister | Figma Widget API: widget.register}
 */
function Widget() {
  // Flatten all items for progress tracking
  const allItems = checklistData.sections.flatMap((section) => section.items)
  const itemIds = allItems.map((item) => item.id)

  // Use a single synced state for all item completions
  const [taskCompletion, setTaskCompletion] = useSyncedState<
    Record<string, boolean>
  >('taskCompletion', {})

  /**
   * Handles checking and unchecking of checklist items.
   *
   * @param taskId - The ID of the checklist item.
   * @param isChecked - Whether the item is checked.
   * @remarks
   * Updates the synced state for task completion.
   */
  const handleCheckChange = (taskId: string, isChecked: boolean) => {
    setTaskCompletion({
      ...taskCompletion,
      [taskId]: isChecked,
    })
  }

  // Calculate progress
  const total = itemIds.length
  const completed = itemIds.filter((id) => taskCompletion[id]).length

  return (
    <CompanionPanel
      title={checklistData.title}
      sections={checklistData.sections}
      taskCompletion={taskCompletion}
      handleCheckChange={handleCheckChange}
      total={total}
      completed={completed}
    />
  )
}

/**
 * Registers the main widget component with the Figma Widget API.
 *
 * @remarks
 * This is required for the widget to appear in the Figma editor.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#widgetregister | Figma Widget API: widget.register}
 */
widget.register(Widget)
