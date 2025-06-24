const { widget } = figma
const { SVG } = widget

/**
 * Presentational component for rendering a caret icon (open/closed).
 *
 * @param open - Whether the caret is open (down) or closed (right)
 * @returns The rendered caret SVG
 */
export function CaretIcon({ open }: { open: boolean }) {
  const svgSrc = open
    ? "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 5L8 11L13 5' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
    : "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 3L11 8L5 13' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  return <SVG src={svgSrc} width={16} height={16} />
}

export default CaretIcon;
