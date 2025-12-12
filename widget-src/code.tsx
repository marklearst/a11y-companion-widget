/**
 * Entry point for the Figma accessibility companion widget.
 *
 * @remarks
 * This file initializes the widget and registers the main component with the Figma Widget API. It manages state for task completion and renders the accessibility checklist interface.
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const { widget } = figma;
const { useSyncedState } = widget;

import checklistDataJson from "data/a11yChecklistData.json";
import checklistDataEsJson from "data/a11yChecklistData.es.json";
import { ChecklistPanel } from "components/checklist";
import type { ChecklistDataType } from "types";
import useProgressTracker from "hooks/useProgressTracker";

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
  // Get language preference
  const [language] = useSyncedState<"en" | "es">("language", "en");

  // Select appropriate data based on language
  const checklistData = (
    language === "es" ? checklistDataEsJson : checklistDataJson
  ) as ChecklistDataType;

  // Use the progress tracker hook for state management
  const { taskCompletion, handleCheckChange } = useProgressTracker();

  // Flatten all items for progress tracking
  const allItems = checklistData.sections.flatMap((section) => section.items);
  const itemIds = allItems.map((item) => item.id);

  // Calculate progress
  const total = itemIds.length;
  const completed = itemIds.filter((id) => taskCompletion[id]).length;

  // Note: Dark mode detection for 'system' theme is handled in ChecklistPanel
  // via the theme property menu option. Widgets don't have direct access to
  // system preferences, so 'system' will default to light mode for now.
  return (
    <ChecklistPanel
      title={checklistData.title}
      sections={checklistData.sections}
      taskCompletion={taskCompletion}
      handleCheckChange={handleCheckChange}
      total={total}
      completed={completed}
      isDarkMode={false}
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
