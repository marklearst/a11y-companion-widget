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
 * Represents a review item within a review section.
 *
 * @remarks
 * Used to group tasks under a review item for accessibility or review checklists.
 *
 * @example
 * ```ts
 * const reviewItem: ReviewItemType = { id: 'item1', title: 'Item 1', tasks: [] };
 * ```
 */
export interface ReviewItemType {
  /** The unique identifier for the review item. */
  id: string
  /** The title of the review item. */
  title: string
  /** The tasks associated with the review item. */
  tasks: ProgressTaskType[]
}

/**
 * Represents a review section that contains review items and tasks.
 *
 * @remarks
 * Used to organize review items into logical sections for checklists.
 *
 * @example
 * ```ts
 * const section: ReviewSectionType = { index: 0, id: 'section1', title: 'Section 1', subCategories: [] };
 * ```
 */
export interface ReviewSectionType {
  /** The index of the review section. */
  index: number
  /** The unique identifier for the review section. */
  id: string
  /** The title of the review section. */
  title: string
  /** The review items associated with the review section. */
  subCategories: ReviewItemType[]
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
  categories: ReviewSectionType[]
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
