import { padding, gap, radius, sizes } from "../spacing";
import { fontSize, fontWeight, fontFamily } from "../primitives/typography";
import { borderWidth, borderRadius } from "../primitives/borders";
import { dimensions } from "../primitives/sizing";

export type ChecklistThemeVariables = {
  panelBg: string;
  panelStroke: string;
  headerBg: string;
  headerText: string;
  sectionDescBg: string;
  textPrimary: string;
  textSecondary: string;
  textStrong: string;
  progressBg: string;
  progressFill: string;
  checkboxBgChecked: string;
  checkboxBgUnchecked: string;
  checkboxStroke: string;
  wcagBadge: string;
  wcagBadgeText?: string;
  hoverBg?: string;
  hoverStroke?: string;
};

type ChecklistLayoutVariables = {
  panel: {
    width: number;
    paddingX: number;
    paddingBottom: number;
    radius: number;
    strokeWidth: number;
    spacing: number;
    effect?: WidgetJSX.Effect | WidgetJSX.Effect[];
  };
  header: {
    gap: number;
    paddingX: number;
    paddingY: number;
    height: number;
    logoSize: number;
    title: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      lineHeight: string;
      letterSpacing: number;
    };
    avatar: {
      size: number;
      radius: number;
      strokeWidth: number;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      stackOffsetX: number;
      maxVisible: number;
    };
  };
  search: {
    paddingX: number;
    paddingY: number;
    radius: number;
    fontSize: number;
    fontFamily: string;
    fontWeight: WidgetJSX.FontWeight;
    placeholderOpacity: number;
    bottomSpacing: number;
  };
  progress: {
    gap: number;
    paddingX: number;
    paddingTop: number;
    paddingBottom: number;
    barHeight: number;
    barRadius: number;
    minWidth: number;
    textMinWidth: number;
    textCharWidth: number;
    textColor?: string;
    countWidth?: number;
    labelGap?: number;
    text: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      letterSpacing: number;
      lineHeight: string;
    };
    label?: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      letterSpacing: number;
      lineHeight: string;
    };
    textOffsetY?: number;
  };
  section: {
    spacing: number;
    headerPaddingY: number;
    headerPaddingX: number;
    headerHeight: number;
    headerGap: number;
    headerRadius: number;
    caretSize: number;
    caretOffsetY: number;
    caretStrokeWidth: number;
    title: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      lineHeight: string;
    };
    bulkAction: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      padding: number;
      radius: number;
      gap: number;
    };
    description: {
      paddingX: number;
      paddingY: number;
      radius: number;
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      lineHeight: string;
    };
  };
  item: {
    paddingX: number;
    paddingY: number;
    gap: number;
    stackGap: number;
    radius: number;
    text: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      lineHeight: string;
    };
    description: {
      fontFamily: string;
      fontSize: number;
      fontWeight: WidgetJSX.FontWeight;
      lineHeight: string;
    };
  };
  inline: {
    code: { fontFamily: string; fontWeight: WidgetJSX.FontWeight };
    kbd: { fontFamily: string; fontWeight: WidgetJSX.FontWeight };
    strong: { fontWeight: WidgetJSX.FontWeight };
    em: { italic: boolean };
    link: {
      textDecoration: "underline" | "none";
      fontWeight?: WidgetJSX.FontWeight;
    };
  };
  checkbox: {
    size: number;
    radius: number;
    strokeWidth: number;
    offsetY: number;
  };
  badge: {
    paddingX: number;
    paddingY: number;
    radius: number;
    fontFamily: string;
    fontSize: number;
    fontWeight: WidgetJSX.FontWeight;
    iconSize: number;
    iconStrokeWidth: number;
    strokeWidth: number;
  };
  progressTracker: {
    paddingX: number;
    paddingY: number;
    radius: number;
    fontFamily: string;
    fontSize: number;
    fontWeight: WidgetJSX.FontWeight;
    gap: number;
  };
};

const companionLayout: ChecklistLayoutVariables = {
  panel: {
    width: sizes.widget.width,
    paddingX: padding.panel.horizontal,
    paddingBottom: gap.normal,
    radius: radius.lg,
    strokeWidth: borderWidth.base,
    spacing: gap.zero,
  },
  header: {
    gap: gap.compact,
    paddingX: padding.header.horizontal,
    paddingY: gap.compact,
    height: sizes.header.height,
    logoSize: sizes.icon.large,
    title: {
      fontFamily: "Assistant",
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      lineHeight: "130%",
      letterSpacing: -0.3,
    },
    avatar: {
      size: dimensions.avatarMd + 2,
      radius: borderRadius.full,
      strokeWidth: borderWidth.base,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
      stackOffsetX: -8,
      maxVisible: 5,
    },
  },
  search: {
    paddingX: padding.input.horizontal,
    paddingY: padding.input.vertical,
    radius: radius.md,
    fontSize: fontSize.md,
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    placeholderOpacity: 0.8,
    bottomSpacing: gap.compact,
  },
  progress: {
    gap: gap.zero,
    paddingX: padding.input.horizontalNone,
    paddingTop: gap.normal,
    paddingBottom: gap.normal,
    barHeight: sizes.progressBar.height,
    barRadius: radius.sm,
    minWidth: sizes.progressBarMinWidth,
    textMinWidth: sizes.progressTextWidth,
    textCharWidth: 7.5,
    text: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      letterSpacing: -0.2,
      lineHeight: "110%",
    },
    textOffsetY: 0,
  },
  section: {
    spacing: gap.tight,
    headerPaddingY: gap.compact,
    headerPaddingX: 12,
    headerHeight: 40,
    headerGap: gap.compact,
    headerRadius: radius.sm,
    caretSize: 10,
    caretOffsetY: 1,
    caretStrokeWidth: borderWidth.base,
    title: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.base,
      fontWeight: fontWeight.semibold,
      lineHeight: "140%",
    },
    bulkAction: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      padding: padding.bulkAction.all,
      radius: radius.sm,
      gap: gap.tight,
    },
    description: {
      paddingX: padding.sectionDescription.horizontal,
      paddingY: padding.sectionDescription.vertical,
      radius: radius.lg,
      fontFamily: fontFamily.sans,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: "150%",
    },
  },
  item: {
    paddingX: padding.checklistItem.horizontal,
    paddingY: padding.checklistItem.vertical,
    gap: gap.compact,
    stackGap: gap.compact,
    radius: radius.lg,
    text: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
      lineHeight: "150%",
    },
    description: {
      fontFamily: fontFamily.sans,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.medium,
      lineHeight: "150%",
    },
  },
  inline: {
    code: {
      fontFamily: fontFamily.mono,
      fontWeight: fontWeight.bold,
    },
    kbd: {
      fontFamily: fontFamily.mono,
      fontWeight: fontWeight.bold,
    },
    strong: {
      fontWeight: fontWeight.bold,
    },
    em: { italic: true },
    link: { textDecoration: "underline" },
  },
  checkbox: {
    size: sizes.checkbox.width,
    radius: radius.md,
    strokeWidth: borderWidth.base,
    offsetY: gap.tight / 2,
  },
  badge: {
    paddingX: padding.badge.horizontal,
    paddingY: padding.badge.vertical,
    radius: radius.md,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    iconSize: sizes.icon.small,
    iconStrokeWidth: 1.5,
    strokeWidth: borderWidth.thin,
  },
  progressTracker: {
    paddingX: padding.progressTracker.horizontal,
    paddingY: padding.progressTracker.vertical,
    radius: radius.full,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    gap: gap.compact,
  },
};

export function createChecklistVariables(theme: ChecklistThemeVariables) {
  const layout = companionLayout;
  return {
    colors: {
      panelBg: theme.panelBg,
      panelStroke: theme.panelStroke,
      headerBg: theme.headerBg,
      headerText: theme.headerText,
      sectionDescBg: theme.sectionDescBg,
      textPrimary: theme.textPrimary,
      textSecondary: theme.textSecondary,
      textStrong: theme.textStrong,
      progressBg: theme.progressBg,
      progressFill: theme.progressFill,
      checkboxBgChecked: theme.checkboxBgChecked,
      checkboxBgUnchecked: theme.checkboxBgUnchecked,
      checkboxStroke: theme.checkboxStroke,
      wcagBadge: theme.wcagBadge,
      wcagBadgeText: theme.wcagBadgeText ?? theme.panelBg,
      hoverBg: theme.hoverBg ?? `${theme.textPrimary}10`,
      hoverStroke: theme.hoverStroke ?? theme.panelStroke,
      itemBg: undefined,
    },
    panel: {
      width: layout.panel.width,
      paddingX: layout.panel.paddingX,
      paddingBottom: layout.panel.paddingBottom,
      radius: layout.panel.radius,
      strokeWidth: layout.panel.strokeWidth,
      // Keep panel chrome neutral so accent color stays focused on progress and links.
      strokeColor: theme.panelStroke,
      spacing: layout.panel.spacing,
      effect: layout.panel.effect,
    },
    header: {
      ...layout.header,
    },
    search: {
      ...layout.search,
    },
    progress: {
      ...layout.progress,
      textColor: theme.textPrimary,
    },
    section: {
      ...layout.section,
      headerFullClick: undefined,
      headerHoverBg: undefined,
    },
    item: {
      ...layout.item,
    },
    inline: {
      code: {
        ...layout.inline.code,
        fill: theme.progressFill,
      },
      kbd: {
        ...layout.inline.kbd,
        fill: theme.progressFill,
      },
      strong: layout.inline.strong,
      em: layout.inline.em,
      link: {
        fill: theme.progressFill,
        textDecoration: layout.inline.link.textDecoration,
        fontWeight: layout.inline.link.fontWeight,
      },
    },
    checkbox: {
      ...layout.checkbox,
    },
    badge: {
      ...layout.badge,
    },
    progressTracker: {
      ...layout.progressTracker,
    },
  } as const;
}

/**
 * @deprecated Use `createChecklistVariables`.
 */
export const createChecklistTokens = createChecklistVariables;

export type ChecklistVariables = ReturnType<typeof createChecklistVariables>;

/**
 * @deprecated Use `ChecklistVariables`.
 */
export type ChecklistTokens = ChecklistVariables;

/**
 * @deprecated Use `ChecklistThemeVariables`.
 */
export type ChecklistThemeTokens = ChecklistThemeVariables;
