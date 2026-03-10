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
import checklistDataFrJson from "data/a11yChecklistData.fr.json";
import checklistDataDeJson from "data/a11yChecklistData.de.json";
import checklistDataPtBRJson from "data/a11yChecklistData.pt-BR.json";
import checklistDataJaJson from "data/a11yChecklistData.ja.json";
import checklistDataKoJson from "data/a11yChecklistData.ko.json";
import checklistDataUkJson from "data/a11yChecklistData.uk.json";
import checklistDataPlJson from "data/a11yChecklistData.pl.json";
import checklistDataDaJson from "data/a11yChecklistData.da.json";
import checklistDataNbJson from "data/a11yChecklistData.nb.json";
import checklistDataSvJson from "data/a11yChecklistData.sv.json";
import checklistDataFiJson from "data/a11yChecklistData.fi.json";
import legacyChecklistJson from "data/checklist.json";
import { ChecklistPanel } from "components/checklist";
import type { ChecklistDataType } from "types";
import type { Locale } from "i18n";
import useProgressTracker from "hooks/useProgressTracker";
import { useUserPreferences } from "hooks/useUserPreferences";
import {
  applyLegacyOverrides,
  type LegacyChecklist,
} from "logic/checklistAdapter";

/**
 * Locale-to-checklist-data registry. Locales without translated files
 * fall back to English. After running `pnpm run translate -- --locale xx`,
 * import the generated JSON and add it here.
 */
const checklistByLocale: Record<Locale, ChecklistDataType> = {
  en: checklistDataJson as ChecklistDataType,
  es: checklistDataEsJson as ChecklistDataType,
  fr: checklistDataFrJson as ChecklistDataType,
  de: checklistDataDeJson as ChecklistDataType,
  "pt-BR": checklistDataPtBRJson as ChecklistDataType,
  ja: checklistDataJaJson as ChecklistDataType,
  ko: checklistDataKoJson as ChecklistDataType,
  uk: checklistDataUkJson as ChecklistDataType,
  pl: checklistDataPlJson as ChecklistDataType,
  da: checklistDataDaJson as ChecklistDataType,
  nb: checklistDataNbJson as ChecklistDataType,
  sv: checklistDataSvJson as ChecklistDataType,
  fi: checklistDataFiJson as ChecklistDataType,
};

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
  const { language } = preferences;

  let checklistData: ChecklistDataType =
    checklistByLocale[language] ?? (checklistDataJson as ChecklistDataType);
  const useLegacyOverrides = language === "en";

  if (useLegacyOverrides) {
    checklistData = applyLegacyOverrides(
      checklistData,
      legacyChecklistJson as LegacyChecklist,
      { sectionIds: checklistData.sections.map((section) => section.id) }
    );
  }

  const descriptionSectionIds = checklistData.sections.map((s) => s.id);

  // Use the progress tracker hook for state management
  const { taskCompletion, handleCheckChange } = useProgressTracker();

  // Flatten all items for progress tracking
  const allItems = checklistData.sections.flatMap((section) => section.items);
  const itemIds = allItems.map((item) => item.id);

  // Calculate progress
  const total = itemIds.length;
  const completed = itemIds.filter((id) => taskCompletion[id]).length;

  return (
    <ChecklistPanel
      title={checklistData.title}
      sections={checklistData.sections}
      taskCompletion={taskCompletion}
      handleCheckChange={handleCheckChange}
      total={total}
      completed={completed}
      showItemDescriptionsForSectionIds={descriptionSectionIds}
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
