const { widget } = figma
const { AutoLayout, SVG } = widget

import { CheckboxProps } from "types/index";
import { defaultTheme } from "design-system/theme/default";
import { primitiveComponentVariables } from "design-system/components/primitives";
import { buildCheckmarkSvg } from "ui/icons";

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
  const resolvedSize = size ?? primitiveComponentVariables.checkbox.size
  const resolvedStrokeWidth =
    strokeWidth ?? primitiveComponentVariables.checkbox.strokeWidth
  const resolvedRadius = radius ?? primitiveComponentVariables.checkbox.radius
  const checkmarkWidth = primitiveComponentVariables.checkbox.checkmark.width
  const checkmarkHeight = primitiveComponentVariables.checkbox.checkmark.height
  const checkmarkStrokeWidth =
    primitiveComponentVariables.checkbox.checkmark.strokeWidth
  const checkmarkColor =
    colors?.checkmark ?? defaultTheme.lightTheme.panelBg
  const checkmarkSvg = buildCheckmarkSvg({
    color: checkmarkColor,
    width: checkmarkWidth,
    height: checkmarkHeight,
    strokeWidth: checkmarkStrokeWidth,
  });

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
        src={checkmarkSvg}
      />
    )}
  </AutoLayout>
)}


export default Checkbox
