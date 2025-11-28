const { widget } = figma
const { Text } = widget

/**
 * Presentational component for rendering a WCAG tag/badge.
 *
 * @param wcag - The WCAG code to display
 * @returns The rendered badge component
 */
export function WcagBadge({ wcag, color }: { wcag: string; color?: string }) {
  return (
    <Text
      name="WcagBadge"
      fontSize={33}
      fontWeight={600}
  fill={color ?? '#9299CE'}
      fontFamily="Anaheim"
      horizontalAlignText="center"
      // verticalAlignText="middle"/
      lineHeight="120%"
      letterSpacing={0.5}
      width={152}
      height={20}
      // cornerRadius={5}
      stroke="#9299CE"
      strokeWidth={1}
      // padding={{ vertical: 2, horizontal: 8 }}
      // style={{ display: 'inline-block', marginLeft: 4 }}
  tooltip={`WCAG ${wcag}`}>
  {wcag}
    </Text>
  )
}

export default WcagBadge
