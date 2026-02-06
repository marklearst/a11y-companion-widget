import { gap, radius } from "../spacing";
import { fontSize, fontWeight, fontFamily } from "../primitives/typography";
import { borderWidth } from "../primitives/borders";
import { primitiveComponentVariables } from "./primitives";

export type OverlayThemeVariables = {
  panelBg: string;
  panelStroke: string;
  textPrimary: string;
  textSecondary: string;
  textStrong: string;
  progressFill: string;
};

export function createOverlayVariables(theme: OverlayThemeVariables) {
  return {
    colors: {
      panelBg: theme.panelBg,
      panelStroke: theme.panelStroke,
      textPrimary: theme.textPrimary,
      textSecondary: theme.textSecondary,
      textStrong: theme.textStrong,
      buttonBg: theme.progressFill,
      buttonText: theme.panelBg,
    },
    layout: {
      padding: gap.relaxed,
      spacing: gap.normal,
      compact: gap.compact,
      tight: gap.tight,
      outlineWidth: borderWidth.base,
      radius: radius.lg,
      closeRadius: primitiveComponentVariables.overlayHeader.closeRadius,
      closePaddingX: gap.compact,
      closePaddingY: gap.tight,
      headerSpacerHeight: primitiveComponentVariables.overlayHeader.spacerHeight,
    },
    text: {
      title: {
        fontFamily: fontFamily.sans,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
      },
      display: {
        fontFamily: fontFamily.sans,
        fontSize: fontSize["5xl"],
        fontWeight: fontWeight.semibold,
      },
      body: {
        fontFamily: fontFamily.sans,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
      },
      helper: {
        fontFamily: fontFamily.sans,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
      },
      mono: {
        fontFamily: fontFamily.mono,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.normal,
      },
    },
    button: {
      paddingX: gap.comfortable,
      paddingY: gap.compact,
      radius: radius.sm,
      strokeWidth: borderWidth.thin,
    },
    swatch: {
      width: 60,
      height: 40,
      radius: radius.sm,
      strokeWidth: borderWidth.thin,
    },
    suggestion: {
      padding: gap.normal,
      radius: radius.sm,
      opacity: 0.05,
    },
  } as const;
}

/**
 * @deprecated Use `createOverlayVariables`.
 */
export const createOverlayTokens = createOverlayVariables;

export type OverlayVariables = ReturnType<typeof createOverlayVariables>;

/**
 * @deprecated Use `OverlayVariables`.
 */
export type OverlayTokens = OverlayVariables;

/**
 * @deprecated Use `OverlayThemeVariables`.
 */
export type OverlayThemeTokens = OverlayThemeVariables;
