const { widget } = figma;
const { AutoLayout, Text } = widget;
import { createOverlayTokens, defaultTheme, type OverlayTokens } from "design-system";
import { containerWidths } from "design-system/primitives/sizing";
import { dropShadowEffect } from "effects";

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
  ui,
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
  ui?: OverlayTokens;
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
      progressFill: fallback.progressFill,
    });
  const palette = {
    textPrimary: colors?.textPrimary ?? uiTokens.colors.textPrimary,
    panelBg: colors?.panelBg ?? uiTokens.colors.panelBg,
  };
  const statusColor = result.passesAAA
    ? colors?.success ?? defaultTheme.semantic.success.medium
    : result.passesAA
    ? colors?.warning ?? defaultTheme.semantic.warning.medium
    : colors?.error ?? defaultTheme.semantic.error.medium;

  const statusText = result.passesAAA
    ? "AAA Compliant"
    : result.passesAA
    ? "AA Compliant"
    : "Fails WCAG";

  return (
    <AutoLayout
      direction="vertical"
      spacing={uiTokens.layout.spacing}
      padding={uiTokens.layout.padding}
      width={containerWidths.md}
      fill={palette.panelBg}
      cornerRadius={uiTokens.layout.radius}
      stroke={statusColor}
      strokeWidth={uiTokens.layout.outlineWidth}
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
          Contrast Check
        </Text>
        <AutoLayout width="fill-parent" />
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

      {/* Contrast Ratio Display */}
      <AutoLayout
        direction="vertical"
        spacing={uiTokens.layout.spacing}
        width="fill-parent"
        padding={uiTokens.layout.padding}
        fill={statusColor}
        cornerRadius={uiTokens.layout.radius}
        opacity={0.1}
      >
        <Text
          fill={palette.textPrimary}
          fontFamily={uiTokens.text.display.fontFamily}
          fontSize={uiTokens.text.display.fontSize}
          fontWeight={uiTokens.text.display.fontWeight}
          horizontalAlignText="center"
          width="fill-parent"
        >
          {String(result.ratio)}:1
        </Text>
        <Text
          fill={statusColor}
          fontFamily={uiTokens.text.title.fontFamily}
          fontSize={uiTokens.text.body.fontSize}
          fontWeight={uiTokens.text.title.fontWeight}
          horizontalAlignText="center"
          width="fill-parent"
        >
          {String(statusText)}
        </Text>
      </AutoLayout>

      {/* Color Swatches */}
      <AutoLayout direction="horizontal" spacing={uiTokens.layout.spacing} width="fill-parent">
        <AutoLayout direction="vertical" spacing={uiTokens.layout.tight} width="fill-parent">
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.helper.fontSize}
            fontFamily={uiTokens.text.helper.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
            opacity={0.6}
          >
            FOREGROUND
          </Text>
          <AutoLayout
            width={uiTokens.swatch.width}
            height={uiTokens.swatch.height}
            fill={result.foreground}
            cornerRadius={uiTokens.swatch.radius}
            stroke={palette.textPrimary}
            strokeWidth={uiTokens.swatch.strokeWidth}
          />
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.helper.fontSize}
            fontFamily={uiTokens.text.helper.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
          >
            {String(result.foreground || defaultTheme.neutral.black)}
          </Text>
        </AutoLayout>
        <AutoLayout direction="vertical" spacing={uiTokens.layout.tight} width="fill-parent">
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.helper.fontSize}
            fontFamily={uiTokens.text.helper.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
            opacity={0.6}
          >
            BACKGROUND
          </Text>
          <AutoLayout
            width={uiTokens.swatch.width}
            height={uiTokens.swatch.height}
            fill={result.background}
            cornerRadius={uiTokens.swatch.radius}
            stroke={palette.textPrimary}
            strokeWidth={uiTokens.swatch.strokeWidth}
          />
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.helper.fontSize}
            fontFamily={uiTokens.text.helper.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
          >
            {String(result.background || defaultTheme.neutral.white)}
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* WCAG Standards */}
      <AutoLayout direction="vertical" spacing={uiTokens.layout.tight} width="fill-parent">
        <AutoLayout direction="horizontal" spacing={uiTokens.layout.compact} width="fill-parent">
          <Text
            fill={
              result.passesAA
                ? statusColor
                : palette.textPrimary
            }
            fontSize={uiTokens.text.body.fontSize}
            fontFamily={uiTokens.text.body.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
          >
            {result.passesAA ? "✓" : "✗"} WCAG AA (4.5:1)
          </Text>
        </AutoLayout>
        <AutoLayout direction="horizontal" spacing={uiTokens.layout.compact} width="fill-parent">
          <Text
            fill={
              result.passesAAA
                ? statusColor
                : palette.textPrimary
            }
            fontSize={uiTokens.text.body.fontSize}
            fontFamily={uiTokens.text.body.fontFamily}
            fontWeight={uiTokens.text.title.fontWeight}
          >
            {result.passesAAA ? "✓" : "✗"} WCAG AAA (7:1)
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Suggestion */}
      {result.suggestion && result.suggestion.length > 0 ? (
        <AutoLayout
          padding={uiTokens.suggestion.padding}
          fill={palette.textPrimary}
          opacity={uiTokens.suggestion.opacity}
          cornerRadius={uiTokens.suggestion.radius}
          width="fill-parent"
        >
          <Text
            fill={palette.textPrimary}
            fontSize={uiTokens.text.body.fontSize}
            fontFamily={uiTokens.text.body.fontFamily}
            lineHeight="150%"
            width="fill-parent"
          >
            {String(result.suggestion || "")}
          </Text>
        </AutoLayout>
      ) : null}
    </AutoLayout>
  );
}

export default ContrastDisplay;
