const { widget } = figma;
const { AutoLayout, Text, Input } = widget;
import { createOverlayTokens, defaultTheme, type OverlayTokens } from "design-system";
import { dropShadowEffect } from "effects";

/**
 * Component for displaying copyable text in different formats.
 *
 * @remarks
 * Shows formatted text that users can select and copy.
 *
 * @param copyData - The formatted text to display
 * @param format - The format type (markdown)
 * @param onClose - Callback to close the display
 */
export function CopyDisplay({
  copyData,
  format,
  onClose,
  colors,
  ui,
  labels,
}: {
  copyData: string;
  format: "markdown";
  onClose: () => void;
  colors?: { textPrimary: string; panelBg: string; buttonBg: string };
  ui?: OverlayTokens;
  labels?: { copyAs: string; instruction: string };
}) {
  const fallback = defaultTheme.lightTheme;
  const uiTokens =
    ui ??
    createOverlayTokens({
      panelBg: colors?.panelBg ?? fallback.panelBg,
      panelStroke: fallback.panelStroke,
      textPrimary: colors?.textPrimary ?? fallback.textPrimary,
      textSecondary: fallback.textSecondary,
      textStrong: fallback.textStrong,
      progressFill: colors?.buttonBg ?? fallback.progressFill,
    });
  const palette = {
    textPrimary: colors?.textPrimary ?? uiTokens.colors.textPrimary,
    panelBg: colors?.panelBg ?? uiTokens.colors.panelBg,
    buttonBg: colors?.buttonBg ?? uiTokens.colors.buttonBg,
  };
  const formatLabels = {
    markdown: "Markdown",
  };

  const copyAsLabel = labels?.copyAs ?? "Copy as";
  const instructionLabel = labels?.instruction ?? "Select and copy the text below:";

  return (
    <AutoLayout
      direction="vertical"
      spacing={uiTokens.layout.spacing}
      padding={uiTokens.layout.padding}
      width={"fill-parent"}
      fill={palette.panelBg}
      cornerRadius={uiTokens.layout.radius}
      effect={dropShadowEffect}
    >
      <AutoLayout
        direction="horizontal"
        width="fill-parent"
        verticalAlignItems="center"
      >
        <Text
          fill={palette.textPrimary}
          fontFamily={uiTokens.text.title.fontFamily}
          fontSize={uiTokens.text.title.fontSize}
          fontWeight={uiTokens.text.title.fontWeight}
        >
          {String(copyAsLabel + " " + (formatLabels[format] || "Text"))}
        </Text>
        <AutoLayout width="fill-parent" height={16} />
        <AutoLayout
          onClick={onClose}
          padding={{
            horizontal: uiTokens.layout.closePaddingX,
            vertical: uiTokens.layout.closePaddingY,
          }}
          cornerRadius={uiTokens.layout.closeRadius}
        >
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.title.fontSize}
            fontWeight={uiTokens.text.title.fontWeight}
            opacity={0.7}
          >
            ×
          </Text>
        </AutoLayout>
      </AutoLayout>
      <Text
        fill={palette.textPrimary}
        fontSize={uiTokens.text.helper.fontSize}
        fontFamily={uiTokens.text.helper.fontFamily}
        opacity={0.7}
      >
        {instructionLabel}
      </Text>
      <Input
        value={copyData}
        onTextEditEnd={() => {}}
        width="fill-parent"
        fontSize={uiTokens.text.mono.fontSize}
        fontFamily={uiTokens.text.mono.fontFamily}
        inputBehavior="multiline"
        fill={palette.textPrimary}
      />
    </AutoLayout>
  );
}

export default CopyDisplay;
