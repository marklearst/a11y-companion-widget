/**
 * Hook for managing quick copy functionality.
 *
 * @remarks
 * Provides functions to copy accessibility specs in various formats.
 *
 * @since 1.2.0
 */
import type { ChecklistSectionType, ChecklistItemType } from "types";
import { parseInlineMarkup, segmentsToMarkdown } from "logic/inlineMarkup";
import { getWcagCriteriaCodesByLevel } from "logic/wcag";

const WCAG_LEVEL_ORDER = ["A", "AA", "AAA"] as const;

function normalizeLevel(value: string | null | undefined) {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return WCAG_LEVEL_ORDER.includes(normalized as (typeof WCAG_LEVEL_ORDER)[number])
    ? (normalized as (typeof WCAG_LEVEL_ORDER)[number])
    : null;
}

function parseWcagCode(wcag: string | undefined) {
  const match = wcag?.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

/**
 * Formats checklist data for copying in various formats.
 *
 * @example
 * ```ts
 * const { copyAsMarkdown } = useQuickCopy()
 * ```
 */
export function useQuickCopy() {
  const toMarkdown = (text?: string) => {
    if (!text) return "";
    return segmentsToMarkdown(parseInlineMarkup(text));
  };

  /**
   * Copies a single item as formatted text.
   */
  const copyItemAsMarkdown = (item: ChecklistItemType): string => {
    let markdown = `### ${toMarkdown(item.text)}\n\n`;
    if (item.wcag) {
      markdown += `**WCAG**: ${item.wcag}\n\n`;
    }
    if (item.longDescription) {
      markdown += `${toMarkdown(item.longDescription)}\n\n`;
    }
    return markdown;
  };

  /**
   * Copies a section as Markdown.
   */
  const copySectionAsMarkdown = (
    section: ChecklistSectionType,
    taskCompletion: Record<string, boolean>
  ): string => {
    let markdown = `## ${toMarkdown(section.title)}\n\n`;
    if (section.description) {
      markdown += `${toMarkdown(section.description)}\n\n`;
    }

    const completed = section.items.filter(
      (item) => taskCompletion[item.id]
    ).length;
    markdown += `**Progress**: ${completed}/${section.items.length} complete\n\n`;

    section.items.forEach((item) => {
      const status = taskCompletion[item.id] ? "✅" : "⬜";
      markdown += `${status} ${toMarkdown(item.text)}`;
      if (item.wcag) {
        markdown += ` _(${item.wcag})_`;
      }
      markdown += "\n";
      if (item.longDescription) {
        markdown += `   ${toMarkdown(item.longDescription)}\n`;
      }
      markdown += "\n";
    });

    return markdown;
  };

  const buildWcagLevelSummary = (sections: ChecklistSectionType[]) => {
    const itemCountByLevel = {
      A: 0,
      AA: 0,
      AAA: 0,
    };
    const criteriaByLevel = {
      A: new Set<string>(),
      AA: new Set<string>(),
      AAA: new Set<string>(),
    };

    for (const section of sections) {
      for (const item of section.items) {
        const level = normalizeLevel(item.level ?? null);
        if (!level) continue;

        itemCountByLevel[level] += 1;
        const code = parseWcagCode(item.wcag);
        if (code) {
          criteriaByLevel[level].add(code);
        }
      }
    }

    const hasAnyLevel = WCAG_LEVEL_ORDER.some(
      (level) => itemCountByLevel[level] > 0
    );
    if (!hasAnyLevel) return "";

    let markdown = `**WCAG Level Coverage**\n`;
    for (const level of WCAG_LEVEL_ORDER) {
      const definedCriteria = getWcagCriteriaCodesByLevel(level);
      markdown += `- ${level}: ${itemCountByLevel[level]} items, ${criteriaByLevel[level].size}/${definedCriteria.length} criteria referenced\n`;
    }

    return `${markdown}\n`;
  };

  /**
   * Copies entire checklist as Markdown.
   */
  const copyAllAsMarkdown = (
    sections: ChecklistSectionType[],
    taskCompletion: Record<string, boolean>,
    title: string,
    completed: number,
    total: number
  ): string => {
    let markdown = `# ${toMarkdown(title)}\n\n`;
    markdown += `**Overall Progress**: ${completed}/${total} checks complete (${Math.round(
      (completed / total) * 100
    )}%)\n\n`;
    markdown += buildWcagLevelSummary(sections);
    markdown += `---\n\n`;

    sections.forEach((section) => {
      markdown += copySectionAsMarkdown(section, taskCompletion);
      markdown += `---\n\n`;
    });

    return markdown;
  };

  /**
   * Copies to clipboard (uses Figma's native copy).
   */
  const copyToClipboard = async (text: string) => {
    try {
      // Figma doesn't have direct clipboard access in widgets
      // Return the text for display in a copyable input
      return text;
    } catch (error) {
      console.error("Failed to copy:", error);
      return text;
    }
  };

  return {
    copyItemAsMarkdown,
    copySectionAsMarkdown,
    copyAllAsMarkdown,
    copyToClipboard,
  };
}
