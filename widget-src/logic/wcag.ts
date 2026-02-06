/**
 * WCAG helpers for mapping checklist codes to W3C documentation.
 */
const WCAG_CODE_MAP: Record<string, string> = {
  "4.1.1": "parsing",
  "3.1.1": "language-of-page",
  "2.4.2": "page-titled",
  "1.4.4": "resize-text",
  "4.1.2": "name-role-value",
  "2.4.3": "focus-order",
  "2.2.1": "timing-adjustable",
  "2.4.7": "focus-visible",
  "1.3.2": "meaningful-sequence",
  "1.1.1": "non-text-content",
  "2.4.6": "headings-or-labels",
  "1.3.1": "info-and-relationships",
  "1.4.1": "use-of-color",
  "2.4.1": "bypass-blocks",
  "3.2.2": "on-input",
  "1.3.5": "identify-input-purpose",
  "3.3.1": "error-identification",
  "1.4.2": "audio-control",
  "2.1.1": "keyboard",
  "1.2.2": "captions",
  "2.3.1": "three-flashes-or-below-threshold",
  "1.4.3": "contrast-minimum",
  "1.4.8": "visual-presentation",
  "1.3.3": "sensory-characteristics",
  "1.4.10": "reflow",
  "2.2.2": "pause-stop-hide",
  "2.3.3": "animation-from-interactions",
  "1.4.11": "non-text-contrast",
  "1.3.4": "orientation",
  "2.5.5": "target-size",
  "3.1.5": "reading-level",
};

export function getWcagUrl(wcag: string): string {
  const match = wcag.match(/(\d+\.\d+\.\d+)/);
  if (!match) return "";
  const code = match[1];
  const slug = WCAG_CODE_MAP[code] || code.toLowerCase().replace(/\./g, "-");
  return `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`;
}
