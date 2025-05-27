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
interface ReviewItemProps {
  item: ChecklistItemType
  checked: boolean
  onCheckChange: (taskId: string, isChecked: boolean) => void
  tooltipsEnabled: boolean
}

/**
 * Renders a single checklist item component.
 *
 * @param {ReviewItemProps} props - The props for the ReviewItem component.
 * @param {ChecklistItemType} props.item - The checklist item object containing the data to be displayed.
 * @param {boolean} props.checked - The completion status of the item.
 * @param {(taskId: string, isChecked: boolean) => void} props.onCheckChange - A function to handle changes to the completion status of the item.
 * @param {boolean} props.tooltipsEnabled - Whether tooltips are enabled for the item.
 * @returns {JSX.Element} The rendered ReviewItem component.
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
