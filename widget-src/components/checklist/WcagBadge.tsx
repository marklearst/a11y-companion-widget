const { widget } = figma;
const { Text, AutoLayout } = widget;

/**
 * Maps WCAG codes to their W3C documentation URLs
 */
function getWcagUrl(wcag: string): string {
  // Extract the number from WCAG code (e.g., "4.1.1 Parsing" -> "4.1.1")
  const match = wcag.match(/(\d+\.\d+\.\d+)/);
  if (!match) return "";

  const code = match[1];
  // Convert to URL format: 4.1.1 -> understanding/parsing.html
  const codeMap: Record<string, string> = {
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

  const slug = codeMap[code] || code.toLowerCase().replace(/\./g, "-");
  return `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`;
}

/**
 * Presentational component for rendering a WCAG tag/badge.
 *
 * @param wcag - The WCAG code to display
 * @returns The rendered badge component
 */
export function WcagBadge({ wcag, color }: { wcag: string; color?: string }) {
  const wcagUrl = getWcagUrl(wcag);

  return (
    <AutoLayout
      onClick={wcagUrl ? () => figma.openExternal(wcagUrl) : undefined}
      tooltip={
        wcagUrl ? `Click to view WCAG ${wcag} documentation` : `WCAG ${wcag}`
      }
      padding={{ horizontal: 4, vertical: 2 }}
      cornerRadius={4}
      fill={wcagUrl ? color ?? "#9299CE" : undefined}
      opacity={wcagUrl ? 0.1 : 1}
    >
      <Text
        name="WcagBadge"
        fontSize={11}
        fontWeight={600}
        fill={color ?? "#9299CE"}
        fontFamily="Anaheim"
        horizontalAlignText="center"
        lineHeight="120%"
        letterSpacing={0.5}
        tooltip={wcagUrl ? `Click to view: ${wcagUrl}` : `WCAG ${wcag}`}
      >
        {wcag}
      </Text>
    </AutoLayout>
  );
}

export default WcagBadge;
