const { widget } = figma;
const { useSyncedState } = widget;

// Type declaration for navigator (available in Figma widget runtime)
declare const navigator: {
  clipboard?: {
    writeText: (text: string) => Promise<void>;
  };
};

import { useQuickCopy } from "hooks/useQuickCopy";
import type { ChecklistSectionType } from "types";
import type { Messages } from "i18n";

type UseMarkdownExportOptions = {
  sections: ChecklistSectionType[];
  taskCompletion: Record<string, boolean>;
  title: string;
  completed: number;
  total: number;
  messages: Messages;
};

export function useMarkdownExport(options: UseMarkdownExportOptions) {
  const { sections, taskCompletion, title, completed, total, messages } =
    options;
  const { copyAllAsMarkdown } = useQuickCopy();
  const [showCopy, setShowCopy] = useSyncedState<"markdown" | null>(
    "showCopy",
    null
  );
  const [copyData, setCopyData] = useSyncedState<string>("copyData", "");

  const handleExport = async (_format?: "markdown") => {
    const data = copyAllAsMarkdown(
      sections,
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
        setShowCopy(null);
        setCopyData("");
        figma.notify(messages.copiedMarkdown, { timeout: 2000 });
      } else {
        setCopyData(data);
        setShowCopy("markdown");
        figma.notify(messages.copyReady, { timeout: 2000 });
      }
    } catch (_err) {
      setCopyData(data);
      setShowCopy("markdown");
      figma.notify(messages.copyReady, { timeout: 2000 });
    }
  };

  const closeCopy = () => {
    setShowCopy(null);
    setCopyData("");
  };

  return {
    showCopy,
    copyData,
    handleExport,
    closeCopy,
  };
}
