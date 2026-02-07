const CARET_DOWN_PATH = "M3 5L8 11L13 5";
const CARET_RIGHT_PATH = "M5 3L11 8L5 13";

type BuildCaretSvgOptions = {
  open: boolean;
  color: string;
  size: number;
  strokeWidth: number;
};

export function buildCaretSvg({
  open,
  color,
  size,
  strokeWidth,
}: BuildCaretSvgOptions): string {
  const path = open ? CARET_DOWN_PATH : CARET_RIGHT_PATH;
  return `<svg width='${size}' height='${size}' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='${path}' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
}
