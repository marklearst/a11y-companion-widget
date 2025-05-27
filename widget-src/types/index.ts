/**
 * Represents a drop shadow effect that can be applied to a UI element.
 * @property {string} type - The type of the effect, which is always 'drop-shadow'.
 * @property {string} color - The color of the drop shadow.
 * @property {object} offset - The offset of the drop shadow, with `x` and `y` properties representing the horizontal and vertical offsets respectively.
 * @property {number} blur - The blur radius of the drop shadow.
 * @property {boolean} showShadowBehindNode - Whether the shadow should be shown behind the UI element or not.
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
 * @property {string} id - The unique identifier for the task.
 * @property {string} text - The text description of the task.
 * @property {boolean} [checked] - Indicates whether the task has been completed or not.
 */
export interface ProgressTaskType {
  id: string
  text: string
  checked?: boolean
}

/**
 * Represents a review item within a review section.
 * @property {string} id - The unique identifier for the review item.
 * @property {string} title - The title of the review item.
 * @property {ProgressTaskType[]} tasks - The tasks associated with the review item.
 */
export interface ReviewItemType {
  id: string
  title: string
  tasks: ProgressTaskType[]
}

/**
 * Represents a review section that contains review items and tasks.
 * @property {number} index - The index of the review section.
 * @property {string} id - The unique identifier for the review section.
 * @property {string} title - The title of the review section.
 * @property {ReviewItemType[]} subCategories - The review items associated with the review section.
 */
export interface ReviewSectionType {
  index: number
  id: string
  title: string
  subCategories: ReviewItemType[]
}

/**
 * Represents a persona that has associated review sections.
 * @property {number} id - The unique identifier for the persona.
 * @property {string} title - The title of the persona.
 * @property {string} subTitle - The subtitle of the persona.
 * @property {ReviewSectionType[]} categories - The review sections associated with the persona.
 */
export interface PersonaType {
  id: number
  title: string
  subTitle: string
  categories: ReviewSectionType[]
}

/**
 * Represents review data that contains a list of personas, each with associated review sections and review items.
 * @property {string} title - The title of the review data.
 * @property {string} subTitle - The subtitle of the review data.
 * @property {PersonaType[]} roles - The personas associated with the review data.
 */
export interface ReviewDataType {
  title: string
  subTitle: string
  roles: PersonaType[]
}

/**
 * Represents a single checklist item in a section.
 * @property {string} id - The unique identifier for the checklist item.
 * @property {string} text - The text description of the checklist item.
 * @property {string} wcag - The WCAG reference for the checklist item.
 */
export interface ChecklistItemType {
  id: string
  text: string
  wcag: string
  longDescription?: string
}
