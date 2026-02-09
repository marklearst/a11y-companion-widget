export type ContrastUnsupportedReason =
  | "image"
  | "two-gradients"
  | "mixed-fills"
  | "multi-fills"
  | "no-pair"
  | "no-selection"
  | "stale-selection";

const CONTRAST_NOTICES: Record<ContrastUnsupportedReason, string> = {
  image: "Image not supported.",
  "two-gradients": "Two gradients not supported.",
  "mixed-fills": "Mixed fill not supported.",
  "multi-fills": "Multiple fills not supported.",
  "no-pair": "No contrast pair found.",
  "no-selection": "No layer selected.",
  "stale-selection": "Selection changed. Check again.",
};

export function getContrastNotice(reason: ContrastUnsupportedReason): string {
  return CONTRAST_NOTICES[reason];
}
