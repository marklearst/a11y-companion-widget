/**
 * Barrel file for checklist components.
 *
 * @remarks
 * Re-exports the main checklist UI components for convenient import elsewhere in the widget codebase.
 * - `ChecklistPanel`: The main container for the checklist UI
 * - `ChecklistSection`: Displays a section/category of checklist items
 * - `ChecklistItem`: Renders an individual checklist task row
 *
 * @since 1.0.0
 */
export { default as ChecklistPanel } from 'components/checklist/ChecklistPanel'
export { default as ChecklistSection } from 'components/checklist/ChecklistSection'
export { default as ChecklistItem } from 'components/checklist/ChecklistItem'
