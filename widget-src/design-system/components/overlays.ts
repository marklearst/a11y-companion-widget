import { gap, radius } from "../spacing";
import { fontSize, fontWeight, fontFamily } from "../primitives/typography";
import { borderWidth } from "../primitives/borders";

export type OverlayThemeTokens = {
  panelBg: string;
  panelStroke: string;
  textPrimary: string;
  textSecondary: string;
  textStrong: string;
  progressFill: string;
};

export function createOverlayTokens(theme: OverlayThemeTokens) {
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
      closeRadius: radius.sm,
      closePaddingX: gap.compact,
      closePaddingY: gap.tight,
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

export type OverlayTokens = ReturnType<typeof createOverlayTokens>;
