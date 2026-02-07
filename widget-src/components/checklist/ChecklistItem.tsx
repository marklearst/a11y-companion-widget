const { widget } = figma;
const { AutoLayout } = widget;

import { Checkbox, RichText } from "components/primitives";
import { ChecklistItemProps } from "types/index";
import WcagBadge from "components/checklist/WcagBadge";

/**
 * Renders a single checklist item row with a checkbox and text.
 *
 * @remarks
 * This component displays a checklist item with interactive completion. Uses Figma Widget API primitives for layout and interactivity.
 *
 * @param item - The checklist item data.
 * @param checked - The completion status of the item.
 * @param onCheckChange - Handler for completion status changes.
 * @returns The rendered ChecklistItem component.
 *
 * @example
 * ```ts
 * <ChecklistItem item={item} checked={checked} onCheckChange={handleCheckChange} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistItem({
  item,
  checked,
  onCheckChange,
  textColor,
  checkboxColors,
  ui,
  showDescription,
}: ChecklistItemProps) {
  const { id, text, wcag, level } = item;
  const itemFill = ui.colors.itemBg;

  const handleChange = () => onCheckChange(id, !checked);
  const resolvedCheckboxColors = {
    bgChecked: checkboxColors?.bgChecked ?? ui.colors.checkboxBgChecked,
    bgUnchecked: checkboxColors?.bgUnchecked ?? ui.colors.checkboxBgUnchecked,
    stroke: checkboxColors?.stroke ?? ui.colors.checkboxStroke,
    checkmark: checkboxColors?.checkmark ?? ui.colors.wcagBadgeText,
  };

  return (
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="start"
      spacing={ui.item.gap}
      padding={{
        vertical: ui.item.paddingY,
        horizontal: ui.item.paddingX,
      }}
      width="fill-parent"
      cornerRadius={ui.item.radius}
      {...(itemFill ? { fill: itemFill } : {})}
      onClick={handleChange}
      hoverStyle={{
        fill: ui.colors.hoverBg,
      }}
    >
      <AutoLayout padding={{ top: ui.checkbox.offsetY ?? 0 }}>
        <Checkbox
          checked={checked}
          colors={resolvedCheckboxColors}
          size={ui.checkbox.size}
          radius={ui.checkbox.radius}
          strokeWidth={ui.checkbox.strokeWidth}
        />
      </AutoLayout>
      <AutoLayout
        direction="vertical"
        spacing={ui.item.stackGap}
        width="fill-parent"
      >
        <RichText
          text={text}
          inlineStyles={ui.inline}
          width="fill-parent"
          fill={textColor ?? ui.colors.textPrimary}
          lineHeight={ui.item.text.lineHeight}
          fontFamily={ui.item.text.fontFamily}
          fontSize={ui.item.text.fontSize}
          fontWeight={ui.item.text.fontWeight}
        />
        {showDescription && item.longDescription ? (
          <RichText
            text={item.longDescription}
            inlineStyles={ui.inline}
            width="fill-parent"
            fill={ui.colors.textSecondary}
            lineHeight={ui.item.description.lineHeight}
            fontFamily={ui.item.description.fontFamily}
            fontSize={ui.item.description.fontSize}
            fontWeight={ui.item.description.fontWeight}
          />
        ) : null}
        {wcag && wcag.trim() ? (
          <WcagBadge
            wcag={wcag}
            level={level}
            textColor={ui.colors.wcagBadgeText}
            padding={{
              horizontal: ui.badge.paddingX,
              vertical: ui.badge.paddingY,
            }}
            radius={ui.badge.radius}
            fontFamily={ui.badge.fontFamily}
            fontSize={ui.badge.fontSize}
            fontWeight={ui.badge.fontWeight}
            iconSize={ui.badge.iconSize}
            iconStrokeWidth={ui.badge.iconStrokeWidth}
            iconColor={ui.colors.progressFill}
            strokeColor={ui.colors.panelStroke}
            strokeWidth={ui.badge.strokeWidth}
          />
        ) : null}
      </AutoLayout>
    </AutoLayout>
  );
}

export default ChecklistItem;
