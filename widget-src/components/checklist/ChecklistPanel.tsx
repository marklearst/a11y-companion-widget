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
import { buildA11yLogoSvg } from "ui/icons";

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
  isDarkMode,
  showItemDescriptionsForSectionIds = [],
  preferences,
  setPreferences,
}: ChecklistProps) {
  const { hideCompleted, language, theme, selectedTemplate, accentColor } =
    preferences;
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
  const effectiveDark = theme === "dark" || (theme === "system" && isDarkMode);
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
  const { textWidth: progressTextWidth, barWidth: progressBarWidth } =
    getProgressLayout({
      text: progressLayoutText,
      parentWidth: progressRowWidth,
      gap: progressGap,
      minBarWidth: ui.progress.minWidth,
      textMinWidth: ui.progress.textMinWidth,
      textCharWidth: ui.progress.textCharWidth,
    });

  const { avatars, recordInteraction } = useAvatarProfiles({
    accentColor: ui.colors.progressFill,
    neutralDark: neutral.gray[900],
    neutralLight: neutral.white,
    max: ui.header.avatar.maxVisible,
  });
  const avatarSize = ui.header.avatar.size;
  const avatarStroke = ui.header.avatar.strokeWidth;
  const avatarStep = Math.max(0, avatarSize + ui.header.avatar.stackOffsetX);
  const avatarStackWidth =
    avatars.length > 0
      ? avatarSize + (avatars.length - 1) * avatarStep
      : 0;
  const avatarPositions = avatars.map((avatar, index) => ({
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
                    stroke={ui.colors.panelStroke}
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
                  stroke={ui.colors.panelStroke}
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
