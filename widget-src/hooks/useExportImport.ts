/**
 * Hook for managing export/import functionality.
 *
 * @remarks
 * Provides functionality to export progress as JSON and import custom checklists.
 *
 * @since 1.2.0
 */
const { widget } = figma
const { useSyncedState } = widget

import type { ChecklistDataType } from 'types'

/**
 * Returns handlers for exporting and importing checklist data.
 *
 * @param taskCompletion - Current task completion state
 * @param checklistData - Current checklist data structure
 * @returns Object with export/import handlers
 *
 * @example
 * ```ts
 * const { exportProgress, importProgress } = useExportImport(taskCompletion, checklistData)
 * ```
 */
export function useExportImport(
  taskCompletion: Record<string, boolean>,
  checklistData: ChecklistDataType
) {
  /**
   * Exports current progress as JSON string.
   */
  const exportProgress = () => {
    const exportData = {
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      progress: taskCompletion,
      checklist: checklistData,
    }
    return JSON.stringify(exportData, null, 2)
  }

  /**
   * Imports progress from JSON string.
   * Returns the imported task completion state.
   */
  const importProgress = (jsonString: string): Record<string, boolean> => {
    try {
      const data = JSON.parse(jsonString)
      if (data.progress && typeof data.progress === 'object') {
        return data.progress
      }
      return {}
    } catch (error) {
      return {}
    }
  }

  return {
    exportProgress,
    importProgress,
  }
}

