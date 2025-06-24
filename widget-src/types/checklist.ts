/**
 * Core types for accessibility checklist data structures.
 *
 * @remarks
 * This module contains the fundamental types that define the structure
 * of checklist items, sections, and overall checklist data used throughout
 * the accessibility companion widget.
 *
 * @since 1.0.0 - Extracted from monolithic types file
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
  /** The unique identifier for the checklist item. */
  id: string
  /** The text description of the checklist item. */
  text: string
  /** The WCAG reference for this item. */
  wcag: string
  /** Optional long description providing more detail about the requirement. */
  longDescription?: string
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
  /** The unique identifier for the section. */
  id: string
  /** The title of the section. */
  title: string
  /** Optional description of the section. */
  description?: string
  /** Optional link to more information about this section. */
  link?: string
  /** Array of checklist items in this section. */
  items: ChecklistItemType[]
}

/**
 * Represents the overall checklist data structure.
 *
 * @remarks
 * Used to type the imported JSON data for the accessibility checklist.
 *
 * @example
 * ```ts
 * const data: ChecklistDataType = {
 *   title: 'a11y Checklist',
 *   sections: []
 * };
 * ```
 */
export interface ChecklistDataType {
  /** The title of the checklist */
  title: string
  /** Array of checklist sections */
  sections: ChecklistSectionType[]
}
