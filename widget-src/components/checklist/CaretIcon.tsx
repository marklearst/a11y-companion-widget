const { widget } = figma;
const { SVG } = widget;
import { defaultTheme } from "design-system";
import { buildCaretSvg } from "ui/icons";

/**
 * Presentational component for rendering a caret icon (open/closed).
 *
 * @param open - Whether the caret is open (down) or closed (right)
 * @returns The rendered caret SVG
 */
export function CaretIcon({
  open,
  color = defaultTheme.lightTheme.textSecondary,
  size = 14,
  strokeWidth = 2,
}: {
  open: boolean;
  color?: string;
  size?: number;
  strokeWidth?: number;
}) {
  const svgSrc = buildCaretSvg({ open, color, size, strokeWidth });
  return <SVG src={svgSrc} width={size} height={size} />;
}

export default CaretIcon;
