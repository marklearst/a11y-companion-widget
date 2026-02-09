const { widget } = figma;
const { useSyncedMap, useWidgetId } = widget;

import { defaultTheme } from "design-system";
import { templates, type TemplateType } from "data/templates";
import { normalizeHexColor } from "shared/hexColor";
import {
  buildPreferenceMapKey,
  resolveWidgetScope,
} from "shared/preferenceNamespace";

export type ContrastInspectorPair =
  | "progress-on-panel"
  | "progress-on-header"
  | "text-primary-on-panel";

export type UserPreferences = {
  hideCompleted: boolean;
  theme: "light" | "dark";
  language: "en" | "es";
  selectedTemplate: TemplateType;
  accentColor: string;
  showContrastInspector: boolean;
  contrastPair: ContrastInspectorPair;
};

const DEFAULT_PREFERENCES: UserPreferences = {
  hideCompleted: false,
  theme: "light",
  language: "en",
  selectedTemplate: "all",
  accentColor: defaultTheme.lightTheme.progressFill,
  showContrastInspector: false,
  contrastPair: "progress-on-panel",
};

const VALID_THEMES = new Set<UserPreferences["theme"]>(["light", "dark"]);
const VALID_LANGUAGES = new Set<UserPreferences["language"]>(["en", "es"]);
const VALID_TEMPLATES = new Set<TemplateType>(
  templates.map((template) => template.id),
);
const VALID_CONTRAST_PAIRS = new Set<ContrastInspectorPair>([
  "progress-on-panel",
  "progress-on-header",
  "text-primary-on-panel",
]);

function normalizePreferences(
  value: Partial<UserPreferences> & { theme?: string },
): UserPreferences {
  const accentColor =
    normalizeHexColor(value.accentColor) ?? DEFAULT_PREFERENCES.accentColor;
  const themeValue =
    typeof value.theme === "string" &&
    VALID_THEMES.has(value.theme as UserPreferences["theme"])
      ? (value.theme as UserPreferences["theme"])
      : DEFAULT_PREFERENCES.theme;
  const languageValue =
    typeof value.language === "string" &&
    VALID_LANGUAGES.has(value.language as UserPreferences["language"])
      ? (value.language as UserPreferences["language"])
      : DEFAULT_PREFERENCES.language;
  const templateValue =
    typeof value.selectedTemplate === "string" &&
    VALID_TEMPLATES.has(value.selectedTemplate as TemplateType)
      ? (value.selectedTemplate as TemplateType)
      : DEFAULT_PREFERENCES.selectedTemplate;
  const contrastPairValue =
    typeof value.contrastPair === "string" &&
    VALID_CONTRAST_PAIRS.has(value.contrastPair as ContrastInspectorPair)
      ? (value.contrastPair as ContrastInspectorPair)
      : DEFAULT_PREFERENCES.contrastPair;
  return {
    hideCompleted: Boolean(value.hideCompleted),
    theme: themeValue,
    language: languageValue,
    selectedTemplate: templateValue,
    accentColor,
    showContrastInspector: Boolean(value.showContrastInspector),
    contrastPair: contrastPairValue,
  };
}

export function useUserPreferences() {
  const preferencesMap = useSyncedMap<UserPreferences>("userPreferences");
  const widgetId = useWidgetId();
  const widgetScope = resolveWidgetScope(widgetId ?? null);
  const userScope = "shared";
  const userKey = buildPreferenceMapKey(userScope, widgetScope);

  const stored = preferencesMap.get(userKey);
  const preferences = normalizePreferences(
    stored ? { ...DEFAULT_PREFERENCES, ...stored } : DEFAULT_PREFERENCES,
  );

  const setPreferences = (next: Partial<UserPreferences>) => {
    const merged = {
      ...DEFAULT_PREFERENCES,
      ...preferences,
      ...next,
    };
    preferencesMap.set(userKey, normalizePreferences(merged));
  };

  return {
    preferences,
    setPreferences,
  };
}
