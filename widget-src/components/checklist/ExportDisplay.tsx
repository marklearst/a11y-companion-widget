const { widget } = figma
const { AutoLayout, Text, Input } = widget

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
}: {
  exportData: string
  onClose: () => void
  colors?: { textPrimary: string; panelBg: string }
}) {
  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={20}
      width={480}
      fill={colors?.panelBg ?? '#FFFFFF'}
      cornerRadius={8}>
      <Text
        fill={colors?.textPrimary ?? '#212A6A'}
        fontFamily="Anaheim"
        fontSize={16}
        fontWeight={700}>
        Export Progress
      </Text>
      <Text
        fill={colors?.textPrimary ?? '#212A6A'}
        fontSize={12}
        fontFamily="Anaheim"
        opacity={0.7}>
        Select and copy the JSON below:
      </Text>
      <Input
        value={exportData}
        onTextEditEnd={() => {}}
        width="fill-parent"
        fontSize={11}
        fontFamily="monospace"
        inputBehavior="multiline"
        fill={colors?.textPrimary ?? '#212A6A'}
      />
      <AutoLayout
        onClick={onClose}
        padding={{ vertical: 8, horizontal: 16 }}
        fill={colors?.textPrimary ?? '#212A6A'}
        cornerRadius={4}>
        <Text fill="#FFFFFF" fontSize={14} fontFamily="Anaheim" fontWeight={600}>
          Close
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}

export default ExportDisplay

