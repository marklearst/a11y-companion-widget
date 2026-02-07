const { widget } = figma;
const { useSyncedMap, useSyncedState, useEffect } = widget;

import { defaultTheme } from "design-system";
import { templates, type TemplateType } from "data/templates";
import { normalizeHexColor } from "shared/hexColor";

export type UserPreferences = {
  hideCompleted: boolean;
  theme: "light" | "dark" | "system";
  language: "en" | "es";
  selectedTemplate: TemplateType;
  accentColor: string;
};

const DEFAULT_PREFERENCES: UserPreferences = {
  hideCompleted: false,
  theme: "light",
  language: "en",
  selectedTemplate: "all",
  accentColor: defaultTheme.lightTheme.progressFill,
};

const VALID_THEMES = new Set<UserPreferences["theme"]>([
  "light",
  "dark",
  "system",
]);
const VALID_LANGUAGES = new Set<UserPreferences["language"]>(["en", "es"]);
const VALID_TEMPLATES = new Set<TemplateType>(
  templates.map((template) => template.id)
);

function normalizePreferences(value: UserPreferences): UserPreferences {
  const accentColor =
    normalizeHexColor(value.accentColor) ?? DEFAULT_PREFERENCES.accentColor;
  return {
    hideCompleted: Boolean(value.hideCompleted),
    theme: VALID_THEMES.has(value.theme) ? value.theme : DEFAULT_PREFERENCES.theme,
    language: VALID_LANGUAGES.has(value.language)
      ? value.language
      : DEFAULT_PREFERENCES.language,
    selectedTemplate: VALID_TEMPLATES.has(value.selectedTemplate)
      ? value.selectedTemplate
      : DEFAULT_PREFERENCES.selectedTemplate,
    accentColor,
  };
}

export function useUserPreferences() {
  const preferencesMap = useSyncedMap<UserPreferences>("userPreferences");
  const [, setRevision] = useSyncedState("userPreferencesRevision", 0);
  const [userKey, setUserKey] = useSyncedState<string>(
    "userPreferencesKey",
    "user:default"
  );

  useEffect(() => {
    const userId = figma.currentUser?.id;
    if (!userId) return;
    const nextKey = `user:${userId}`;
    if (userKey === nextKey) return;
    const currentPrefs = preferencesMap.get(userKey);
    const nextPrefs = preferencesMap.get(nextKey);
    if (!nextPrefs && currentPrefs) {
      preferencesMap.set(nextKey, currentPrefs);
    }
    setUserKey(nextKey);
    setRevision((value) => value + 1);
  });

  const stored = preferencesMap.get(userKey);
  const preferences = normalizePreferences(
    stored ? { ...DEFAULT_PREFERENCES, ...stored } : DEFAULT_PREFERENCES
  );

  const setPreferences = (next: Partial<UserPreferences>) => {
    const merged = {
      ...DEFAULT_PREFERENCES,
      ...preferences,
      ...next,
    };
    preferencesMap.set(userKey, normalizePreferences(merged));
    setRevision((value) => value + 1);
  };

  return {
    preferences,
    setPreferences,
  };
}
