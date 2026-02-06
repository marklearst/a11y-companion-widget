/**
 * Smart Annotations Feature
 *
 * @remarks
 * Allows users to attach accessibility checklist items to specific Figma layers.
 * This creates a direct connection between the widget and the document, enabling
 * targeted accessibility reviews and handoff documentation.
 *
 * @example
 * ```ts
 * // Attach a checklist item to a selected layer
 * await attachChecklistItem(nodeId, 'content-1', true)
 *
 * // Get all annotations for a layer
 * const annotations = await getLayerAnnotations(nodeId)
 * ```
 */

/**
 * Plugin data key prefix for storing annotations
 */
const ANNOTATION_KEY_PREFIX = 'a11y-companion-check-';

/**
 * Annotation data structure
 */
export interface Annotation {
  checkId: string;
  isComplete: boolean;
  timestamp: number;
  widgetId?: string;
}

/**
 * Attaches a checklist item annotation to a Figma layer.
 *
 * @param nodeId - The Figma node ID to annotate
 * @param checkId - The checklist item ID
 * @param isComplete - Whether the check is complete
 * @returns Promise that resolves when annotation is saved
 */
export async function attachChecklistItem(
  nodeId: string,
  checkId: string,
  isComplete: boolean
): Promise<void> {
  try {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node) {
      console.warn(`Node ${nodeId} not found`);
      return;
    }

    // Check if node supports plugin data
    if (!('setPluginData' in node)) {
      console.warn(`Node ${nodeId} does not support plugin data`);
      return;
    }

    const annotation: Annotation = {
      checkId,
      isComplete,
      timestamp: Date.now(),
    };

    const key = `${ANNOTATION_KEY_PREFIX}${checkId}`;
    node.setPluginData(key, JSON.stringify(annotation));
  } catch (error) {
    console.error('Failed to attach checklist item:', error);
  }
}

/**
 * Removes a checklist item annotation from a Figma layer.
 *
 * @param nodeId - The Figma node ID
 * @param checkId - The checklist item ID to remove
 * @returns Promise that resolves when annotation is removed
 */
export async function removeChecklistItem(
  nodeId: string,
  checkId: string
): Promise<void> {
  try {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node || !('setPluginData' in node)) {
      return;
    }

    const key = `${ANNOTATION_KEY_PREFIX}${checkId}`;
    node.setPluginData(key, '');
  } catch (error) {
    console.error('Failed to remove checklist item:', error);
  }
}

/**
 * Gets all annotations for a specific layer.
 *
 * @param nodeId - The Figma node ID
 * @returns Promise resolving to array of annotations
 */
export async function getLayerAnnotations(nodeId: string): Promise<Annotation[]> {
  try {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (!node || !('getPluginDataKeys' in node)) {
      return [];
    }

    const keys = node.getPluginDataKeys();
    const annotationKeys = keys.filter(key => key.startsWith(ANNOTATION_KEY_PREFIX));

    const annotations: Annotation[] = [];
    for (const key of annotationKeys) {
      const data = node.getPluginData(key);
      if (data) {
        try {
          annotations.push(JSON.parse(data));
        } catch (_err) {
          console.warn(`Failed to parse annotation data for key ${key}`);
        }
      }
    }

    return annotations;
  } catch (error) {
    console.error('Failed to get layer annotations:', error);
    return [];
  }
}

/**
 * Gets the current Figma selection.
 *
 * @returns Array of selected node IDs
 */
export function getCurrentSelection(): string[] {
  try {
    return figma.currentPage.selection.map(node => node.id);
  } catch (error) {
    console.error('Failed to get current selection:', error);
    return [];
  }
}

/**
 * Counts total annotations across all layers in the document.
 *
 * @returns Promise resolving to annotation count
 */
export async function countTotalAnnotations(): Promise<number> {
  try {
    const allNodes = figma.currentPage.findAll(node => {
      return 'getPluginDataKeys' in node;
    });

    let count = 0;
    for (const node of allNodes) {
      if ('getPluginDataKeys' in node) {
        const keys = node.getPluginDataKeys();
        count += keys.filter(key => key.startsWith(ANNOTATION_KEY_PREFIX)).length;
      }
    }

    return count;
  } catch (error) {
    console.error('Failed to count annotations:', error);
    return 0;
  }
}

/**
 * Finds all layers with a specific checklist item annotation.
 *
 * @param checkId - The checklist item ID to search for
 * @returns Promise resolving to array of node IDs
 */
export async function findLayersWithCheck(checkId: string): Promise<string[]> {
  try {
    const key = `${ANNOTATION_KEY_PREFIX}${checkId}`;
    const allNodes = figma.currentPage.findAll(node => {
      if (!('getPluginData' in node)) return false;
      const data = node.getPluginData(key);
      return !!data;
    });

    return allNodes.map(node => node.id);
  } catch (error) {
    console.error('Failed to find layers with check:', error);
    return [];
  }
}

/**
 * Exports all annotations for the current page as JSON.
 *
 * @returns Promise resolving to JSON string of all annotations
 */
export async function exportPageAnnotations(): Promise<string> {
  try {
    const allNodes = figma.currentPage.findAll(node => {
      return 'getPluginDataKeys' in node;
    });

    const pageAnnotations: Record<string, {
      nodeName: string;
      nodeType: string;
      annotations: Annotation[];
    }> = {};

    for (const node of allNodes) {
      if (!('getPluginDataKeys' in node)) continue;

      const keys = node.getPluginDataKeys();
      const annotationKeys = keys.filter(key => key.startsWith(ANNOTATION_KEY_PREFIX));

      if (annotationKeys.length === 0) continue;

      const annotations: Annotation[] = [];
      for (const key of annotationKeys) {
        const data = node.getPluginData(key);
        if (data) {
          try {
            annotations.push(JSON.parse(data));
          } catch (_err) {
            // Skip invalid data
          }
        }
      }

      pageAnnotations[node.id] = {
        nodeName: node.name,
        nodeType: node.type,
        annotations,
      };
    }

    return JSON.stringify({
      pageName: figma.currentPage.name,
      exportDate: new Date().toISOString(),
      annotations: pageAnnotations,
    }, null, 2);
  } catch (error) {
    console.error('Failed to export annotations:', error);
    return JSON.stringify({ error: 'Failed to export annotations' });
  }
}
