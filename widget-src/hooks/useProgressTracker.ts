const { widget } = figma
const { useSyncedState } = widget

/**
 * Custom hook that manages the state of task completion in a Figma widget.
 *
 * @returns An object with the following properties:
 *   - `taskCompletion`: An object mapping task IDs to boolean values indicating whether the task is completed or not.
 *   - `handleCheckChange`: A function that takes a task ID and a boolean value, and updates the task completion state accordingly.
 */
function useProgressTracker() {
  /**
   * Initializes the task completion state, which is a record mapping task IDs to boolean values indicating whether the task is completed or not.
   * The initial state is an empty object, which will be persisted and synchronized across Figma widget instances.
   */
  const [taskCompletion, setTaskCompletion] = useSyncedState<
    Record<string, boolean>
  >('taskCompletion', {})

  /**
   * Handles the change event for a task checkbox, updating the task completion state.
   * @param taskId - The ID of the task being checked/unchecked.
   * @param isChecked - A boolean indicating whether the task is now checked or unchecked.
   */
  const handleCheckChange = (taskId: string, isChecked: boolean) => {
    setTaskCompletion((prev) => ({
      ...prev,
      [taskId]: isChecked,
    }))
  }

  /**
   * Returns an object containing the task completion state and a function to handle checkbox state changes.
   * @returns An object with the following properties:
   *   - `taskCompletion`: An object mapping task IDs to boolean values indicating whether the task is completed or not.
   *   - `handleCheckChange`: A function that takes a task ID and a boolean value, and updates the task completion state accordingly.
   */
  return { taskCompletion, handleCheckChange }
}

export default useProgressTracker
