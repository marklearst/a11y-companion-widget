import { borderRadius, borderWidth } from "../primitives/borders";
import { spacing } from "../primitives/spacing";
import { fontFamily, fontSize, fontWeight } from "../primitives/typography";

/**
 * Component-level variables for primitive UI elements.
 *
 * These values intentionally centralize defaults used by primitive components.
 * A few values are off-scale to preserve current visual output.
 */
export const componentPrimitives = {
  checkbox: {
    size: 16,
    radius: 6,
    strokeWidth: borderWidth.medium,
    checkmark: {
      width: 10,
      height: 8,
      strokeWidth: borderWidth.base,
    },
  },
  progressBar: {
    height: 12,
    radius: 2,
    minVisibleFillWidth: 1,
  },
  progressTracker: {
    gap: spacing[8],
    paddingX: spacing[8],
    paddingY: spacing[4],
    radius: 999,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  wcagBadge: {
    gap: spacing[4],
    paddingX: spacing[8],
    paddingY: spacing[4],
    radius: 6,
    iconSize: 14,
    iconStrokeWidth: borderWidth.base,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: "140%",
    letterSpacing: 0.2,
  },
  overlayHeader: {
    spacerHeight: spacing[16],
    closeRadius: borderRadius.sm,
  },
} as const;

export type ComponentPrimitives = typeof componentPrimitives;
