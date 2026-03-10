import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";
import frMessages from "./messages/fr.json";
import deMessages from "./messages/de.json";
import ptBRMessages from "./messages/pt-BR.json";
import jaMessages from "./messages/ja.json";
import koMessages from "./messages/ko.json";
import ukMessages from "./messages/uk.json";
import plMessages from "./messages/pl.json";
import daMessages from "./messages/da.json";
import nbMessages from "./messages/nb.json";
import svMessages from "./messages/sv.json";
import fiMessages from "./messages/fi.json";

export type Locale =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "pt-BR"
  | "ja"
  | "ko"
  | "uk"
  | "pl"
  | "da"
  | "nb"
  | "sv"
  | "fi";

export type Messages = {
  appTitle: string;
  progressText: (completed: number, total: number) => string;
  progressCount?: (completed: number, total: number) => string;
  progressLabel?: string;
  hideCompletedToggle: string;
  markAllComplete: string;
  markAllIncomplete: string;
  collapseAll: string;
  expandAll: string;
  searchLabel: string;
  searchPlaceholder: string;
  exportProgress: string;
  importProgress: string;
  exportMarkdown: string;
  themeLabel: string;
  brandThemeLabel: string;
  languageLabel: string;
  contrastInspectorToggle: string;
  contrastPairLabel: string;
  contrastCheckSelection: string;
  contrastClearSelection: string;
  contrastInspectorHint: string;
  contrastNoData: string;
  contrastRunCheck: string;
  contrastSwap: string;
  contrastSwapSolidOnly: string;
  contrastClear: string;
  contrastLargeTextOnly: string;
  contrastTextLabel: string;
  contrastBackgroundLabel: string;
  layoutLabel: string;
  noResults: string;
  quickCopy: string;
  exportFormat: string;
  checklistTemplate: string;
  copyAs: string;
  copyInstruction: string;
  copiedMarkdown: string;
  copyReady: string;
  templates: {
    all: { name: string; description: string };
    landingPage: { name: string; description: string };
    dashboard: { name: string; description: string };
    mobileApp: { name: string; description: string };
    quickAudit: { name: string; description: string };
    formsHeavy: { name: string; description: string };
  };
  contrastPairs: {
    progressOnPanel: string;
    progressOnHeader: string;
    textPrimaryOnPanel: string;
  };
  themeLightLabel: string;
  themeDarkLabel: string;
  contrastNotices: {
    image: string;
    "two-gradients": string;
    "mixed-fills": string;
    "multi-fills": string;
    "no-pair": string;
    "no-selection": string;
    "stale-selection": string;
  };
};

type MessagesJson = Record<string, string>;

const THOUSANDS_SEP: Partial<Record<Locale, string>> = {
  en: ",",
  ja: ",",
  ko: ",",
  es: ".",
  de: ".",
  da: ".",
  "pt-BR": ".",
  fr: "\u202F",
  fi: "\u00A0",
  sv: "\u00A0",
  nb: "\u00A0",
  uk: "\u00A0",
  pl: "\u00A0",
};

function formatNumber(locale: Locale, value: number): string {
  const str = String(Math.floor(value));
  if (str.length <= 3) return str;
  const sep = THOUSANDS_SEP[locale] ?? ",";
  const parts: string[] = [];
  for (let i = str.length; i > 0; i -= 3) {
    parts.unshift(str.slice(Math.max(0, i - 3), i));
  }
  return parts.join(sep);
}

function interpolate(
  template: string,
  vars: Record<string, string | number>,
  locale?: Locale,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    if (typeof v === "number" && locale) {
      return formatNumber(locale, v);
    }
    return String(v ?? "");
  });
}

function buildMessages(raw: MessagesJson, locale: Locale): Messages {
  const get = (key: string): string => raw[key] ?? "";
  return {
    appTitle: get("appTitle"),
    progressText: (c, t) =>
      interpolate(get("progressText"), { checked: c, total: t }, locale),
    progressCount: (c, t) =>
      interpolate(get("progressCount"), { checked: c, total: t }, locale),
    progressLabel: get("progressLabel"),
    hideCompletedToggle: get("hideCompletedToggle"),
    markAllComplete: get("markAllComplete"),
    markAllIncomplete: get("markAllIncomplete"),
    collapseAll: get("collapseAll"),
    expandAll: get("expandAll"),
    searchLabel: get("searchLabel"),
    searchPlaceholder: get("searchPlaceholder"),
    exportProgress: get("exportProgress"),
    importProgress: get("importProgress"),
    exportMarkdown: get("exportMarkdown"),
    themeLabel: get("themeLabel"),
    brandThemeLabel: get("brandThemeLabel"),
    languageLabel: get("languageLabel"),
    contrastInspectorToggle: get("contrastInspectorToggle"),
    contrastPairLabel: get("contrastPairLabel"),
    contrastCheckSelection: get("contrastCheckSelection"),
    contrastClearSelection: get("contrastClearSelection"),
    contrastInspectorHint: get("contrastInspectorHint"),
    contrastNoData: get("contrastNoData"),
    contrastRunCheck: get("contrastRunCheck"),
    contrastSwap: get("contrastSwap"),
    contrastSwapSolidOnly: get("contrastSwapSolidOnly"),
    contrastClear: get("contrastClear"),
    contrastLargeTextOnly: get("contrastLargeTextOnly"),
    contrastTextLabel: get("contrastTextLabel"),
    contrastBackgroundLabel: get("contrastBackgroundLabel"),
    layoutLabel: get("layoutLabel"),
    noResults: get("noResults"),
    quickCopy: get("quickCopy"),
    exportFormat: get("exportFormat"),
    checklistTemplate: get("checklistTemplate"),
    copyAs: get("copyAs"),
    copyInstruction: get("copyInstruction"),
    copiedMarkdown: get("copiedMarkdown"),
    copyReady: get("copyReady"),
    templates: {
      all: {
        name: get("templates.all.name"),
        description: get("templates.all.description"),
      },
      landingPage: {
        name: get("templates.landingPage.name"),
        description: get("templates.landingPage.description"),
      },
      dashboard: {
        name: get("templates.dashboard.name"),
        description: get("templates.dashboard.description"),
      },
      mobileApp: {
        name: get("templates.mobileApp.name"),
        description: get("templates.mobileApp.description"),
      },
      quickAudit: {
        name: get("templates.quickAudit.name"),
        description: get("templates.quickAudit.description"),
      },
      formsHeavy: {
        name: get("templates.formsHeavy.name"),
        description: get("templates.formsHeavy.description"),
      },
    },
    contrastPairs: {
      progressOnPanel: get("contrastPairs.progressOnPanel"),
      progressOnHeader: get("contrastPairs.progressOnHeader"),
      textPrimaryOnPanel: get("contrastPairs.textPrimaryOnPanel"),
    },
    themeLightLabel: get("themeLightLabel"),
    themeDarkLabel: get("themeDarkLabel"),
    contrastNotices: {
      image: get("contrastNotices.image"),
      "two-gradients": get("contrastNotices.two-gradients"),
      "mixed-fills": get("contrastNotices.mixed-fills"),
      "multi-fills": get("contrastNotices.multi-fills"),
      "no-pair": get("contrastNotices.no-pair"),
      "no-selection": get("contrastNotices.no-selection"),
      "stale-selection": get("contrastNotices.stale-selection"),
    },
  };
}

const en = buildMessages(enMessages as MessagesJson, "en");
const es = buildMessages(esMessages as MessagesJson, "es");
const fr = buildMessages(frMessages as MessagesJson, "fr");
const de = buildMessages(deMessages as MessagesJson, "de");
const ptBR = buildMessages(ptBRMessages as MessagesJson, "pt-BR");
const ja = buildMessages(jaMessages as MessagesJson, "ja");
const ko = buildMessages(koMessages as MessagesJson, "ko");
const uk = buildMessages(ukMessages as MessagesJson, "uk");
const pl = buildMessages(plMessages as MessagesJson, "pl");
const da = buildMessages(daMessages as MessagesJson, "da");
const nb = buildMessages(nbMessages as MessagesJson, "nb");
const sv = buildMessages(svMessages as MessagesJson, "sv");
const fi = buildMessages(fiMessages as MessagesJson, "fi");

export const locales: Record<Locale, Messages> = {
  en,
  es,
  fr,
  de,
  "pt-BR": ptBR,
  ja,
  ko,
  uk,
  pl,
  da,
  nb,
  sv,
  fi,
};

export function getMessages(locale: Locale): Messages {
  return locales[locale] ?? en;
}
