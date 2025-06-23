const { widget } = figma
const { AutoLayout, Text } = widget

import Checkbox from '../shared/Checkbox'
import { ChecklistItemType } from '../types'

/**
 * Defines the props for the ReviewItem component.
 *
 * @interface ReviewItemProps
 * @property {ChecklistItemType} item - The checklist item object containing the data to be displayed.
 * @property {boolean} checked - The completion status of the item.
 * @property {(taskId: string, isChecked: boolean) => void} onCheckChange - A function to handle changes to the completion status of the item.
 * @property {boolean} tooltipsEnabled - Whether tooltips are enabled for the item.
 */
/**
 * Props for the review item component.
 *
 * @remarks
 * Used to render and manage a single checklist item's state and UI, including tooltip logic.
 */
interface ReviewItemProps {
  /** The checklist item data. */
  item: ChecklistItemType
  /** Whether the item is checked. */
  checked: boolean
  /** Handler for changes to the completion status. */
  onCheckChange: (taskId: string, isChecked: boolean) => void
  /** Whether tooltips are enabled for the item. */
  tooltipsEnabled: boolean
}

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
 * @returns The rendered ReviewItem component.
 *
 * @example
 * ```ts
 * <ReviewItem item={item} checked={checked} onCheckChange={handleCheckChange} tooltipsEnabled={true} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ReviewItem({
  item,
  checked,
  onCheckChange,
  tooltipsEnabled,
}: ReviewItemProps) {
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

export default ReviewItem
