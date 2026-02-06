import {
  gap as dsGap,
  defaultTheme,
  fontFamily as dsFontFamily,
} from "design-system";
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
  const resolvedIconColor =
    iconColor ?? textColor ?? defaultTheme.lightTheme.wcagBadgeText;
  const resolvedIconSize = iconSize ?? 14;
  const hoverTextColor = iconColor ?? resolvedIconColor;
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${resolvedIconSize}" height="${resolvedIconSize}" viewBox="0 0 24 24" fill="none"><path fill="${resolvedIconColor}" d="M 16.025391 2 C 14.429391 2 12.928781 2.622 11.800781 3.75 L 9.6894531 5.859375 C 9.2014531 6.347375 9.2014531 7.1399062 9.6894531 7.6289062 C 10.177453 8.1179063 10.968031 8.1169062 11.457031 7.6289062 L 13.568359 5.5175781 C 14.880359 4.2055781 17.169422 4.2055781 18.482422 5.5175781 C 19.139422 6.1735781 19.5 7.0466094 19.5 7.9746094 C 19.5 8.9026094 19.139422 9.7756406 18.482422 10.431641 L 16.371094 12.542969 C 15.883094 13.030969 15.883094 13.821547 16.371094 14.310547 C 16.615094 14.554547 16.935859 14.675781 17.255859 14.675781 C 17.575859 14.675781 17.896625 14.554547 18.140625 14.310547 L 20.25 12.199219 C 21.378 11.070219 22 9.5706094 22 7.9746094 C 22 6.3786094 21.378 4.878 20.25 3.75 C 19.122 2.622 17.621391 2 16.025391 2 z M 14.75 8 C 14.43 8.000125 14.109234 8.1212344 13.865234 8.3652344 L 8.3652344 13.865234 C 7.8772344 14.353234 7.8772344 15.145766 8.3652344 15.634766 C 8.6092344 15.878766 8.93 16 9.25 16 C 9.57 16 9.8907656 15.878766 10.134766 15.634766 L 15.634766 10.134766 C 16.122766 9.6467656 16.122766 8.8542344 15.634766 8.3652344 C 15.390766 8.1207344 15.07 7.999875 14.75 8 z M 6.7402344 9.328125 C 6.4203594 9.32825 6.0999688 9.4493594 5.8554688 9.6933594 L 3.75 11.800781 C 2.622 12.928781 2 14.429391 2 16.025391 C 2 17.621391 2.622 19.121 3.75 20.25 C 4.878 21.379 6.3786094 22 7.9746094 22 C 9.5706094 22 11.071219 21.378 12.199219 20.25 L 14.306641 18.144531 C 14.794641 17.656531 14.794641 16.865953 14.306641 16.376953 C 13.818641 15.887953 13.025109 15.888953 12.537109 16.376953 L 10.431641 18.482422 C 9.1196406 19.794422 6.8295781 19.794422 5.5175781 18.482422 C 4.8605781 17.826422 4.5 16.954391 4.5 16.025391 C 4.5 15.096391 4.8605781 14.224359 5.5175781 13.568359 L 7.6230469 11.462891 C 8.1110469 10.974891 8.1110469 10.182359 7.6230469 9.6933594 C 7.3790469 9.4488594 7.0601094 9.328 6.7402344 9.328125 z"/></svg>`;

  return (
    <AutoLayout
      onClick={wcagUrl ? () => figma.openExternal(wcagUrl) : undefined}
    >
      <AutoLayout
        direction="horizontal"
        spacing={dsGap.tight}
        verticalAlignItems="center"
        padding={{
          horizontal: padding?.horizontal ?? 8,
          vertical: padding?.vertical ?? 4,
        }}
        cornerRadius={radius ?? 6}
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
          fontSize={fontSize ?? 12}
          fontWeight={fontWeight ?? 600}
          fill={textColor ?? defaultTheme.lightTheme.wcagBadgeText}
          fontFamily={fontFamily ?? dsFontFamily.sans}
          horizontalAlignText="center"
          lineHeight="140%"
          letterSpacing={0.2}
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
