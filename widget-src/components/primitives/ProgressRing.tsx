const { widget } = figma;
const { SVG } = widget;

/**
 * Props for the ProgressRing component.
 */
export interface ProgressRingProps {
  total: number;
  completed: number;
  size?: number;
  strokeWidth?: number;
  colors?: { track: string; fill: string };
}

/**
 * Renders a circular progress ring showing completion status with percentage.
 *
 * @remarks
 * This component visually represents checklist progress in a circular format with percentage text in center.
 * Uses SVG with embedded text for reliable rendering in Figma widgets.
 *
 * @param total - The total number of tasks.
 * @param completed - The number of completed tasks.
 * @param size - The size of the ring in pixels (default: 60).
 * @param strokeWidth - The width of the stroke (default: 6).
 * @returns The rendered ProgressRing component.
 *
 * @example
 * ```ts
 * <ProgressRing total={10} completed={7} size={60} strokeWidth={6} />
 * ```
 */
export function ProgressRing({
  total,
  completed,
  size = 60,
  strokeWidth = 6,
  colors,
}: ProgressRingProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const trackColor = colors?.track ?? "#9299ce";
  const fillColor = colors?.fill ?? "#212a6a";

  const center = size / 2;
  const textSize = Math.max(12, Math.round(size * 0.22));
  const textY = center + textSize / 3; // Center text vertically in SVG

  // Create SVG with percentage text embedded directly in SVG for reliable rendering
  const svgContent = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><circle cx="${center}" cy="${center}" r="${Math.round(
    radius
  )}" fill="none" stroke="${trackColor}" stroke-width="${strokeWidth}" opacity="0.2"/><circle cx="${center}" cy="${center}" r="${Math.round(
    radius
  )}" fill="none" stroke="${fillColor}" stroke-width="${strokeWidth}" stroke-dasharray="${Math.round(
    circumference
  )}" stroke-dashoffset="${Math.round(
    offset
  )}" stroke-linecap="round" transform="rotate(-90 ${center} ${center})"/><text x="${center}" y="${textY}" font-family="Anaheim" font-size="${textSize}" font-weight="700" fill="${fillColor}" text-anchor="middle" dominant-baseline="middle">${percentage}%</text></svg>`;

  return <SVG src={svgContent} width={size} height={size} />;
}

export default ProgressRing;
