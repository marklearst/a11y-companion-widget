const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

/**
 * Component for displaying copyable text in different formats.
 *
 * @remarks
 * Shows formatted text that users can select and copy.
 *
 * @param copyData - The formatted text to display
 * @param format - The format type (markdown, html, plaintext)
 * @param onClose - Callback to close the display
 */
export function CopyDisplay({
  copyData,
  format,
  onClose,
  colors,
}: {
  copyData: string;
  format: "markdown" | "html" | "plaintext";
  onClose: () => void;
  colors?: { textPrimary: string; panelBg: string; buttonBg: string };
}) {
  const formatLabels = {
    markdown: "Markdown",
    html: "HTML",
    plaintext: "Plain Text",
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={20}
      width="fill-parent"
      fill={colors?.panelBg ?? "#FFFFFF"}
      cornerRadius={8}
      effect={{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.15 },
        offset: { x: 0, y: 4 },
        blur: 12,
        spread: 0,
      }}
    >
      <AutoLayout
        direction="horizontal"
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text
          fill={colors?.textPrimary ?? "#212A6A"}
          fontFamily="Anaheim"
          fontSize={18}
          fontWeight={700}
        >
          {String("Copy as " + (formatLabels[format] || "Text"))}
        </Text>
        <AutoLayout width="fill-parent" />
        <AutoLayout
          onClick={onClose}
          padding={{ horizontal: 8, vertical: 4 }}
          cornerRadius={4}
          tooltip="Close"
        >
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={18}
            fontWeight={700}
            opacity={0.7}
          >
            ×
          </Text>
        </AutoLayout>
      </AutoLayout>
      <Text
        fill={colors?.textPrimary ?? "#212A6A"}
        fontSize={12}
        fontFamily="Anaheim"
        opacity={0.7}
      >
        Select and copy the text below:
      </Text>
      <Input
        value={copyData}
        onTextEditEnd={() => {}}
        width="fill-parent"
        fontSize={11}
        fontFamily="Inter"
        inputBehavior="multiline"
        fill={colors?.textPrimary ?? "#212A6A"}
      />
    </AutoLayout>
  );
}

export default CopyDisplay;
