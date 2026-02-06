const { widget } = figma
const { AutoLayout, SVG } = widget

import { CheckboxProps } from "types/index";
import { defaultTheme, sizes as dsSizes, radius as dsRadius } from "design-system";

/**
 * Renders a checkbox UI element with an optional checkmark.
 *
 * @remarks
 * This component provides a styled checkbox for use in the widget UI. Uses Figma Widget API primitives for layout and SVG rendering.
 *
 * @param checked - Whether the checkbox is checked.
 * @returns The rendered Checkbox component.
 *
 * @example
 * ```ts
 * <Checkbox checked={true} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const Checkbox = ({ checked, colors, size, strokeWidth, radius }: CheckboxProps) => {
  const bgChecked =
    colors?.bgChecked ?? defaultTheme.lightTheme.checkboxBgChecked;
  const bgUnchecked =
    colors?.bgUnchecked ?? defaultTheme.lightTheme.checkboxBgUnchecked;
  const strokeColor =
    colors?.stroke ?? defaultTheme.lightTheme.checkboxStroke;
  const resolvedSize = size ?? dsSizes.checkbox.width
  const resolvedStrokeWidth = strokeWidth ?? 3
  const resolvedRadius = radius ?? dsRadius.md
  const checkmarkColor =
    colors?.checkmark ?? defaultTheme.lightTheme.panelBg

  return (
    <AutoLayout
      name="Checkbox"
      fill={checked ? bgChecked : bgUnchecked}
      stroke={strokeColor}
      strokeWidth={resolvedStrokeWidth}
      cornerRadius={resolvedRadius}
      overflow="visible"
      width={resolvedSize}
      height={resolvedSize}
      verticalAlignItems="center"
      horizontalAlignItems="center">
    {checked && (
      <SVG
        name="checkmark"
        x={{
          type: 'center',
          offset: 0,
        }}
        y={{
          type: 'center',
          offset: 0,
        }}
        src={`<svg width='10' height='8' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 1L4 6.5L1 4' stroke='${checkmarkColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`}
      />
    )}
  </AutoLayout>
)}


export default Checkbox
