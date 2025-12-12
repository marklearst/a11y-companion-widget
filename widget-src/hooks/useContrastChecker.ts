/**
 * Hook for checking color contrast from Figma selections.
 *
 * @remarks
 * Reads selected elements and calculates WCAG contrast ratios.
 *
 * @since 1.2.0
 */
const { widget } = figma;
const { useSyncedState } = widget;

export interface ContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  foreground: string;
  background: string;
  suggestion?: string;
}

/**
 * Calculates relative luminance for a color.
 */
function getLuminance(r: number, g: number, b: number): number {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates contrast ratio between two colors.
 */
function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getLuminance(color1.r * 255, color1.g * 255, color1.b * 255);
  const lum2 = getLuminance(color2.r * 255, color2.g * 255, color2.b * 255);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Extracts solid color from Paint object.
 */
function extractColor(
  paint: Paint | readonly Paint[] | typeof figma.mixed
): RGB | null {
  if (!paint || paint === figma.mixed) return null;

  const paints = Array.isArray(paint) ? paint : [paint];
  const solidPaint = paints.find(
    (p) => p.type === "SOLID" && p.visible !== false
  ) as SolidPaint | undefined;

  if (!solidPaint) return null;
  return solidPaint.color;
}

/**
 * Formats RGB color to hex string.
 */
function rgbToHex(color: RGB): string {
  const r = Math.round(color.r * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(color.g * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(color.b * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

/**
 * Hook that provides contrast checking functionality.
 */
export function useContrastChecker() {
  const [contrastResult, setContrastResult] =
    useSyncedState<ContrastResult | null>("contrastResult", null);
  const [isChecking, setIsChecking] = useSyncedState("isChecking", false);

  /**
   * Checks contrast for currently selected elements.
   */
  const checkSelection = () => {
    try {
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        setContrastResult(null);
        return;
      }

      // Get first selected node
      const node = selection[0];

      // Try to extract foreground and background colors
      let foregroundColor: RGB | null = null;
      let backgroundColor: RGB | null = null;

      // Check if node has fills (text or shape)
      if ("fills" in node) {
        foregroundColor = extractColor(node.fills);
      }

      // Try to find background from parent or node itself
      if ("parent" in node && node.parent && "fills" in node.parent) {
        backgroundColor = extractColor(node.parent.fills);
      } else if ("fills" in node && node.type === "FRAME") {
        backgroundColor = extractColor(node.fills);
      }

      // If we have both colors, calculate contrast
      if (foregroundColor && backgroundColor) {
        const ratio = getContrastRatio(foregroundColor, backgroundColor);
        const passesAA = ratio >= 4.5;
        const passesAAA = ratio >= 7.0;

        let suggestion = "";
        if (!passesAA) {
          suggestion =
            "Contrast too low. Increase difference between colors to meet WCAG AA (4.5:1).";
        } else if (!passesAAA) {
          suggestion =
            "Meets AA standard. Consider increasing contrast for AAA (7:1) compliance.";
        }

        setContrastResult({
          ratio: Math.round(ratio * 100) / 100,
          passesAA,
          passesAAA,
          foreground: rgbToHex(foregroundColor),
          background: rgbToHex(backgroundColor),
          suggestion,
        });
      } else {
        setContrastResult(null);
      }
    } catch (error) {
      console.error("Error checking contrast:", error);
      setContrastResult(null);
    }
  };

  /**
   * Clears the contrast result.
   */
  const clearResult = () => {
    setContrastResult(null);
    setIsChecking(false);
  };

  return {
    contrastResult,
    isChecking,
    checkSelection,
    clearResult,
    setIsChecking,
  };
}
