const { widget } = figma;
const { AutoLayout, Text, Input } = widget;
import { createOverlayVariables, defaultTheme, type OverlayVariables } from "design-system";

/**
 * Component for displaying export data that users can copy.
 *
 * @remarks
 * Shows the exported JSON data in a text input that users can select and copy.
 *
 * @param exportData - The JSON string to display
 * @param onClose - Callback to close the export display
 */
export function ExportDisplay({
  exportData,
  onClose,
  colors,
  ui,
}: {
  exportData: string;
  onClose: () => void;
  colors?: { textPrimary: string; panelBg: string };
  ui?: OverlayVariables;
}) {
  const fallback = defaultTheme.lightTheme;
  const uiTokens =
    ui ??
    createOverlayVariables({
      panelBg: colors?.panelBg ?? fallback.panelBg,
      panelStroke: fallback.panelStroke,
      textPrimary: colors?.textPrimary ?? fallback.textPrimary,
      textSecondary: fallback.textSecondary,
      textStrong: fallback.textStrong,
      progressFill: colors?.textPrimary ?? fallback.progressFill,
    });
  const palette = {
    textPrimary: colors?.textPrimary ?? uiTokens.colors.textPrimary,
    panelBg: colors?.panelBg ?? uiTokens.colors.panelBg,
    buttonBg: colors?.textPrimary ?? uiTokens.colors.buttonBg,
    buttonText: uiTokens.colors.buttonText,
  };
  return (
    <AutoLayout
      direction="vertical"
      spacing={uiTokens.layout.spacing}
      padding={uiTokens.layout.padding}
      width="fill-parent"
      fill={palette.panelBg}
      cornerRadius={uiTokens.layout.radius}
    >
      <Text
        fill={palette.textPrimary}
        fontFamily={uiTokens.text.title.fontFamily}
        fontSize={uiTokens.text.title.fontSize}
        fontWeight={uiTokens.text.title.fontWeight}
      >
        Export Progress
      </Text>
      <Text
        fill={palette.textPrimary}
        fontSize={uiTokens.text.helper.fontSize}
        fontFamily={uiTokens.text.helper.fontFamily}
        opacity={0.7}
      >
        Select and copy the JSON below:
      </Text>
      <Input
        value={exportData}
        onTextEditEnd={() => {}}
        width="fill-parent"
        fontSize={uiTokens.text.mono.fontSize}
        fontFamily={uiTokens.text.mono.fontFamily}
        inputBehavior="multiline"
        fill={palette.textPrimary}
      />
      <AutoLayout
        onClick={onClose}
        padding={{
          vertical: uiTokens.button.paddingY,
          horizontal: uiTokens.button.paddingX,
        }}
        fill={palette.buttonBg}
        cornerRadius={uiTokens.button.radius}
      >
        <Text
          fill={palette.buttonText}
          fontSize={uiTokens.text.body.fontSize}
          fontFamily={uiTokens.text.body.fontFamily}
          fontWeight={uiTokens.text.body.fontWeight}
        >
          Close
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

export default ExportDisplay;
