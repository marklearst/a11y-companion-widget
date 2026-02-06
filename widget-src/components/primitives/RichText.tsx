import { parseInlineMarkup, type StyleState } from "logic/inlineMarkup";

const { widget } = figma;
const { Text, Span } = widget;

type InlineStyle = {
  fontFamily?: string;
  fontWeight?: WidgetJSX.FontWeight;
  fill?: string;
  italic?: boolean;
  textDecoration?: "none" | "underline" | "strikethrough";
};

type InlineStyles = {
  code: InlineStyle;
  kbd: InlineStyle;
  strong: InlineStyle;
  em: InlineStyle;
  link: InlineStyle;
};

function styleFromState(state: StyleState, inline: InlineStyles): InlineStyle {
  let style: InlineStyle = {};
  if (state.code) style = { ...style, ...inline.code };
  if (state.kbd) style = { ...style, ...inline.kbd };
  if (state.strong) style = { ...style, ...inline.strong };
  if (state.em) style = { ...style, ...inline.em };
  if (state.href) style = { ...style, ...inline.link };
  return style;
}

export function RichText({
  text,
  inlineStyles,
  fill,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  width,
}: {
  text: string;
  inlineStyles: InlineStyles;
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: WidgetJSX.FontWeight;
  lineHeight: number | string;
  width?: WidgetJSX.Size;
}) {
  const segments = parseInlineMarkup(text);
  if (segments.length === 0) {
    return (
      <Text
        width={width}
        fill={fill}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
      >
        {text}
      </Text>
    );
  }

  return (
    <Text
      width={width}
      fill={fill}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {segments.map((segment, index) => {
        const overrides = styleFromState(segment.state, inlineStyles);
        const href = segment.state.href;
        const spanProps: WidgetJSX.SpanProps & { key?: string | number } = {
          key: `${segment.text}-${index}`,
        };
        if (overrides.fill !== undefined) {
          spanProps.fill = overrides.fill;
        }
        if (overrides.fontFamily !== undefined) {
          spanProps.fontFamily = overrides.fontFamily;
        }
        if (overrides.fontWeight !== undefined) {
          spanProps.fontWeight = overrides.fontWeight;
        }
        if (overrides.italic !== undefined) {
          spanProps.italic = overrides.italic;
        }
        if (overrides.textDecoration !== undefined) {
          spanProps.textDecoration = overrides.textDecoration;
        }
        if (href) {
          spanProps.href = href;
        }
        return <Span {...spanProps}>{segment.text}</Span>;
      })}
    </Text>
  );
}

export default RichText;
