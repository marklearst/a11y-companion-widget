/**
 * Hook for smart section highlighting based on Figma selections.
 *
 * @remarks
 * Detects node types and suggests relevant accessibility sections.
 *
 * @since 1.2.0
 */
const { widget } = figma;
const { useSyncedState } = widget;

/**
 * Maps node types to relevant checklist sections.
 */
function getSuggestedSections(nodes: readonly SceneNode[]): string[] {
  const suggestions = new Set<string>();

  nodes.forEach((node) => {
    // Check node type
    const nodeType = node.type;

    // Images
    if (
      nodeType === "RECTANGLE" ||
      nodeType === "ELLIPSE" ||
      nodeType === "VECTOR"
    ) {
      if ("fills" in node && node.fills && Array.isArray(node.fills)) {
        const hasImageFill = node.fills.some((fill) => fill.type === "IMAGE");
        if (hasImageFill) {
          suggestions.add("Images");
        }
      }
    }

    // Text content
    if (nodeType === "TEXT") {
      suggestions.add("Content");
      suggestions.add("Headings");
    }

    // Forms (components that look like inputs)
    if ("name" in node) {
      const nodeName = node.name.toLowerCase();
      if (
        nodeName.includes("input") ||
        nodeName.includes("form") ||
        nodeName.includes("field") ||
        nodeName.includes("text field") ||
        nodeName.includes("search")
      ) {
        suggestions.add("Forms");
        suggestions.add("Keyboard");
      }

      // Buttons and controls
      if (
        nodeName.includes("button") ||
        nodeName.includes("link") ||
        nodeName.includes("cta") ||
        nodeName.includes("nav")
      ) {
        suggestions.add("Controls");
        suggestions.add("Keyboard");
      }

      // Tables
      if (
        nodeName.includes("table") ||
        nodeName.includes("grid") ||
        nodeName.includes("data")
      ) {
        suggestions.add("Tables");
      }

      // Media
      if (
        nodeName.includes("video") ||
        nodeName.includes("audio") ||
        nodeName.includes("player") ||
        nodeName.includes("media")
      ) {
        suggestions.add("Media");
        suggestions.add("Video");
        suggestions.add("Audio");
      }
    }

    // Interactive elements (anything with onClick-like behavior)
    if (
      nodeType === "FRAME" ||
      nodeType === "COMPONENT" ||
      nodeType === "INSTANCE"
    ) {
      suggestions.add("Mobile and touch");
    }

    // Check for animations (if effects present)
    if ("effects" in node && node.effects && node.effects.length > 0) {
      suggestions.add("Animation");
    }
  });

  return Array.from(suggestions);
}

/**
 * Hook that provides smart section highlighting.
 */
export function useSmartHighlight() {
  const [suggestedSections, setSuggestedSections] = useSyncedState<string[]>(
    "suggestedSections",
    []
  );
  const [isHighlighting, setIsHighlighting] = useSyncedState(
    "isHighlighting",
    false
  );

  /**
   * Analyzes current selection and suggests relevant sections.
   */
  const analyzeSelection = () => {
    try {
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        setSuggestedSections([]);
        setIsHighlighting(false);
        return;
      }

      const suggestions = getSuggestedSections(selection);
      setSuggestedSections(suggestions);
      setIsHighlighting(true);
    } catch (error) {
      console.error("Error analyzing selection:", error);
      setSuggestedSections([]);
      setIsHighlighting(false);
    }
  };

  /**
   * Clears suggestions.
   */
  const clearSuggestions = () => {
    setSuggestedSections([]);
    setIsHighlighting(false);
  };

  return {
    suggestedSections,
    isHighlighting,
    analyzeSelection,
    clearSuggestions,
  };
}
