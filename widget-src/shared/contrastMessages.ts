import { getMessages } from "i18n";
import type { Locale } from "i18n";

export type ContrastUnsupportedReason =
  | "image"
  | "two-gradients"
  | "mixed-fills"
  | "multi-fills"
  | "no-pair"
  | "no-selection"
  | "stale-selection";

export function getContrastNotice(
  reason: ContrastUnsupportedReason,
  locale: Locale = "en",
): string {
  const messages = getMessages(locale);
  return (
    messages.contrastNotices[reason] ?? messages.contrastNotices["no-selection"]
  );
}
