#!/usr/bin/env node

/**
 * Term protection for translation: prevents machine translation from
 * mangling HTML element names, attributes, WCAG codes, and other
 * technical terms that must remain in English.
 *
 * Uses ZZnnZZ placeholders (look like proper nouns to translation APIs,
 * which pass them through untouched).
 */

const HTML_ELEMENTS = [
  "abbr", "article", "aside", "audio", "br", "button",
  "canvas", "caption", "col", "colgroup", "dd", "details", "div",
  "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form",
  "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "html",
  "iframe", "img", "input", "kbd", "legend", "li",
  "meta", "nav", "ol", "option", "pre", "select",
  "span", "svg", "table", "tbody", "td",
  "textarea", "tfoot", "th", "thead", "tr", "track", "ul",
  "video",
];

const HTML_ATTRIBUTES = [
  "aria-describedby", "aria-hidden", "aria-label", "aria-pressed",
  "autocomplete", "autofocus", "autoplay",
  "focusable", "href", "readonly",
  "tabindex",
];

const TECHNICAL_TERMS = [
  "CSS", "DOM", "GIF", "HTML", "HTTP", "HTTPS", "JSON", "LTR", "PDF",
  "RGB", "RTL", "SPA", "SVG", "URL", "VoiceOver", "WCAG",
  "WAI-ARIA", "ARIA",
];

let counter = 0;

function makePlaceholder(n) {
  return `ZZ${n}ZZ`;
}

const PLACEHOLDER_REGEX = /ZZ(\d+)ZZ/g;

function buildSortedTerms() {
  const allTerms = [
    ...HTML_ELEMENTS.map((e) => ({ term: e, kind: "element" })),
    ...HTML_ATTRIBUTES.map((a) => ({ term: a, kind: "attribute" })),
    ...TECHNICAL_TERMS.map((t) => ({ term: t, kind: "term" })),
  ];
  allTerms.sort((a, b) => b.term.length - a.term.length);
  return allTerms;
}

const PROTECTION_TERMS = buildSortedTerms();

const WCAG_CODE_REGEX = /\b(\d+\.\d+\.\d+)\b/g;
const TEMPLATE_VAR_REGEX = /\{[a-zA-Z]+\}/g;

/**
 * Replace technical terms with ZZnnZZ placeholders before translation.
 */
export function protectBeforeTranslate(text) {
  if (!text || typeof text !== "string") return { protected: text, restorationMap: [] };

  const restorationMap = [];
  let result = text;

  const templateMatches = [...result.matchAll(TEMPLATE_VAR_REGEX)];
  for (const match of templateMatches) {
    const placeholder = makePlaceholder(counter);
    restorationMap.push({ placeholder, original: match[0] });
    result = result.replace(match[0], placeholder);
    counter++;
  }

  const wcagMatches = [...result.matchAll(WCAG_CODE_REGEX)];
  for (const match of wcagMatches) {
    const placeholder = makePlaceholder(counter);
    restorationMap.push({ placeholder, original: match[0] });
    result = result.replace(match[0], placeholder);
    counter++;
  }

  for (const { term, kind } of PROTECTION_TERMS) {
    const flags = kind === "term" ? "g" : "gi";
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b${escaped}\\b`, flags);
    let m;
    while ((m = pattern.exec(result)) !== null) {
      if (result.slice(Math.max(0, m.index - 2), m.index).match(/ZZ$/)) {
        continue;
      }
      const matched = m[0];
      const placeholder = makePlaceholder(counter);
      restorationMap.push({ placeholder, original: matched });
      result = result.slice(0, m.index) + placeholder + result.slice(m.index + matched.length);
      counter++;
      pattern.lastIndex = m.index + placeholder.length;
    }
  }

  return { protected: result, restorationMap };
}

/**
 * Restore protected terms after translation.
 */
export function restoreAfterTranslate(text, restorationMap) {
  if (!text || typeof text !== "string") return text ?? "";
  if (!restorationMap || restorationMap.length === 0) return text;
  let result = text;
  for (const { placeholder, original } of restorationMap) {
    result = result.replaceAll(placeholder, original);
  }
  return result;
}

export { HTML_ELEMENTS, HTML_ATTRIBUTES, TECHNICAL_TERMS };
