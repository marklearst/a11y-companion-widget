const { widget } = figma;
const { usePropertyMenu } = widget;

import { templates, type TemplateType } from "data/templates";
import type { Messages } from "i18n";
import type { UserPreferences } from "hooks/useUserPreferences";
import { themePresets } from "design-system";

type UseChecklistSettingsMenuOptions = {
  preferences: UserPreferences;
  setPreferences: (next: Partial<UserPreferences>) => void;
  messages: Messages;
  onExport?: () => void | Promise<void>;
};

const COLOR_SELECTOR_OPTIONS = [
  {
    option: themePresets.default.lightTheme.progressFill,
    tooltip: "Default",
  },
  {
    option: themePresets.indigo.lightTheme.progressFill,
    tooltip: "Indigo",
  },
  {
    option: themePresets.emerald.lightTheme.progressFill,
    tooltip: "Emerald",
  },
  {
    option: themePresets.rose.lightTheme.progressFill,
    tooltip: "Rose",
  },
  {
    option: themePresets.slate.lightTheme.progressFill,
    tooltip: "Slate",
  },
  {
    option: themePresets.cyan.lightTheme.progressFill,
    tooltip: "Cyan",
  },
];

export function useChecklistSettingsMenu({
  preferences,
  setPreferences,
  messages,
  onExport,
}: UseChecklistSettingsMenuOptions) {
  const {
    hideCompleted,
    language,
    theme,
    selectedTemplate,
    accentColor,
    showContrastInspector,
  } = preferences;

  const templateKeyMap: Record<TemplateType, keyof typeof messages.templates> =
    {
      all: "all",
      "landing-page": "landingPage",
      dashboard: "dashboard",
      "mobile-app": "mobileApp",
      "quick-audit": "quickAudit",
      "forms-heavy": "formsHeavy",
    };
  const templateOptions = templates.map((template) => {
    const templateKey = templateKeyMap[template.id];
    const templateLabel =
      messages.templates[templateKey]?.name || template.name;
    return { option: template.id, label: String(templateLabel) };
  });
  const templateTooltip = String(messages.checklistTemplate).replace(
    /:\s*$/,
    ""
  );
  usePropertyMenu(
    [
      // Section 1: Scope & Context
      {
        itemType: "dropdown",
        propertyName: "language",
        tooltip: messages.languageLabel,
        selectedOption: language,
        options: [
          { option: "en", label: "English" },
          { option: "es", label: "Español" },
          { option: "fr", label: "Français" },
          { option: "de", label: "Deutsch" },
          { option: "pt-BR", label: "Português (BR)" },
          { option: "ja", label: "日本語" },
          { option: "ko", label: "한국어" },
          { option: "uk", label: "Українська" },
          { option: "pl", label: "Polski" },
          { option: "da", label: "Dansk" },
          { option: "nb", label: "Norsk" },
          { option: "sv", label: "Svenska" },
          { option: "fi", label: "Suomi" },
        ],
      },
      {
        itemType: "dropdown",
        propertyName: "template",
        tooltip: templateTooltip || "Checklist Template",
        selectedOption: selectedTemplate,
        options: templateOptions,
      },
      { itemType: "separator" },
      // Section 2: Visual Configuration
      {
        itemType: "dropdown",
        propertyName: "theme",
        tooltip: messages.themeLabel,
        selectedOption: theme,
        options: [
          { option: "light", label: messages.themeLightLabel || "Light" },
          { option: "dark", label: messages.themeDarkLabel || "Dark" },
        ],
      },
      {
        itemType: "color-selector",
        propertyName: "accentColor",
        tooltip: messages.brandThemeLabel,
        selectedOption: accentColor,
        options: COLOR_SELECTOR_OPTIONS,
      },
      { itemType: "separator" },
      // Section 3: Specialized Checks & Exports
      {
        itemType: "toggle",
        propertyName: "contrast-inspector",
        tooltip: messages.contrastInspectorToggle,
        isToggled: showContrastInspector,
      },
      {
        itemType: "action",
        propertyName: "export-markdown",
        tooltip: messages.exportMarkdown,
      },
      /*
      {
        itemType: "toggle",
        propertyName: "hide-completed",
        tooltip: messages.hideCompletedToggle,
        isToggled: hideCompleted,
      },
      */
    ],
    (event: { propertyName: string; propertyValue?: string }) => {
      const { propertyName, propertyValue } = event;
      if (propertyName === "hide-completed") {
        setPreferences({ hideCompleted: !hideCompleted });
      }
      if (propertyName === "template" && propertyValue) {
        setPreferences({ selectedTemplate: propertyValue as TemplateType });
      }
      if (propertyName === "export-markdown") {
        if (onExport) {
          void onExport();
        }
      }
      if (propertyName === "theme" && propertyValue) {
        setPreferences({ theme: propertyValue as "light" | "dark" });
      }
      if (propertyName === "language" && propertyValue) {
        setPreferences({ language: propertyValue as UserPreferences["language"] });
      }
      if (propertyName === "accentColor" && propertyValue) {
        setPreferences({ accentColor: propertyValue });
      }
      if (propertyName === "contrast-inspector") {
        setPreferences({ showContrastInspector: !showContrastInspector });
      }
    }
  );
}
