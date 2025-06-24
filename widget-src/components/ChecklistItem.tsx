const { widget } = figma
const { AutoLayout, Text } = widget

import Checkbox from 'shared/Checkbox'
import { ChecklistItemProps } from 'types/index'

/**
 * Renders a single checklist item row with a checkbox, text, and optional tooltip.
 *
 * @remarks
 * This component displays a checklist item with interactive completion and accessibility tooltip support. Uses Figma Widget API primitives for layout and interactivity.
 *
 * @param item - The checklist item data.
 * @param checked - The completion status of the item.
 * @param onCheckChange - Handler for completion status changes.
 * @param tooltipsEnabled - Whether tooltips are enabled for the item.
 * @returns The rendered ChecklistItem component.
 *
 * @example
 * ```ts
 * <ChecklistItem item={item} checked={checked} onCheckChange={handleCheckChange} tooltipsEnabled={true} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistItem({
  item,
  checked,
  onCheckChange,
  tooltipsEnabled,
}: ChecklistItemProps) {
  const { id, text, wcag, longDescription } = item

  const handleChange = () => {
    onCheckChange(id, !checked)
  }

  // Compose tooltip content
  let tooltipContent = ''
  if (wcag && longDescription) {
    tooltipContent = `WCAG: ${wcag}\n${longDescription}`
  } else if (wcag) {
    tooltipContent = `WCAG: ${wcag}`
  } else if (longDescription) {
    tooltipContent = longDescription
  } else {
    tooltipContent = text
  }

  return (
    <AutoLayout
      key={id}
      direction="horizontal"
      verticalAlignItems="start"
      spacing={14}
      padding={{ vertical: 10 }}
      width={520}
      onClick={handleChange}>
      <Checkbox checked={checked} />
      <Text
        name="TaskText"
        width="fill-parent"
        fill="#212A6A"
        lineHeight="150%"
        fontFamily="Anaheim"
        fontSize={17}
        fontWeight={600}
        tooltip={tooltipsEnabled ? tooltipContent : undefined}>
        {text}{' '}
        {wcag && (
          <Text
            fontSize={14}
            fill="#888"
            fontFamily="Anaheim"
            fontWeight={400}
            tooltip={`WCAG ${wcag}`}>
            {' '}
            {wcag}
          </Text>
        )}
      </Text>
    </AutoLayout>
  )
}

export default ChecklistItem
