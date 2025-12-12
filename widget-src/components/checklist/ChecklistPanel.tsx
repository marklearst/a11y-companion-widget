const { widget } = figma;
const { AutoLayout, SVG, Text, Input } = widget;
const { useSyncedState } = widget;

// Type declaration for navigator (available in Figma widget runtime)
declare const navigator: {
  clipboard?: {
    writeText: (text: string) => Promise<void>;
  };
};

import { ProgressBar, ProgressRing } from "components/primitives";
import { ChecklistProps } from "types/index";
import { dropShadowEffect } from "effects";
import { ChecklistSection } from "components/checklist";
import { CopyDisplay } from "components/checklist/CopyDisplay";
import { useTooltipsToggle } from "hooks/useTooltipsToggle";
import { useSearch } from "hooks/useSearch";
import { useQuickCopy } from "hooks/useQuickCopy";
import { getMessages } from "i18n";
import { resolveTheme } from "theme";
import {
  templates,
  filterSectionsByTemplate,
  type TemplateType,
} from "data/templates";
import type { ChecklistSectionType } from "types";

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
}: ChecklistProps) {
  const parentWidth = 460; // assuming a fixed width for the parent container

  // Quick copy functionality
  const { copyAllAsMarkdown, copyAsPlainText, copyAsHTML } = useQuickCopy();
  const [showCopy, setShowCopy] = useSyncedState<
    "markdown" | "html" | "plaintext" | null
  >("showCopy", null);
  const [copyData, setCopyData] = useSyncedState<string>("copyData", "");

  // Template filtering
  const [selectedTemplate, setSelectedTemplate] = useSyncedState<TemplateType>(
    "selectedTemplate",
    "all"
  );

  const { tooltipsEnabled, hideCompleted, language, theme } =
    useTooltipsToggle();
  const t = getMessages(language);
  const progressText = t.progressText(completed, total);

  // Search functionality
  const { searchQuery, setSearchQuery, filteredSections } =
    useSearch<ChecklistSectionType>(sections);

  // Apply template filter after search filter
  const templateFilteredSections = filterSectionsByTemplate(
    filteredSections,
    selectedTemplate
  );

  /**
   * Returns the main Checklist component, which displays a list of categories and their associated tasks.
   *
   * @returns {JSX.Element} The rendered Checklist component.
   */
  const effectiveDark = theme === "dark" || (theme === "system" && isDarkMode);
  const tokens = resolveTheme(!!effectiveDark);

  return (
    <AutoLayout
      direction="vertical"
      width={520}
      cornerRadius={8}
      effect={dropShadowEffect}
      fill={tokens.panelBg}
      stroke={tokens.panelStroke}
      strokeAlign="outside"
      strokeWidth={1}
      spacing={16}
      padding={{ top: 0, bottom: 16, left: 0, right: 0 }}
    >
      {/* Header */}
      <AutoLayout
        name="Header"
        direction="horizontal"
        width="fill-parent"
        height={100}
        fill={tokens.headerBg}
        verticalAlignItems="center"
        spacing={14}
        padding={{ top: 20, bottom: 20, left: 25, right: 25 }}
      >
        <SVG
          name="a11y-logo"
          width={51}
          height={51}
          src="<svg class='c-logo__icon' aria-hidden='true' focusable='false' width='51' height='51' xmlns='http://www.w3.org/2000/svg'><title>The A11Y Project</title><path d='M25.5 0C11.417 0 0 11.417 0 25.5S11.417 51 25.5 51 51 39.583 51 25.5 39.583 0 25.5 0zm-.385 5.064a3.3 3.3 0 0 1 3.307 3.291 3.304 3.304 0 0 1-3.307 3.306 3.3 3.3 0 0 1-3.29-3.306 3.29 3.29 0 0 1 3.29-3.291zm14.289 10.652l-9.809 1.24.005 9.817 4.755 15.867a1.85 1.85 0 0 1-1.344 2.252c-.989.25-2.003-.3-2.252-1.298l-4.87-14.443h-1.498l-4.48 14.742c-.374.964-1.448 1.404-2.407 1.03-.954-.37-1.533-1.454-1.158-2.418l4.115-15.572v-9.978l-9.04-1.228c-.928-.075-1.558-.89-1.483-1.818.07-.934.914-1.628 1.838-1.554l10.982.944h4.815l11.69-.963a1.68 1.68 0 0 1 1.749 1.623c.04.924-.68 1.718-1.608 1.758z' fill='#fff'></path></svg>"
        />
        <Text
          name="HeaderTitle"
          fill={tokens.headerText}
          fontFamily="Anaheim"
          fontSize={28}
          fontWeight={600}
          lineHeight="150%"
        >
          {String(title || t.appTitle || "a11y Companion")}
        </Text>
        <AutoLayout width="fill-parent" />
        <ProgressRing
          total={total}
          completed={completed}
          size={60}
          strokeWidth={5}
          colors={{ track: tokens.progressBg, fill: tokens.progressFill }}
        />
      </AutoLayout>
      {/* Main content */}
      <AutoLayout
        name="Checklist"
        direction="vertical"
        spacing={16}
        width={520}
        padding={{ left: 30, right: 30 }}
      >
        {/* Search */}
        <AutoLayout
          padding={{ top: 8, bottom: 8, left: 12, right: 12 }}
          cornerRadius={4}
          stroke={tokens.panelStroke}
          strokeWidth={1}
        >
          <Input
            value={searchQuery}
            placeholder={t.searchPlaceholder}
            onTextEditEnd={(e) => setSearchQuery(e.characters)}
            width={280}
            fontSize={16}
            fontFamily="Anaheim"
            fill={tokens.textPrimary}
            inputBehavior="truncate"
          />
        </AutoLayout>

        {/* Template Selector */}
        <AutoLayout direction="vertical" spacing={4} width="fill-parent">
          <Text
            fill={tokens.textPrimary}
            fontSize={12}
            fontFamily="Anaheim"
            fontWeight={600}
            opacity={0.6}
          >
            {t.checklistTemplate}
          </Text>
          {/* Map kebab-case IDs to camelCase i18n keys */}
          {(() => {
            const templateKeyMap: Record<
              TemplateType,
              keyof typeof t.templates
            > = {
              all: "all",
              "landing-page": "landingPage",
              dashboard: "dashboard",
              "mobile-app": "mobileApp",
              "quick-audit": "quickAudit",
              "forms-heavy": "formsHeavy",
            };
            return (
              <>
                <AutoLayout
                  direction="horizontal"
                  spacing={6}
                  width="fill-parent"
                >
                  {templates.slice(0, 3).map((template) => {
                    const templateInfo =
                      t.templates[templateKeyMap[template.id]];
                    return (
                      <AutoLayout
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        padding={{ horizontal: 10, vertical: 6 }}
                        cornerRadius={4}
                        fill={
                          selectedTemplate === template.id
                            ? tokens.headerBg
                            : undefined
                        }
                        stroke={tokens.panelStroke}
                        strokeWidth={1}
                        tooltip={String(
                          templateInfo?.description ||
                            template.description ||
                            templateInfo?.name ||
                            template.name ||
                            "Template"
                        )}
                      >
                        <Text
                          fill={
                            selectedTemplate === template.id
                              ? tokens.headerText
                              : tokens.textPrimary
                          }
                          fontSize={11}
                          fontFamily="Anaheim"
                          fontWeight={600}
                        >
                          {String(
                            templateInfo?.name || template.name || "Template"
                          )}
                        </Text>
                      </AutoLayout>
                    );
                  })}
                </AutoLayout>
                <AutoLayout
                  direction="horizontal"
                  spacing={6}
                  width="fill-parent"
                >
                  {templates.slice(3).map((template) => {
                    const templateInfo =
                      t.templates[templateKeyMap[template.id]];
                    return (
                      <AutoLayout
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        padding={{ horizontal: 10, vertical: 6 }}
                        cornerRadius={4}
                        fill={
                          selectedTemplate === template.id
                            ? tokens.headerBg
                            : undefined
                        }
                        stroke={tokens.panelStroke}
                        strokeWidth={1}
                        tooltip={String(
                          templateInfo?.description ||
                            template.description ||
                            templateInfo?.name ||
                            template.name ||
                            "Template"
                        )}
                      >
                        <Text
                          fill={
                            selectedTemplate === template.id
                              ? tokens.headerText
                              : tokens.textPrimary
                          }
                          fontSize={11}
                          fontFamily="Anaheim"
                          fontWeight={600}
                        >
                          {String(
                            templateInfo?.name || template.name || "Template"
                          )}
                        </Text>
                      </AutoLayout>
                    );
                  })}
                </AutoLayout>
              </>
            );
          })()}
        </AutoLayout>

        {/* Copy Actions */}
        <AutoLayout direction="horizontal" spacing={8} width="fill-parent">
          <Text
            fill={tokens.textPrimary}
            fontSize={12}
            fontFamily="Anaheim"
            fontWeight={600}
            opacity={0.6}
          >
            {t.quickCopy}
          </Text>
          <AutoLayout
            onClick={async () => {
              const data = copyAllAsMarkdown(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (
                  typeof navigator !== "undefined" &&
                  navigator.clipboard &&
                  navigator.clipboard.writeText
                ) {
                  await navigator.clipboard.writeText(data);
                  setShowCopy(null); // Clear any existing modal
                  setCopyData(""); // Clear copy data
                  figma.notify("✅ Copied as Markdown!", { timeout: 2000 });
                } else {
                  // Fallback: show copy display
                  setCopyData(data);
                  setShowCopy("markdown");
                  figma.notify("📋 Text ready to copy below", {
                    timeout: 2000,
                  });
                }
              } catch (_err) {
                // Fallback: show copy display if clipboard fails
                setCopyData(data);
                setShowCopy("markdown");
                figma.notify("📋 Text ready to copy below", { timeout: 2000 });
              }
            }}
            padding={{ horizontal: 8, vertical: 4 }}
            cornerRadius={4}
            stroke={tokens.panelStroke}
            strokeWidth={1}
            tooltip="Copy checklist as Markdown"
          >
            <Text
              fill={tokens.textPrimary}
              fontSize={12}
              fontFamily="Anaheim"
              fontWeight={600}
            >
              MD
            </Text>
          </AutoLayout>
          <AutoLayout
            onClick={async () => {
              const data = copyAsPlainText(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (
                  typeof navigator !== "undefined" &&
                  navigator.clipboard &&
                  navigator.clipboard.writeText
                ) {
                  await navigator.clipboard.writeText(data);
                  setShowCopy(null); // Clear any existing modal
                  setCopyData(""); // Clear copy data
                  figma.notify("✅ Copied as Plain Text!", { timeout: 2000 });
                } else {
                  setCopyData(data);
                  setShowCopy("plaintext");
                  figma.notify("📋 Text ready to copy below", {
                    timeout: 2000,
                  });
                }
              } catch (_err) {
                setCopyData(data);
                setShowCopy("plaintext");
                figma.notify("📋 Text ready to copy below", { timeout: 2000 });
              }
            }}
            padding={{ horizontal: 8, vertical: 4 }}
            cornerRadius={4}
            stroke={tokens.panelStroke}
            strokeWidth={1}
            tooltip="Copy checklist as plain text"
          >
            <Text
              fill={tokens.textPrimary}
              fontSize={12}
              fontFamily="Anaheim"
              fontWeight={600}
            >
              TXT
            </Text>
          </AutoLayout>
          <AutoLayout
            onClick={async () => {
              const data = copyAsHTML(
                filteredSections,
                taskCompletion,
                title,
                completed,
                total
              );
              try {
                if (
                  typeof navigator !== "undefined" &&
                  navigator.clipboard &&
                  navigator.clipboard.writeText
                ) {
                  await navigator.clipboard.writeText(data);
                  setShowCopy(null); // Clear any existing modal
                  setCopyData(""); // Clear copy data
                  figma.notify("✅ Copied as HTML!", { timeout: 2000 });
                } else {
                  setCopyData(data);
                  setShowCopy("html");
                  figma.notify("📋 Text ready to copy below", {
                    timeout: 2000,
                  });
                }
              } catch (_err) {
                setCopyData(data);
                setShowCopy("html");
                figma.notify("📋 Text ready to copy below", { timeout: 2000 });
              }
            }}
            padding={{ horizontal: 8, vertical: 4 }}
            cornerRadius={4}
            stroke={tokens.panelStroke}
            strokeWidth={1}
            tooltip="Copy checklist as HTML"
          >
            <Text
              fill={tokens.textPrimary}
              fontSize={12}
              fontFamily="Anaheim"
              fontWeight={600}
            >
              HTML
            </Text>
          </AutoLayout>
        </AutoLayout>

        {/* Export Format Modal - shown below buttons when clipboard unavailable */}
        {showCopy && copyData && (
          <CopyDisplay
            copyData={copyData}
            format={showCopy}
            onClose={() => {
              setShowCopy(null);
              setCopyData("");
            }}
            colors={{
              textPrimary: tokens.textPrimary,
              panelBg: tokens.panelBg,
              buttonBg: tokens.headerBg,
            }}
          />
        )}

        <ProgressBar
          total={total}
          completed={completed}
          parentWidth={parentWidth}
          colors={{ track: tokens.progressBg, fill: tokens.progressFill }}
        />
        <Text
          name="ProgressText"
          fill={tokens.textPrimary}
          lineHeight="100%"
          fontFamily="Anaheim"
          fontSize={18}
          fontWeight={600}
        >
          {String(progressText || `${completed} of ${total} checks done`)}
        </Text>
        {templateFilteredSections.length === 0 ? (
          <Text
            fill={tokens.textPrimary}
            fontSize={14}
            fontFamily="Anaheim"
            opacity={0.5}
            width="fill-parent"
            horizontalAlignText="center"
          >
            {String(t.noResults || "No items found")}
          </Text>
        ) : (
          templateFilteredSections.map((section) => (
            <ChecklistSection
              key={section.id}
              section={section}
              taskCompletion={taskCompletion}
              handleCheckChange={handleCheckChange}
              tooltipsEnabled={tooltipsEnabled}
              hideCompleted={hideCompleted}
              isHighlighted={false}
              colors={{
                textPrimary: tokens.textPrimary,
                sectionDescBg: effectiveDark ? "#2A2A2A" : "#F3F4FC",
                sectionDescText: tokens.textPrimary,
                progressTracker: {
                  bg: tokens.progressBg,
                  text: tokens.headerText,
                },
                checkbox: {
                  bgChecked: tokens.checkboxBgChecked,
                  bgUnchecked: tokens.checkboxBgUnchecked,
                  stroke: tokens.checkboxStroke,
                },
                badge: tokens.wcagBadge,
              }}
            />
          ))
        )}
      </AutoLayout>
    </AutoLayout>
  );
}

export default ChecklistPanel;
