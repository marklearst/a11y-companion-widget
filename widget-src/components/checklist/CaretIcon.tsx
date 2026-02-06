const { widget } = figma;
const { SVG } = widget;
import { defaultTheme } from "design-system";

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
  const svgSrc = open
    ? `<svg width='${size}' height='${size}' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 5L8 11L13 5' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round'/></svg>`
    : `<svg width='${size}' height='${size}' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 3L11 8L5 13' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
  return <SVG src={svgSrc} width={size} height={size} />;
}

export default CaretIcon;
