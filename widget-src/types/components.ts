/**
 * Component prop types for the accessibility checklist widget.
 *
 * @remarks
 * This module contains all the prop interfaces for React components
 * used throughout the checklist widget. These types ensure type safety
 * for component props and maintain consistent interfaces across the UI.
 *
 * @since 1.0.0 - Extracted from monolithic types file
 */

import type { ChecklistItemType, ChecklistSectionType } from 'types/checklist'

/**
 * Props for the checklist section component.
 *
 * @remarks
 * Used to render a section of checklist items, including their completion state and tooltips.
 */
export interface ChecklistSectionProps {
  /** The checklist section to render. */
  section: ChecklistSectionType
  /** Object mapping task IDs to their completion status. */
  taskCompletion: Record<string, boolean>
  /** Function to handle checkbox state changes. */
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  /** Whether tooltips are enabled for this section. */
  tooltipsEnabled: boolean
  /** Whether completed items should be hidden. */
  hideCompleted?: boolean
}

/**
 * Props for the ChecklistItem component.
 */
export interface ChecklistItemProps {
  /** The checklist item to render. */
  item: ChecklistItemType
  /** Whether this item is currently checked. */
  checked: boolean
  /** Function to handle checkbox state changes. */
  onCheckChange: (taskId: string, isChecked: boolean) => void
  /** Whether tooltips are enabled for this item. */
  tooltipsEnabled: boolean
}

/**
 * Props for the checklist panel component.
 *
 * @remarks
 * Used to control the display and state of the accessibility checklist UI.
 */
export interface ChecklistProps {
  /** The title of the checklist. */
  title: string
  /** Array of checklist sections to display. */
  sections: ChecklistSectionType[]
  /** Object mapping task IDs to their completion status. */
  taskCompletion: Record<string, boolean>
  /** Function to handle checkbox state changes. */
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  /** Total number of tasks in the checklist. */
  total: number
  /** Number of completed tasks. */
  completed: number
  /** Whether to use dark mode styling. */
  isDarkMode?: boolean
}

/**
 * Props for the Checkbox component.
 *
 * @remarks
 * Controls the checked state of the checkbox UI element.
 */
export interface CheckboxProps {
  /** Whether the checkbox is currently checked. */
  checked: boolean
  /** Optional custom colors for theming. */
  colors?: { bgChecked: string; bgUnchecked: string; stroke: string }
}

/**
 * Props for the ProgressTracker component.
 *
 * @remarks
 * Controls the display of the progress tracker, including completed and total task counts.
 */
export interface ProgressTrackerProps {
  /** Number of completed tasks. */
  completed: number
  /** Total number of tasks. */
  total: number
  /** Optional custom colors for theming. */
  colors?: { bg: string; text: string }
}

/**
 * Props for the ProgressBar component.
 *
 * @remarks
 * Controls the display of the progress bar, including task counts and parent width.
 */
export interface ProgressBarProps {
  /** Total number of tasks. */
  total: number
  /** Number of completed tasks. */
  completed: number
  /** Width of the parent container in pixels. */
  parentWidth: number
  /** Optional custom colors for theming. */
  colors?: { track: string; fill: string }
}
