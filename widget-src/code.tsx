const { widget } = figma
const { useSyncedState } = widget

import checklistData from './data/a11yChecklistData.json'
import CompanionPanel from './components/CompanionPanel'

/**
 * Main widget function component.
 *
 * @returns {JSX.Element} This component handles the state and rendering of the widget, including the role selector, checklist, and task completion functionality.
 */
function Widget() {
  // Flatten all items for progress tracking
  const allItems = checklistData.sections.flatMap((section) => section.items)
  const itemIds = allItems.map((item) => item.id)

  // Use a single synced state for all item completions
  const [taskCompletion, setTaskCompletion] = useSyncedState<
    Record<string, boolean>
  >('taskCompletion', {})

  // Handler for checking/unchecking items
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

widget.register(Widget)
