/**
 * Hook for managing Smart Annotations feature.
 *
 * @remarks
 * Provides state and actions for attaching checklist items to Figma layers.
 * Enables annotation mode, selection handling, and layer-specific check management.
 *
 * @since 1.3.0
 */

const { widget } = figma;
const { useSyncedState } = widget;

import {
  attachChecklistItem,
  removeChecklistItem,
  getLayerAnnotations,
  getCurrentSelection,
  type Annotation,
} from 'features/smartAnnotations';

export function useSmartAnnotations() {
  // Annotation mode - when enabled, clicking a checklist item attaches it to selected layer
  const [annotationMode, setAnnotationMode] = useSyncedState<boolean>(
    'annotationMode',
    false
  );

  // Currently selected layers
  const [selectedLayers, setSelectedLayers] = useSyncedState<string[]>(
    'selectedLayers',
    []
  );

  // Annotations for currently selected layer (first selection)
  const [currentAnnotations, setCurrentAnnotations] = useSyncedState<Annotation[]>(
    'currentAnnotations',
    []
  );

  /**
   * Toggle annotation mode on/off
   */
  const toggleAnnotationMode = () => {
    setAnnotationMode(!annotationMode);
    if (!annotationMode) {
      // Entering annotation mode - get current selection
      const selection = getCurrentSelection();
      setSelectedLayers(selection);
    }
  };

  /**
   * Refresh current selection and load annotations
   */
  const refreshSelection = async () => {
    const selection = getCurrentSelection();
    setSelectedLayers(selection);

    if (selection.length > 0) {
      // Load annotations for first selected layer
      const annotations = await getLayerAnnotations(selection[0]);
      setCurrentAnnotations(annotations);
    } else {
      setCurrentAnnotations([]);
    }
  };

  /**
   * Attach or remove a checklist item from selected layer
   */
  const toggleLayerAnnotation = async (
    checkId: string,
    isChecked: boolean
  ): Promise<void> => {
    if (selectedLayers.length === 0) {
      figma.notify('⚠️ Select a layer first to attach checks', { timeout: 2000 });
      return;
    }

    const targetLayerId = selectedLayers[0];

    if (isChecked) {
      // Attach annotation
      await attachChecklistItem(targetLayerId, checkId, false);
      figma.notify('✅ Check attached to layer', { timeout: 1500 });
    } else {
      // Remove annotation
      await removeChecklistItem(targetLayerId, checkId);
      figma.notify('🗑️ Check removed from layer', { timeout: 1500 });
    }

    // Refresh annotations
    await refreshSelection();
  };

  /**
   * Check if a specific checklist item is attached to current layer
   */
  const isCheckAttachedToLayer = (checkId: string): boolean => {
    return currentAnnotations.some(ann => ann.checkId === checkId);
  };

  /**
   * Get annotation count for a specific check across all layers
   */
  const getCheckAnnotationCount = async (_checkId: string): Promise<number> => {
    // This would require scanning all layers - implement if needed
    return 0;
  };

  return {
    // State
    annotationMode,
    selectedLayers,
    currentAnnotations,
    hasSelection: selectedLayers.length > 0,

    // Actions
    toggleAnnotationMode,
    refreshSelection,
    toggleLayerAnnotation,
    isCheckAttachedToLayer,
    getCheckAnnotationCount,
  };
}
