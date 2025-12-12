const { widget } = figma;
const { AutoLayout, Text } = widget;

import type { ContrastResult } from "hooks/useContrastChecker";

/**
 * Component for displaying contrast check results.
 *
 * @remarks
 * Shows contrast ratio, WCAG compliance, and suggestions.
 */
export function ContrastDisplay({
  result,
  onClose,
  colors,
}: {
  result: ContrastResult;
  onClose: () => void;
  colors?: {
    textPrimary: string;
    panelBg: string;
    success: string;
    warning: string;
    error: string;
  };
}) {
  const statusColor = result.passesAAA
    ? colors?.success ?? "#22C55E"
    : result.passesAA
    ? colors?.warning ?? "#EAB308"
    : colors?.error ?? "#EF4444";

  const statusText = result.passesAAA
    ? "AAA Compliant"
    : result.passesAA
    ? "AA Compliant"
    : "Fails WCAG";

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={20}
      width={460}
      fill={colors?.panelBg ?? "#FFFFFF"}
      cornerRadius={8}
      stroke={statusColor}
      strokeWidth={2}
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
          Contrast Check
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

      {/* Contrast Ratio Display */}
      <AutoLayout
        direction="vertical"
        spacing={8}
        width="fill-parent"
        padding={16}
        fill={statusColor}
        cornerRadius={8}
        opacity={0.1}
      >
        <Text
          fill={colors?.textPrimary ?? "#212A6A"}
          fontFamily="Anaheim"
          fontSize={48}
          fontWeight={700}
          horizontalAlignText="center"
          width="fill-parent"
        >
          {String(result.ratio)}:1
        </Text>
        <Text
          fill={statusColor}
          fontFamily="Anaheim"
          fontSize={16}
          fontWeight={700}
          horizontalAlignText="center"
          width="fill-parent"
        >
          {String(statusText)}
        </Text>
      </AutoLayout>

      {/* Color Swatches */}
      <AutoLayout direction="horizontal" spacing={12} width="fill-parent">
        <AutoLayout direction="vertical" spacing={4} width="fill-parent">
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={10}
            fontFamily="Anaheim"
            fontWeight={600}
            opacity={0.6}
          >
            FOREGROUND
          </Text>
          <AutoLayout
            width={60}
            height={40}
            fill={result.foreground}
            cornerRadius={4}
            stroke={colors?.textPrimary ?? "#212A6A"}
            strokeWidth={1}
          />
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={11}
            fontFamily="Inter"
            fontWeight={500}
          >
            {String(result.foreground || "#000000")}
          </Text>
        </AutoLayout>
        <AutoLayout direction="vertical" spacing={4} width="fill-parent">
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={10}
            fontFamily="Anaheim"
            fontWeight={600}
            opacity={0.6}
          >
            BACKGROUND
          </Text>
          <AutoLayout
            width={60}
            height={40}
            fill={result.background}
            cornerRadius={4}
            stroke={colors?.textPrimary ?? "#212A6A"}
            strokeWidth={1}
          />
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={11}
            fontFamily="Inter"
            fontWeight={500}
          >
            {String(result.background || "#FFFFFF")}
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* WCAG Standards */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <AutoLayout direction="horizontal" spacing={8} width="fill-parent">
          <Text
            fill={
              result.passesAA ? statusColor : colors?.textPrimary ?? "#212A6A"
            }
            fontSize={12}
            fontFamily="Anaheim"
            fontWeight={600}
          >
            {result.passesAA ? "✓" : "✗"} WCAG AA (4.5:1)
          </Text>
        </AutoLayout>
        <AutoLayout direction="horizontal" spacing={8} width="fill-parent">
          <Text
            fill={
              result.passesAAA ? statusColor : colors?.textPrimary ?? "#212A6A"
            }
            fontSize={12}
            fontFamily="Anaheim"
            fontWeight={600}
          >
            {result.passesAAA ? "✓" : "✗"} WCAG AAA (7:1)
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Suggestion */}
      {result.suggestion && result.suggestion.length > 0 && (
        <AutoLayout
          padding={12}
          fill={colors?.textPrimary ?? "#212A6A"}
          opacity={0.05}
          cornerRadius={4}
          width="fill-parent"
        >
          <Text
            fill={colors?.textPrimary ?? "#212A6A"}
            fontSize={12}
            fontFamily="Anaheim"
            lineHeight="150%"
            width="fill-parent"
          >
            {String(result.suggestion || "")}
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

export default ContrastDisplay;
