const { widget } = figma;
const { AutoLayout, Frame, SVG, Text, Input, Image } = widget;

import { ProgressBar } from "components/primitives";
import { ChecklistProps } from "types/index";
import { ChecklistSection } from "components/checklist";
import { CopyDisplay } from "components/checklist/CopyDisplay";
import { useSearch } from "hooks/useSearch";
import { useMarkdownExport } from "hooks/useMarkdownExport";
import { getMessages } from "i18n";
import { inferThemePresetFromAccent, resolveTheme } from "theme";
import {
  createChecklistVariables,
  createOverlayVariables,
} from "design-system";
import { neutral } from "design-system/theme/default";
import { filterSectionsByTemplate } from "data/templates";
import type { ChecklistSectionType } from "types";
import { useAvatarProfiles } from "hooks/useAvatarProfiles";
import { getProgressLayout } from "logic/progress";
import { useChecklistSettingsMenu } from "hooks/useChecklistSettingsMenu";
import { useContrastChecker } from "hooks/useContrastChecker";
import { buildA11yLogoSvg } from "ui/icons";
import { resolveAvatarStackWidth, resolveAvatarStep } from "shared/avatarStack";

function hexToColor(hex: string): RGB {
  const raw = hex.replace("#", "");
  const normalized =
    raw.length === 3
      ? raw
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : raw.padEnd(6, "0").slice(0, 6);
  const parseChannel = (start: number) =>
    Number.parseInt(normalized.slice(start, start + 2), 16) / 255;
  return {
    r: parseChannel(0),
    g: parseChannel(2),
    b: parseChannel(4),
  };
}

function buildLinearGradientPaint(
  stops: Array<{ position: number; color: string; alpha: number }>
) {
  return {
    type: "gradient-linear" as const,
    gradientHandlePositions: [
      { x: 0, y: 0.5 },
      { x: 1, y: 0.5 },
      { x: 0, y: 1 },
    ] as [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }],
    gradientStops: stops.map((stop) => ({
      position: stop.position,
      color: {
        ...hexToColor(stop.color),
        a: stop.alpha,
      },
    })),
  };
}

/**
 * Renders the accessibility checklist panel, displaying categories and their associated tasks.
 *
 * @remarks
 * This component manages the main checklist UI, including progress tracking and section rendering.
 * It uses Figma Widget API primitives for layout and text.
 *
 * @param props - The checklist panel properties.
 * @param props.title - The title of the checklist.
 * @param props.sections - The checklist sections to display.
 * @param props.taskCompletion - The current task completion state.
 * @param props.handleCheckChange - Callback for when a checklist item is toggled.
 * @param props.total - The total number of checklist items.
 * @param props.completed - The number of completed checklist items.
 * @returns The rendered checklist panel JSX element for use in a Figma widget.
 *
 * @example
 * ```tsx
 * <CompanionPanel
 *   title="A11y Checklist"
 *   sections={sections}
 *   taskCompletion={taskCompletion}
 *   handleCheckChange={handleCheckChange}
 *   total={total}
 *   completed={completed}
 * />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistPanel({
  title,
  sections,
  taskCompletion,
  handleCheckChange,
  total,
  completed,
  showItemDescriptionsForSectionIds = [],
  preferences,
  setPreferences,
}: ChecklistProps) {
  const {
    hideCompleted,
    language,
    theme,
    selectedTemplate,
    accentColor,
    showContrastInspector,
  } = preferences;
  const t = getMessages(language);

  // Search functionality
  const { searchQuery, setSearchQuery, filteredSections } =
    useSearch<ChecklistSectionType>(sections);

  // Apply template filter after search filter
  const templateFilteredSections = filterSectionsByTemplate(
    filteredSections,
    selectedTemplate
  );

  const { showCopy, copyData, handleExport, closeCopy } = useMarkdownExport({
    sections: templateFilteredSections,
    taskCompletion,
    title,
    completed,
    total,
    messages: t,
  });
  const {
    contrastResult,
    contrastNotice,
    contrastSwapped,
    checkSelection,
    clearResult,
    toggleContrastSwap,
  } = useContrastChecker();

  useChecklistSettingsMenu({
    preferences,
    setPreferences,
    messages: t,
    onExport: handleExport,
  });

  const progressText = t.progressText(completed, total);
  const progressTextSample = t.progressText(total, total);

  /**
   * Returns the main Checklist component, which displays a list of categories and their associated tasks.
   *
   * @returns {JSX.Element} The rendered Checklist component.
   */
  const effectiveDark = theme === "dark";
  const matchedThemePreset = inferThemePresetFromAccent(accentColor);
  const themePreset = matchedThemePreset ?? "default";
  const accentOverride = matchedThemePreset ? undefined : accentColor;
  const tokens = resolveTheme(!!effectiveDark, themePreset, accentOverride);
  const ui = createChecklistVariables(tokens);
  const overlayUi = createOverlayVariables({
    panelBg: ui.colors.panelBg,
    panelStroke: ui.colors.panelStroke,
    textPrimary: ui.colors.textPrimary,
    textSecondary: ui.colors.textSecondary,
    textStrong: ui.colors.textStrong,
    progressFill: ui.colors.progressFill,
  });
  const headerBg = ui.colors.headerBg;
  const headerText = ui.colors.headerText;
  const logoFill = ui.colors.progressFill;
  const sectionTitleColor = ui.colors.textPrimary;
  const sectionIconColor = ui.colors.textSecondary;
  const panelWidthResolved = ui.panel.width;
  const contentPaddingResolved = ui.panel.paddingX;
  const parentWidth = panelWidthResolved - contentPaddingResolved * 2;
  const progressRowPaddingX = ui.progress.paddingX;
  const progressRowWidth = Math.max(0, parentWidth - progressRowPaddingX * 2);
  const progressGap = ui.progress.gap;
  const progressTextColor = ui.progress.textColor ?? ui.colors.textPrimary;
  const progressLayoutText = progressTextSample;
  const contrastSwapSupported = Boolean(contrastResult?.swappable);
  const contrastDisplay = (() => {
    if (!contrastResult) return null;
    const swapped = contrastSwapped && contrastSwapSupported;
    return {
      foreground: swapped ? contrastResult.background : contrastResult.foreground,
      background: swapped ? contrastResult.foreground : contrastResult.background,
      foregroundKind: swapped
        ? contrastResult.backgroundKind
        : contrastResult.foregroundKind,
      backgroundKind: swapped
        ? contrastResult.foregroundKind
        : contrastResult.backgroundKind,
      foregroundStops: swapped
        ? contrastResult.backgroundStops
        : contrastResult.foregroundStops,
      backgroundStops: swapped
        ? contrastResult.foregroundStops
        : contrastResult.backgroundStops,
      foregroundStopCount: swapped
        ? contrastResult.backgroundStopCount
        : contrastResult.foregroundStopCount,
      backgroundStopCount: swapped
        ? contrastResult.foregroundStopCount
        : contrastResult.backgroundStopCount,
      ratioDisplay: contrastResult.ratioDisplay,
      measurementMode: contrastResult.measurementMode,
      grade: contrastResult.grade,
    };
  })();
  const contrastPreviewFill =
    contrastDisplay?.backgroundKind === "gradient" &&
    contrastDisplay.backgroundStops &&
    contrastDisplay.backgroundStops.length > 1
      ? buildLinearGradientPaint(contrastDisplay.backgroundStops)
      : contrastDisplay?.background ?? ui.colors.sectionDescBg;
  const contrastPreviewText =
    contrastDisplay?.foregroundKind === "gradient" &&
    contrastDisplay.foregroundStops &&
    contrastDisplay.foregroundStops.length > 1
      ? buildLinearGradientPaint(contrastDisplay.foregroundStops)
      : contrastDisplay?.foreground ?? ui.colors.textPrimary;
  const contrastPreviewStatusText = contrastDisplay
    ? contrastDisplay.grade === "A"
      ? "Aa"
      : contrastDisplay.grade
    : "Aa";
  const contrastResetDisabled =
    !contrastResult && !contrastNotice && !contrastSwapped;
  const contrastBlockGap = ui.section.headerGap;
  const contrastPreviewActionsGap = ui.section.bulkAction.gap;
  const contrastMetaGap = ui.section.bulkAction.gap;
  const contrastPreviewWidth = ui.inspector.previewWidth;
  const contrastControlPadding = ui.section.bulkAction.padding;
  const contrastActionPadding = {
    top: ui.section.headerGap,
    // Add subtle bottom bias for hover fill without moving text baseline.
    bottom: contrastControlPadding + 2,
    left: contrastControlPadding,
    right: contrastControlPadding,
  };
  const contrastUiTextColor = ui.inspector.colors.hintText;
  const formatGradientSummary = (
    stops:
      | Array<{ position: number; color: string; alpha: number }>
      | undefined
      | null
  ): string => {
    const values = (stops ?? []).map((stop) => stop.color);
    if (values.length === 0) {
      return "Gradient 0 steps";
    }
    const sample = values.slice(0, 2);
    const remaining = values.length - sample.length;
    return `Gradient ${values.length} steps, ${sample.join(", ")}${
      remaining > 0 ? `, ${remaining}+` : ""
    }`;
  };
  const formatGradientTooltip = (
    stops:
      | Array<{ position: number; color: string; alpha: number }>
      | undefined
      | null
  ): string | undefined => {
    if (!stops || stops.length === 0) return undefined;
    return stops
      .map((stop, index) => {
        const percent = Math.round(stop.position * 100);
        return `${index + 1}. ${stop.color} @ ${percent}%`;
      })
      .join("\n");
  };
  const describeFill = (
    kind: "solid" | "gradient" | undefined,
    value: string | null,
    stops: number | undefined,
    gradientStops:
      | Array<{ position: number; color: string; alpha: number }>
      | undefined
      | null
  ): string => {
    if (!value) return String(t.contrastNoData);
    if (kind === "gradient") {
      if (gradientStops && gradientStops.length > 0) {
        return formatGradientSummary(gradientStops);
      }
      return `Gradient ${stops ?? 0} steps`;
    }
    return value;
  };
  const contrastForegroundLabel = contrastDisplay
    ? describeFill(
        contrastDisplay.foregroundKind,
        contrastDisplay.foreground,
        contrastDisplay.foregroundStopCount,
        contrastDisplay.foregroundStops
      )
    : null;
  const contrastBackgroundLabel = contrastDisplay
    ? describeFill(
        contrastDisplay.backgroundKind,
        contrastDisplay.background,
        contrastDisplay.backgroundStopCount,
        contrastDisplay.backgroundStops
      )
    : null;
  const contrastForegroundTooltip =
    contrastDisplay?.foregroundKind === "gradient"
      ? formatGradientTooltip(contrastDisplay.foregroundStops)
      : undefined;
  const contrastBackgroundTooltip =
    contrastDisplay?.backgroundKind === "gradient"
      ? formatGradientTooltip(contrastDisplay.backgroundStops)
      : undefined;
  const contrastTextLabel = `${String(t.contrastTextLabel)}:`;
  const contrastBackgroundLabelText = `${String(t.contrastBackgroundLabel)}:`;
  const contrastMetaPlaceholder = "N/A";
  const contrastTextValue = contrastDisplay
    ? contrastForegroundLabel ?? String(t.contrastNoData)
    : contrastMetaPlaceholder;
  const contrastBackgroundValue = contrastDisplay
    ? contrastBackgroundLabel ?? String(t.contrastNoData)
    : contrastMetaPlaceholder;
  const showContrastMeta = true;
  const contrastStatusPrimary = contrastDisplay
    ? `Contrast ${contrastDisplay.ratioDisplay}:1`
    : null;
  const contrastStatusSuffixMin =
    contrastDisplay?.measurementMode === "sampled-min" ? " (min)" : "";
  const contrastStatusSuffixLarge =
    contrastDisplay?.grade === "A" ? " | Large only" : "";
  const contrastStatusFullText = contrastStatusPrimary
    ? `${contrastStatusPrimary}${contrastStatusSuffixMin}${
        contrastDisplay?.grade === "A" ? ` | ${String(t.contrastLargeTextOnly)}` : ""
      }`
    : null;
  const statusCandidates = contrastStatusPrimary
    ? [
        `${contrastStatusPrimary}${contrastStatusSuffixMin}${contrastStatusSuffixLarge}`,
        `${contrastStatusPrimary}${contrastStatusSuffixMin}`,
        contrastStatusPrimary,
      ]
    : [];
  const contrastStatusCellWidth = Math.floor(contrastPreviewWidth / 2);
  const statusCharBudget = Math.max(16, Math.floor((contrastStatusCellWidth - 12) / 7));
  const contrastStatusCandidate = statusCandidates.find(
    (candidate) => candidate.length <= statusCharBudget
  );
  const contrastStatusText =
    contrastStatusCandidate ??
    (statusCandidates.length > 0 ? statusCandidates[statusCandidates.length - 1] : null);
  const contrastStatusColor = ui.colors.progressFill;
  const contrastStatusWeight = ui.progressTracker.fontWeight;
  const contrastResolvedStatus = contrastNotice ?? contrastStatusText ?? "Contrast: N/A";
  const contrastStatusTooltip = contrastNotice ?? contrastStatusFullText ?? undefined;

  const { textWidth: progressTextWidth, barWidth: progressBarWidth } =
    getProgressLayout({
      text: progressLayoutText,
      parentWidth: progressRowWidth,
      gap: progressGap,
      minBarWidth: ui.progress.minWidth,
      textMinWidth: ui.progress.textMinWidth,
      textCharWidth: ui.progress.textCharWidth,
    });

  const { avatars, overflowCount, overflowNames, recordInteraction } = useAvatarProfiles({
    accentColor: ui.colors.progressFill,
    neutralDark: neutral.gray[900],
    neutralLight: neutral.white,
    max: ui.header.avatar.maxVisible,
  });
  const avatarOutlineColor = headerText;
  const avatarSize = ui.header.avatar.size;
  const avatarStroke = ui.header.avatar.strokeWidth;
  const avatarStep = resolveAvatarStep(avatarSize, ui.header.avatar.stackOffsetX);
  const avatarEntries: Array<
    | (typeof avatars)[number]
    | { id: string; name: string; type: "overflow"; label: string }
  > =
    overflowCount > 0
      ? [
          ...avatars,
          {
            id: "avatar-overflow",
            name:
              overflowNames.length > 0
                ? `${overflowCount} more users: ${overflowNames.join(", ")}`
                : `${overflowCount} more users`,
            type: "overflow",
            label: `+${overflowCount}`,
          },
        ]
      : avatars;
  const avatarStackWidth = resolveAvatarStackWidth(
    avatarEntries.length,
    avatarSize,
    avatarStep
  );
  const avatarPositions = avatarEntries.map((avatar, index) => ({
    avatar,
    x: index * avatarStep,
  }));
  const avatarsForRender = [...avatarPositions].reverse();
  const richDescriptionSections = new Set(showItemDescriptionsForSectionIds);
  const a11yLogoSvg = buildA11yLogoSvg({ fill: logoFill, size: ui.header.logoSize });
  return (
    <AutoLayout
      direction="vertical"
      width={panelWidthResolved}
      cornerRadius={ui.panel.radius}
      fill={ui.colors.panelBg}
      stroke={ui.panel.strokeColor}
      strokeAlign="outside"
      strokeWidth={ui.panel.strokeWidth}
      {...(ui.panel.effect ? { effect: ui.panel.effect } : {})}
      spacing={ui.panel.spacing}
      padding={{ top: 0, bottom: ui.panel.paddingBottom, left: 0, right: 0 }}
    >
      {/* Header */}
      <AutoLayout
        name="Header"
        direction="horizontal"
        width="fill-parent"
        height={ui.header.height}
        fill={headerBg}
        verticalAlignItems="center"
        spacing={ui.header.gap}
        padding={{
          top: ui.header.paddingY,
          bottom: ui.header.paddingY,
          left: ui.header.paddingX,
          right: ui.header.paddingX,
        }}
        cornerRadius={{
          topLeft: ui.panel.radius,
          topRight: ui.panel.radius,
          bottomLeft: 0,
          bottomRight: 0,
        }}
      >
        <SVG
          name="a11y-logo"
          width={ui.header.logoSize}
          height={ui.header.logoSize}
          src={a11yLogoSvg}
        />
        <Text
          name="HeaderTitle"
          fill={headerText}
          fontFamily={ui.header.title.fontFamily}
          fontSize={ui.header.title.fontSize}
          fontWeight={ui.header.title.fontWeight}
          lineHeight={ui.header.title.lineHeight}
          letterSpacing={ui.header.title.letterSpacing}
        >
          {String(title || t.appTitle || "a11y Companion")}
        </Text>
        <AutoLayout width="fill-parent" />
        {avatarsForRender.length > 0 ? (
          <Frame
            name="AvatarStack"
            width={avatarStackWidth}
            height={avatarSize}
          >
            {avatarsForRender.map(({ avatar, x }) => {
              const innerSize = Math.max(0, avatarSize - avatarStroke * 2);
              const innerRadius = Math.max(
                0,
                ui.header.avatar.radius - avatarStroke
              );
              if (avatar.type === "overflow") {
                return (
                  <AutoLayout
                    key={avatar.id}
                    name="UserOverflow"
                    tooltip={avatar.name}
                    x={x}
                    y={0}
                    width={avatarSize}
                    height={avatarSize}
                    cornerRadius={ui.header.avatar.radius}
                    stroke={avatarOutlineColor}
                    strokeAlign="inside"
                    strokeWidth={avatarStroke}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                  >
                    <AutoLayout
                      width={innerSize}
                      height={innerSize}
                      cornerRadius={innerRadius}
                      fill={ui.colors.sectionDescBg}
                      verticalAlignItems="center"
                      horizontalAlignItems="center"
                    >
                      <Text
                        fontSize={ui.header.avatar.fontSize}
                        fontWeight={ui.header.avatar.fontWeight}
                        fontFamily={ui.header.title.fontFamily}
                        fill={ui.colors.textPrimary}
                      >
                        {avatar.label}
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                );
              }
              if (avatar.type === "image" && avatar.src) {
                return (
                  <AutoLayout
                    key={avatar.id}
                    name="UserAvatar"
                    tooltip={avatar.name}
                    x={x}
                    y={0}
                    width={avatarSize}
                    height={avatarSize}
                    cornerRadius={ui.header.avatar.radius}
                    stroke={avatarOutlineColor}
                    strokeAlign="inside"
                    strokeWidth={avatarStroke}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                  >
                    <Image
                      src={avatar.src}
                      width={innerSize}
                      height={innerSize}
                      cornerRadius={innerRadius}
                    />
                  </AutoLayout>
                );
              }
              return (
                <AutoLayout
                  key={avatar.id}
                  name="UserInitials"
                  tooltip={avatar.name}
                  x={x}
                  y={0}
                  width={avatarSize}
                  height={avatarSize}
                  cornerRadius={ui.header.avatar.radius}
                  stroke={avatarOutlineColor}
                  strokeAlign="inside"
                  strokeWidth={avatarStroke}
                  verticalAlignItems="center"
                  horizontalAlignItems="center"
                >
                  <AutoLayout
                    width={innerSize}
                    height={innerSize}
                    cornerRadius={innerRadius}
                    fill={avatar.fill}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                  >
                    <Text
                      fontSize={ui.header.avatar.fontSize}
                      fontWeight={ui.header.avatar.fontWeight}
                      fontFamily={ui.header.title.fontFamily}
                      fill={avatar.textColor}
                    >
                      {avatar.initials}
                    </Text>
                  </AutoLayout>
                </AutoLayout>
              );
            })}
          </Frame>
        ) : null}
      </AutoLayout>
      {/* Main content */}
      <AutoLayout
        name="Checklist"
        direction="vertical"
        spacing={ui.panel.spacing}
        width={panelWidthResolved}
        padding={{
          left: contentPaddingResolved,
          right: contentPaddingResolved,
        }}
      >
        {/* Search */}
        <AutoLayout
          direction="vertical"
          spacing={0}
          width="fill-parent"
          padding={{ bottom: ui.search.bottomSpacing }}
        >
          <AutoLayout
            padding={{
              top: ui.search.paddingY,
              bottom: ui.search.paddingY,
              left: ui.search.paddingX,
              right: ui.search.paddingX,
            }}
            cornerRadius={ui.search.radius}
            stroke={ui.colors.panelStroke}
            strokeWidth={ui.panel.strokeWidth}
            width="fill-parent"
          >
            <Input
              value={searchQuery}
              placeholder={t.searchPlaceholder}
              placeholderProps={{
                fill: ui.colors.textPrimary,
                opacity: ui.search.placeholderOpacity,
                fontWeight: ui.search.fontWeight,
              }}
              onTextEditEnd={(e) => setSearchQuery(e.characters)}
              width="fill-parent"
              fontSize={ui.search.fontSize}
              fontFamily={ui.search.fontFamily}
              fontWeight={ui.search.fontWeight}
              fill={ui.colors.textPrimary}
              inputBehavior="truncate"
              x={0}
            />
          </AutoLayout>
        </AutoLayout>

        {/* Export Format Modal - shown below buttons when clipboard unavailable */}
        {showCopy && copyData ? (
          <CopyDisplay
            copyData={copyData}
            format={showCopy}
            ui={overlayUi}
            labels={{
              copyAs: t.copyAs,
              instruction: t.copyInstruction,
            }}
            onClose={closeCopy}
            colors={{
              textPrimary: ui.colors.textPrimary,
              panelBg: ui.colors.panelBg,
              buttonBg: ui.colors.headerBg,
            }}
          />
        ) : null}

        <AutoLayout
          direction="horizontal"
          spacing={progressGap}
          width="fill-parent"
          verticalAlignItems="center"
          padding={{
            top: ui.progress.paddingTop,
            bottom: ui.progress.paddingBottom,
            left: progressRowPaddingX,
            right: progressRowPaddingX,
          }}
        >
          <ProgressBar
            total={total}
            completed={completed}
            parentWidth={progressBarWidth}
            colors={{
              track: ui.colors.progressBg,
              fill: ui.colors.progressFill,
            }}
            height={ui.progress.barHeight}
            radius={ui.progress.barRadius}
          />
          <AutoLayout
            padding={{
              top: Math.max(0, ui.progress.textOffsetY ?? 0),
            }}
          >
            <Text
              name="ProgressText"
              fill={progressTextColor}
              lineHeight={ui.progress.text.lineHeight}
              fontFamily={ui.progress.text.fontFamily}
              fontSize={ui.progress.text.fontSize}
              fontWeight={ui.progress.text.fontWeight}
              letterSpacing={ui.progress.text.letterSpacing}
              width={progressTextWidth}
              horizontalAlignText="right"
              truncate={1}
            >
              {String(progressText || `${completed} / ${total} checks`)}
            </Text>
          </AutoLayout>
        </AutoLayout>
        {showContrastInspector ? (
          <AutoLayout
            direction="vertical"
            spacing={contrastBlockGap}
            width="fill-parent"
            padding={{
              top: ui.section.headerGap,
              bottom: ui.progress.paddingBottom + ui.section.bulkAction.gap,
              left: 0,
              right: 0,
            }}
          >
            <Text
              fill={ui.inspector.colors.hintText}
              fontFamily={ui.section.bulkAction.fontFamily}
              fontSize={ui.item.text.fontSize}
              fontWeight={ui.section.bulkAction.fontWeight}
            >
              {String(t.contrastInspectorHint)}
            </Text>
            <AutoLayout direction="vertical" spacing={contrastPreviewActionsGap} width="fill-parent">
              <AutoLayout
                width={contrastPreviewWidth}
                height={ui.inspector.previewHeight}
                fill={contrastPreviewFill}
                cornerRadius={ui.inspector.previewRadius}
                verticalAlignItems="center"
                horizontalAlignItems="center"
              >
                <AutoLayout
                  width="fill-parent"
                  height="fill-parent"
                  verticalAlignItems="center"
                  horizontalAlignItems="center"
                >
                  <Text
                    horizontalAlignText="center"
                    fill={contrastPreviewText}
                    fontFamily={ui.inspector.status.fontFamily}
                    fontSize={ui.inspector.status.fontSize}
                    fontWeight={ui.inspector.status.fontWeight}
                    lineHeight={ui.inspector.status.lineHeight}
                  >
                    {contrastPreviewStatusText}
                  </Text>
                </AutoLayout>
              </AutoLayout>
              <AutoLayout
                direction="horizontal"
                width={contrastPreviewWidth}
                height={ui.inspector.controls.height}
                spacing={0}
                verticalAlignItems="center"
              >
                <AutoLayout
                  width={contrastStatusCellWidth}
                  height="fill-parent"
                  direction="horizontal"
                  spacing={ui.inspector.controls.gap}
                  verticalAlignItems="center"
                >
                  <AutoLayout
                    onClick={checkSelection}
                    height="fill-parent"
                    padding={contrastActionPadding}
                    cornerRadius={ui.section.bulkAction.radius}
                    hoverStyle={{
                      fill: ui.colors.hoverBg,
                    }}
                    horizontalAlignItems="center"
                  >
                    <Text
                      fill={contrastUiTextColor}
                      fontFamily={ui.section.bulkAction.fontFamily}
                      fontSize={ui.progress.text.fontSize}
                      fontWeight={ui.section.bulkAction.fontWeight}
                    >
                      {String(t.contrastRunCheck)}
                    </Text>
                  </AutoLayout>
                  <AutoLayout
                    onClick={contrastSwapSupported ? toggleContrastSwap : undefined}
                    opacity={contrastSwapSupported ? 1 : 0.5}
                    height="fill-parent"
                    padding={contrastActionPadding}
                    cornerRadius={ui.section.bulkAction.radius}
                    {...(contrastSwapSupported
                      ? {
                          hoverStyle: {
                            fill: ui.colors.hoverBg,
                          },
                        }
                      : {})}
                    horizontalAlignItems="center"
                  >
                    <Text
                      fill={contrastUiTextColor}
                      fontFamily={ui.section.bulkAction.fontFamily}
                      fontSize={ui.progress.text.fontSize}
                      fontWeight={ui.section.bulkAction.fontWeight}
                    >
                      {String(t.contrastSwap)}
                    </Text>
                  </AutoLayout>
                  <AutoLayout
                    onClick={!contrastResetDisabled ? clearResult : undefined}
                    opacity={contrastResetDisabled ? 0.5 : 1}
                    height="fill-parent"
                    padding={contrastActionPadding}
                    cornerRadius={ui.section.bulkAction.radius}
                    {...(!contrastResetDisabled
                      ? {
                          hoverStyle: {
                            fill: ui.colors.hoverBg,
                          },
                        }
                      : {})}
                    horizontalAlignItems="center"
                  >
                    <Text
                      fill={contrastUiTextColor}
                      fontFamily={ui.section.bulkAction.fontFamily}
                      fontSize={ui.progress.text.fontSize}
                      fontWeight={ui.section.bulkAction.fontWeight}
                    >
                      {String(t.contrastClear)}
                    </Text>
                  </AutoLayout>
                </AutoLayout>
                <AutoLayout
                  width={contrastPreviewWidth - contrastStatusCellWidth}
                  height="fill-parent"
                  verticalAlignItems="center"
                >
                  <Text
                    fill={contrastStatusColor}
                    opacity={1}
                    fontFamily={ui.progress.text.fontFamily}
                    fontSize={ui.progress.text.fontSize}
                    fontWeight={contrastStatusWeight}
                    width="fill-parent"
                    horizontalAlignText="right"
                    truncate={1}
                    tooltip={contrastStatusTooltip}
                  >
                    {contrastResolvedStatus}
                  </Text>
                </AutoLayout>
              </AutoLayout>
            </AutoLayout>
            <AutoLayout
              direction="vertical"
              spacing={contrastMetaGap}
              width="fill-parent"
              fill={ui.colors.sectionDescBg}
              cornerRadius={ui.section.description.radius}
              padding={{
                vertical: ui.section.description.paddingY,
                horizontal: ui.section.description.paddingX,
              }}
            >
              <AutoLayout
                tooltip={contrastForegroundTooltip}
                direction="horizontal"
                spacing={ui.section.bulkAction.gap}
                width="fill-parent"
                verticalAlignItems="center"
              >
                <Text
                  fill={contrastUiTextColor}
                  opacity={showContrastMeta ? 1 : 0}
                  fontFamily={ui.progress.text.fontFamily}
                  fontSize={ui.section.bulkAction.fontSize}
                  fontWeight={ui.section.title.fontWeight}
                >
                  {contrastTextLabel}
                </Text>
                <Text
                  fill={contrastUiTextColor}
                  opacity={showContrastMeta ? 1 : 0}
                  fontFamily={ui.progress.text.fontFamily}
                  fontSize={ui.section.bulkAction.fontSize}
                  fontWeight={ui.section.bulkAction.fontWeight}
                >
                  {contrastTextValue}
                </Text>
              </AutoLayout>
              <AutoLayout
                tooltip={contrastBackgroundTooltip}
                direction="horizontal"
                spacing={ui.section.bulkAction.gap}
                width="fill-parent"
                verticalAlignItems="center"
              >
                <Text
                  fill={contrastUiTextColor}
                  opacity={showContrastMeta ? 1 : 0}
                  fontFamily={ui.progress.text.fontFamily}
                  fontSize={ui.section.bulkAction.fontSize}
                  fontWeight={ui.section.title.fontWeight}
                >
                  {contrastBackgroundLabelText}
                </Text>
                <Text
                  fill={contrastUiTextColor}
                  opacity={showContrastMeta ? 1 : 0}
                  fontFamily={ui.progress.text.fontFamily}
                  fontSize={ui.section.bulkAction.fontSize}
                  fontWeight={ui.section.bulkAction.fontWeight}
                >
                  {contrastBackgroundValue}
                </Text>
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>
        ) : null}
        {templateFilteredSections.length === 0 ? (
          <Text
            fill={ui.colors.textPrimary}
            fontSize={ui.search.fontSize}
            fontFamily={ui.search.fontFamily}
            fontWeight={ui.search.fontWeight}
            opacity={0.55}
            width="fill-parent"
            horizontalAlignText="center"
          >
            {String(t.noResults || "No items found")}
          </Text>
        ) : (
          templateFilteredSections.map((section, index) => (
            <ChecklistSection
              key={section.id ?? `${section.title}-${index}`}
              section={section}
              taskCompletion={taskCompletion}
              handleCheckChange={(taskId, isChecked) => {
                recordInteraction();
                handleCheckChange(taskId, isChecked);
              }}
              hideCompleted={hideCompleted}
              isHighlighted={false}
              showItemDescriptions={richDescriptionSections.has(section.id)}
              onBulkAction={recordInteraction}
              labels={{
                checkAll: t.markAllComplete || "Check all",
                uncheckAll: t.markAllIncomplete || "Uncheck all",
              }}
              ui={ui}
              colors={{
                textPrimary: ui.colors.textPrimary,
                textSecondary: ui.colors.textSecondary,
                sectionTitle: sectionTitleColor,
                sectionIcon: sectionIconColor,
                sectionDescBg: ui.colors.sectionDescBg,
                sectionDescText: ui.colors.textStrong,
                progressTracker: {
                  bg: ui.colors.sectionDescBg,
                  text: ui.colors.textPrimary,
                },
                checkbox: {
                  bgChecked: ui.colors.checkboxBgChecked,
                  bgUnchecked: ui.colors.checkboxBgUnchecked,
                  stroke: ui.colors.checkboxStroke,
                  checkmark: ui.colors.panelBg,
                },
              }}
            />
          ))
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

export default ChecklistPanel;
