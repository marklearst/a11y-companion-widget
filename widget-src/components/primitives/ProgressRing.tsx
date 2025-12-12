const { widget } = figma
const { SVG } = widget

import { ProgressBarProps } from 'types/index'

/**
 * Renders a circular progress ring showing completion status.
 *
 * @remarks
 * This component visually represents checklist progress in a circular format. Uses SVG for rendering.
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
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
export function ProgressRing({
  total,
  completed,
  size = 60,
  strokeWidth = 6,
  colors,
}: ProgressBarProps & { size?: number; strokeWidth?: number }) {
  const percentage = total === 0 ? 0 : (completed / total) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const trackColor = colors?.track ?? '#9299ce'
  const fillColor = colors?.fill ?? '#212a6a'

  const svgContent = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="${trackColor}"
        stroke-width="${strokeWidth}"
        opacity="0.2"
      />
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="${fillColor}"
        stroke-width="${strokeWidth}"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})"
      />
    </svg>
  `

  return <SVG src={svgContent} width={size} height={size} />
}

export default ProgressRing




