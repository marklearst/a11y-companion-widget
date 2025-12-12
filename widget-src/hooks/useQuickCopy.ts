/**
 * Hook for managing quick copy functionality.
 *
 * @remarks
 * Provides functions to copy accessibility specs in various formats.
 *
 * @since 1.2.0
 */
import type { ChecklistSectionType, ChecklistItemType } from "types";

/**
 * Formats checklist data for copying in various formats.
 *
 * @example
 * ```ts
 * const { copyAsMarkdown, copyAsPlainText, copyAsHTML } = useQuickCopy()
 * ```
 */
export function useQuickCopy() {
  /**
   * Copies a single item as formatted text.
   */
  const copyItemAsMarkdown = (item: ChecklistItemType): string => {
    let markdown = `### ${item.text}\n\n`;
    if (item.wcag) {
      markdown += `**WCAG**: ${item.wcag}\n\n`;
    }
    if (item.longDescription) {
      markdown += `${item.longDescription}\n\n`;
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
    let markdown = `## ${section.title}\n\n`;
    if (section.description) {
      markdown += `${section.description}\n\n`;
    }

    const completed = section.items.filter(
      (item) => taskCompletion[item.id]
    ).length;
    markdown += `**Progress**: ${completed}/${section.items.length} complete\n\n`;

    section.items.forEach((item) => {
      const status = taskCompletion[item.id] ? "✅" : "⬜";
      markdown += `${status} ${item.text}`;
      if (item.wcag) {
        markdown += ` _(${item.wcag})_`;
      }
      markdown += "\n";
      if (item.longDescription) {
        markdown += `   ${item.longDescription}\n`;
      }
      markdown += "\n";
    });

    return markdown;
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
    let markdown = `# ${title}\n\n`;
    markdown += `**Overall Progress**: ${completed}/${total} checks complete (${Math.round(
      (completed / total) * 100
    )}%)\n\n`;
    markdown += `---\n\n`;

    sections.forEach((section) => {
      markdown += copySectionAsMarkdown(section, taskCompletion);
      markdown += `---\n\n`;
    });

    return markdown;
  };

  /**
   * Copies as plain text (for Slack, emails, etc.).
   */
  const copyAsPlainText = (
    sections: ChecklistSectionType[],
    taskCompletion: Record<string, boolean>,
    title: string,
    completed: number,
    total: number
  ): string => {
    let text = `${title}\n`;
    text += `Progress: ${completed}/${total} checks complete\n\n`;

    sections.forEach((section) => {
      const sectionCompleted = section.items.filter(
        (item) => taskCompletion[item.id]
      ).length;
      text += `${section.title} (${sectionCompleted}/${section.items.length})\n`;
      section.items.forEach((item) => {
        const status = taskCompletion[item.id] ? "[✓]" : "[ ]";
        text += `  ${status} ${item.text}\n`;
      });
      text += "\n";
    });

    return text;
  };

  /**
   * Copies as HTML (for wikis, documentation, etc.).
   */
  const copyAsHTML = (
    sections: ChecklistSectionType[],
    taskCompletion: Record<string, boolean>,
    title: string,
    completed: number,
    total: number
  ): string => {
    let html = `<h1>${title}</h1>\n`;
    html += `<p><strong>Progress:</strong> ${completed}/${total} checks complete (${Math.round(
      (completed / total) * 100
    )}%)</p>\n`;
    html += `<hr>\n\n`;

    sections.forEach((section) => {
      const sectionCompleted = section.items.filter(
        (item) => taskCompletion[item.id]
      ).length;
      html += `<h2>${section.title}</h2>\n`;
      if (section.description) {
        html += `<p>${section.description}</p>\n`;
      }
      html += `<p><strong>Section Progress:</strong> ${sectionCompleted}/${section.items.length}</p>\n`;
      html += `<ul>\n`;
      section.items.forEach((item) => {
        const status = taskCompletion[item.id] ? "✅" : "⬜";
        html += `  <li>${status} ${item.text}`;
        if (item.wcag) {
          html += ` <em>(${item.wcag})</em>`;
        }
        if (item.longDescription) {
          html += `<br><small>${item.longDescription}</small>`;
        }
        html += `</li>\n`;
      });
      html += `</ul>\n\n`;
    });

    return html;
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
    copyAsPlainText,
    copyAsHTML,
    copyToClipboard,
  };
}
