import { defaultTheme } from "design-system/theme/default";
import { primitiveComponentVariables } from "design-system/components/primitives";
import { buildWcagLinkSvg } from "ui/icons";
import type { WCAGLevel } from "types";
import { getWcagUrl } from "logic/wcag";
const { widget } = figma;
const { Text, AutoLayout, SVG } = widget;

/**
 * Presentational component for rendering a WCAG tag/badge.
 *
 * @param wcag - The WCAG code to display
 * @returns The rendered badge component
 */
export function WcagBadge({
  wcag,
  level,
  textColor,
  padding,
  radius,
  fontFamily,
  fontSize,
  fontWeight,
  iconSize,
  iconStrokeWidth: _iconStrokeWidth,
  iconColor,
}: // strokeColor,
// strokeWidth,
{
  wcag: string;
  level?: WCAGLevel | string | null;
  textColor?: string;
  padding?: { horizontal: number; vertical: number };
  radius?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: WidgetJSX.FontWeight;
  iconSize?: number;
  iconStrokeWidth?: number;
  iconColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}) {
  const wcagUrl = getWcagUrl(wcag);
  const badgeLabel = level ? `${wcag} (${level})` : wcag;
  const badgeVariables = primitiveComponentVariables.wcagBadge;
  const resolvedIconColor =
    iconColor ?? textColor ?? defaultTheme.lightTheme.wcagBadgeText;
  const resolvedIconSize = iconSize ?? badgeVariables.iconSize;
  const hoverTextColor = iconColor ?? resolvedIconColor;
  const iconSvg = buildWcagLinkSvg({
    fill: resolvedIconColor,
    size: resolvedIconSize,
  });

  return (
    <AutoLayout
      onClick={wcagUrl ? () => figma.openExternal(wcagUrl) : undefined}
    >
      <AutoLayout
        direction="horizontal"
        spacing={badgeVariables.gap}
        verticalAlignItems="center"
        padding={{
          horizontal: padding?.horizontal ?? badgeVariables.paddingX,
          vertical: padding?.vertical ?? badgeVariables.paddingY,
        }}
        cornerRadius={radius ?? badgeVariables.radius}
      >
        {wcagUrl ? (
          <SVG
            src={iconSvg}
            width={resolvedIconSize}
            height={resolvedIconSize}
          />
        ) : null}
        <Text
          name="WcagBadge"
          fontSize={fontSize ?? badgeVariables.fontSize}
          fontWeight={fontWeight ?? badgeVariables.fontWeight}
          fill={textColor ?? defaultTheme.lightTheme.wcagBadgeText}
          fontFamily={fontFamily ?? badgeVariables.fontFamily}
          horizontalAlignText="center"
          lineHeight={badgeVariables.lineHeight}
          letterSpacing={badgeVariables.letterSpacing}
          textDecoration="none"
          hoverStyle={wcagUrl ? { fill: hoverTextColor } : undefined}
          onClick={wcagUrl ? () => figma.openExternal(wcagUrl) : undefined}
        >
          {badgeLabel}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

export default WcagBadge;
