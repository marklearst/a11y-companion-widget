/**
 * Represents a drop shadow effect that can be applied to a UI element.
 *
 * @remarks
 * Used to describe visual effects for Figma widget UI elements. Matches the Figma Widget API's drop-shadow effect type.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#effect | Figma Widget API Reference: Effect}
 *
 * @example
 * ```ts
 * const effect: DropShadowEffect = {
 *   type: 'drop-shadow',
 *   color: '#212A6A25',
 *   offset: { x: 0, y: 0 },
 *   blur: 15,
 *   showShadowBehindNode: true
 * };
 * ```
 */
export interface DropShadowEffect {
  type: 'drop-shadow'
  color: string
  offset: { x: number; y: number }
  blur: number
  showShadowBehindNode: boolean
}

/**
 * Represents a progress task in a review checklist.
 *
 * @remarks
 * Used to model an individual task for accessibility or review checklists.
 *
 * @example
 * ```ts
 * const task: ProgressTaskType = { id: '1', text: 'Do something', checked: true };
 * ```
 */
export interface ProgressTaskType {
  /** The unique identifier for the task. */
  id: string
  /** The text description of the task. */
  text: string
  /** Indicates whether the task has been completed. */
  checked?: boolean
}

/**
 * Represents a persona that has associated review sections.
 *
 * @remarks
 * Used to model user roles or personas with associated review sections in the checklist.
 *
 * @example
 * ```ts
 * const persona: PersonaType = { id: 1, title: 'Designer', subTitle: 'UI/UX', categories: [] };
 * ```
 */
export interface PersonaType {
  /** The unique identifier for the persona. */
  id: number
  /** The title of the persona. */
  title: string
  /** The subtitle of the persona. */
  subTitle: string
  /** The review sections associated with the persona. */
  categories: ChecklistSectionType[]
}

/**
 * Represents review data containing a list of personas, each with associated review sections and review items.
 *
 * @remarks
 * Used as the root type for accessibility or review checklist data structures. Organizes personas, each with their own sections and items.
 *
 * @example
 * ```ts
 * const reviewData: ReviewDataType = {
 *   title: 'Accessibility Review',
 *   subTitle: 'WCAG Checklist',
 *   roles: []
 * };
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
export interface ReviewDataType {
  /** The title of the review data. */
  title: string
  /** The subtitle of the review data. */
  subTitle: string
  /** The personas associated with the review data. */
  roles: PersonaType[]
}

/**
 * Represents a single checklist item in a section.
 * @property {string} id - The unique identifier for the checklist item.
 * @property {string} text - The text description of the checklist item.
 * @property {string} wcag - The WCAG reference for the checklist item.
 */
/**
 * Represents a single item in the accessibility checklist.
 *
 * Each item includes a unique identifier, display text, a WCAG reference, and an optional long description.
 *
 * @remarks
 * This type is used to model accessibility tasks or requirements in the widget. Each item can be mapped to a corresponding UI element and tracked for completion status.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 *
 * @example
 * ```ts
 * const item: ChecklistItemType = {
 *   id: 'color-contrast',
 *   text: 'Ensure sufficient color contrast',
 *   wcag: '1.4.3',
 *   longDescription: 'Text and interactive elements must have a contrast ratio of at least 4.5:1.'
 * };
 * ```
 */
export interface ChecklistItemType {
  /**
   * The unique identifier for the checklist item.
   * @readonly
   */
  id: string
  /**
   * The display text describing the checklist item.
   */
  text: string
  /**
   * The WCAG reference code for the checklist item.
   * @remarks
   * See the WCAG documentation for more details on each criterion.
   */
  wcag: string
  /**
   * An optional, detailed description of the checklist item.
   * @remarks
   * Provides additional guidance or context for the requirement.
   */
  longDescription?: string
}

/**
 * Defines the props for the `ChecklistSection` component.
 *
 * @interface ChecklistSectionProps
 * @property {object} section - The section data.
 * @property {string} section.title - The title of the section.
 * @property {string} section.link - The link associated with the section.
 * @property {any[]} section.items - The items in the section.
 * @property {Record<string, boolean>} taskCompletion - The completion status of tasks.
 * @property {(taskId: string, isChecked: boolean) => void} handleCheckChange - A function to handle task completion changes.
 * @property {boolean} tooltipsEnabled - Whether tooltips are enabled for the section.
 */
/**
 * Props for the review section component.
 *
 * @remarks
 * Used to render a section of checklist items, including their completion state and tooltips.
 */
export interface ChecklistSectionProps {
  /** The section data, including title, description, and items. */
  section: {
    title: string
    description?: string
    items: ChecklistItemType[]
  }
  /** Completion status of tasks in this section. */
  taskCompletion: Record<string, boolean>
  /** Handler for task completion changes. */
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  /** Whether tooltips are enabled for the section. */
  tooltipsEnabled: boolean
}

/**
 * Defines the props for the ChecklistItem component.
 *
 * @interface ChecklistItemProps
 * @property {ChecklistItemType} item - The checklist item object containing the data to be displayed.
 * @property {boolean} checked - The completion status of the item.
 * @property {(taskId: string, isChecked: boolean) => void} onCheckChange - A function to handle changes to the completion status of the item.
 * @property {boolean} tooltipsEnabled - Whether tooltips are enabled for the item.
 */
/**
 * Props for the review item component.
 *
 * @remarks
 * Used to render and manage a single checklist item's state and UI, including tooltip logic.
 */
export interface ChecklistItemProps {
  /** The checklist item data. */
  item: ChecklistItemType
  /** Whether the item is checked. */
  checked: boolean
  /** Handler for changes to the completion status. */
  onCheckChange: (taskId: string, isChecked: boolean) => void
  /** Whether tooltips are enabled for the item. */
  tooltipsEnabled: boolean
}

/**
 * Represents a section in the accessibility checklist, including its title, link, and items.
 *
 * @remarks
 * Used to group related checklist items for display in the widget UI.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
export interface ChecklistSectionType {
  /** The section title. */
  title: string
  /** An optional link for the section. */
  link: string
  /** The checklist items belonging to this section. */
  items: ChecklistItemType[]
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
  /** The sections to display in the checklist. */
  sections: ChecklistSectionType[]
  /** The completion status of each task, keyed by item id. */
  taskCompletion: Record<string, boolean>
  /** Handler for changes to task completion. */
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  /** The total number of tasks. */
  total: number
  /** The number of completed tasks. */
  completed: number
  /** Whether the component is in dark mode. */
  isDarkMode?: boolean | undefined
}

/**
 * Represents a user avatar for display in a stack.
 *
 * @remarks
 * Used in the AvatarStack component to visually represent users or reviewers.
 */
interface Avatar {
  /** Unique identifier for the avatar. */
  id: string
  /** Display name for the avatar. */
  name: string
  /** Optional photo URL for the avatar image. */
  photoUrl: string | null
}

/**
 * Props for the AvatarStack component.
 *
 * @remarks
 * Controls the avatars, size, and maximum shown avatars in the stack.
 */
export interface AvatarStackProps {
  /** Array of avatars to display. */
  avatars: Avatar[]
  /** Size of each avatar in pixels. @defaultValue 34 */
  size?: number
  /** Maximum number of avatars to display. @defaultValue 5 */
  maxAvatars?: number
}

/**
 * Defines the props for the Checkbox component.
 * @property {boolean} checked - Indicates whether the checkbox is checked or not.
 */
/**
 * Props for the Checkbox component.
 *
 * @remarks
 * Controls the checked state of the checkbox UI element.
 */
export interface CheckboxProps {
  /** Whether the checkbox is checked. */
  checked: boolean
}

/**
 * Defines the props for the ProgressTracker component.
 * @property {number} completed - The number of completed tasks.
 * @property {number} total - The total number of tasks.
 */
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
}

/**
 * Defines the properties for the ProgressBar component.
 * @property {number} total - The total number of tasks.
 * @property {number} completed - The number of completed tasks.
 * @property {number} parentWidth - The width of the parent container.
 */
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
}
