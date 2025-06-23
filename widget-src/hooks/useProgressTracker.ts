const { widget } = figma
const { useSyncedState } = widget

/**
 * Custom hook that manages the state of task completion in a Figma widget.
 *
 * @returns An object with the following properties:
 *   - `taskCompletion`: An object mapping task IDs to boolean values indicating whether the task is completed or not.
 *   - `handleCheckChange`: A function that takes a task ID and a boolean value, and updates the task completion state accordingly.
 */
/**
 * Custom React hook for managing checklist task completion state in a Figma widget.
 *
 * @remarks
 * Uses Figma Widget API's `useSyncedState` to persist and synchronize state across widget instances. Provides helpers for updating task completion.
 *
 * @returns An object with the current task completion state and a handler function for checkbox changes.
 *
 * @example
 * ```ts
 * const { taskCompletion, handleCheckChange } = useProgressTracker();
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#usesyncedstate | Figma Widget API: useSyncedState}
 */
function useProgressTracker() {
  /**
   * The completion state for all tasks, keyed by task ID.
   *
   * @remarks
   * State is persisted and synchronized across widget instances.
   */
  const [taskCompletion, setTaskCompletion] = useSyncedState<
    Record<string, boolean>
  >('taskCompletion', {})

  /**
   * Updates completion status for a single task.
   *
   * @param taskId - The ID of the task being checked/unchecked.
   * @param isChecked - Whether the task is now checked.
   */
  const handleCheckChange = (taskId: string, isChecked: boolean) => {
    setTaskCompletion((prev) => ({
      ...prev,
      [taskId]: isChecked,
    }))
  }

  return { taskCompletion, handleCheckChange }
}

export default useProgressTracker
