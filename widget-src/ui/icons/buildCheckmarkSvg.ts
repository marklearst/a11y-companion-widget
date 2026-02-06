const CHECKMARK_PATH = "M9 1L4 6.5L1 4";

type BuildCheckmarkSvgOptions = {
  color: string;
  width: number;
  height: number;
  strokeWidth: number;
};

export function buildCheckmarkSvg({
  color,
  width,
  height,
  strokeWidth,
}: BuildCheckmarkSvgOptions): string {
  return `<svg width='${width}' height='${height}' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='${CHECKMARK_PATH}' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round'/></svg>`;
}
