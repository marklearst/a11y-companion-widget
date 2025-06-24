/**
 * Type definitions for the accessibility companion widget.
 *
 * @remarks
 * This module re-exports all type definitions from organized sub-modules
 * to maintain backward compatibility while improving code organization.
 *
 * The types are organized into domain-specific modules:
 * - `checklist.ts` - Core checklist data structures
 * - `components.ts` - React component prop interfaces
 * - `ui.ts` - UI effects and styling types
 *
 * @since 1.0.0 - Refactored from monolithic index.ts file
 */

// Core checklist data types
export * from 'types/checklist'

// Component prop types
export * from 'types/components'

// UI and styling types
export * from 'types/ui'
