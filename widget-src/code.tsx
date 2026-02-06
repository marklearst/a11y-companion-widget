/**
 * Entry point for the Figma accessibility companion widget.
 *
 * @remarks
 * This file initializes the widget and registers the main component with the Figma Widget API. It manages state for task completion and renders the accessibility checklist interface.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const { widget } = figma;

import checklistDataJson from "data/a11yChecklistData.json";
import checklistDataEsJson from "data/a11yChecklistData.es.json";
import legacyChecklistJson from "data/checklist.json";
import { ChecklistPanel } from "components/checklist";
import type { ChecklistDataType } from "types";
import useProgressTracker from "hooks/useProgressTracker";
import useDarkMode from "hooks/useDarkMode"; // Widgets have a hard time detecting dark mode from my experience
import { useUserPreferences } from "hooks/useUserPreferences";
import {
  applyLegacyOverrides,
  type LegacyChecklist,
} from "logic/checklistAdapter";

/**
 * Main widget function component.
 *
 * @remarks
 * Handles state and rendering for the accessibility checklist, including role selector, checklist, and task completion.
 *
 * @returns The widget's main UI as a React JSX element.
 *
 * @example
 * ```ts
 * // This function is registered as the widget entry point
 * widget.register(Widget)
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#widgetregister | Figma Widget API: widget.register}
 */
function Widget() {
  const { preferences, setPreferences } = useUserPreferences();
  const { language, theme } = preferences;

  // Select appropriate data based on language
  let checklistData = (
    language === "es" ? checklistDataEsJson : checklistDataJson
  ) as ChecklistDataType;
  const useLegacyOverrides = language === "en";
  const legacySectionIds = useLegacyOverrides
    ? checklistData.sections.map((section) => section.id)
    : [];

  if (useLegacyOverrides && legacySectionIds.length > 0) {
    checklistData = applyLegacyOverrides(
      checklistData,
      legacyChecklistJson as LegacyChecklist,
      { sectionIds: legacySectionIds }
    );
  }

  // Use the progress tracker hook for state management
  const { taskCompletion, handleCheckChange } = useProgressTracker();

  // Detect system dark mode preference (if available)
  const isDarkMode = useDarkMode();

  // Flatten all items for progress tracking
  const allItems = checklistData.sections.flatMap((section) => section.items);
  const itemIds = allItems.map((item) => item.id);

  // Calculate progress
  const total = itemIds.length;
  const completed = itemIds.filter((id) => taskCompletion[id]).length;

  // Determine effective dark mode based on theme selection:
  // - "light" → always light mode
  // - "dark" → always dark mode
  // - "system" → use detected system preference (defaults to light if unavailable)
  const effectiveDarkMode =
    theme === "dark" ? true : theme === "system" ? isDarkMode : false;

  return (
    <ChecklistPanel
      title={checklistData.title}
      sections={checklistData.sections}
      taskCompletion={taskCompletion}
      handleCheckChange={handleCheckChange}
      total={total}
      completed={completed}
      isDarkMode={effectiveDarkMode}
      showItemDescriptionsForSectionIds={legacySectionIds}
      preferences={preferences}
      setPreferences={setPreferences}
    />
  );
}

/**
 * Registers the main widget component with the Figma Widget API.
 *
 * @remarks
 * This is required for the widget to appear in the Figma editor.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/#widgetregister | Figma Widget API: widget.register}
 */
widget.register(Widget);
