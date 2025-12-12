const { widget } = figma;
const { AutoLayout, Text } = widget;

import { Checkbox } from "components/primitives";
import { ChecklistItemProps } from "types/index";
import WcagBadge from "components/checklist/WcagBadge";

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
  textColor,
  checkboxColors,
  badgeColor,
}: ChecklistItemProps) {
  const { id, text, wcag, longDescription } = item;

  const handleChange = () => onCheckChange(id, !checked);

  // Compose tooltip content
  let tooltipContent = "";
  if (wcag && longDescription) {
    tooltipContent = `WCAG: ${wcag}\n${longDescription}`;
  } else if (wcag) {
    tooltipContent = `WCAG: ${wcag}`;
  } else if (longDescription) {
    tooltipContent = longDescription;
  } else {
    tooltipContent = text;
  }

  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="start"
      spacing={14}
      padding={{ vertical: 10 }}
      width="fill-parent"
    >
      <AutoLayout onClick={handleChange}>
        <Checkbox checked={checked} colors={checkboxColors} />
      </AutoLayout>
      <AutoLayout
        direction="vertical"
        spacing={6}
        width="fill-parent"
        onClick={handleChange}
      >
        <Text
          name="TaskText"
          width="fill-parent"
          fill={textColor ?? "#212A6A"}
          lineHeight="150%"
          fontFamily="Anaheim"
          fontSize={17}
          fontWeight={600}
          tooltip={tooltipsEnabled ? tooltipContent : undefined}
        >
          {text}
        </Text>
        {wcag && <WcagBadge wcag={wcag} color={badgeColor} />}
      </AutoLayout>
    </AutoLayout>
  );
}

export default ChecklistItem;
