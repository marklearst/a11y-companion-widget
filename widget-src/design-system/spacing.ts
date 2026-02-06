/**
 * Spacing and layout system for A11y Companion Widget
 *
 * @remarks
 * Centralized spacing scale using 4px base unit.
 * Provides consistent rhythm throughout the widget.
 */

/**
 * Base unit for spacing calculations (4px)
 */
const BASE_UNIT = 4;

/**
 * Spacing scale - multiples of base unit
 */
export const spacing = {
  none: 0,
  // Micro spacing (4-8px)
  xxs: BASE_UNIT * 1, // 4px
  xs: BASE_UNIT * 2, // 8px

  // Small spacing (12-16px)
  sm: BASE_UNIT * 3, // 12px
  md: BASE_UNIT * 4, // 16px

  // Medium spacing (20-24px)
  lg: BASE_UNIT * 5, // 20px
  xl: BASE_UNIT * 6, // 24px

  // Large spacing (28-32px)
  xxl: BASE_UNIT * 7, // 28px
  xxxl: BASE_UNIT * 8, // 32px

  // Extra large (40-48px)
  huge: BASE_UNIT * 10, // 40px
  massive: BASE_UNIT * 12, // 48px
} as const;

/**
 * Padding presets for common components
 */
export const padding = {
  // Buttons and interactive elements
  button: {
    horizontal: spacing.md, // 16px
    vertical: spacing.xs, // 8px
  },

  buttonSmall: {
    horizontal: spacing.sm, // 12px
    vertical: spacing.xxs, // 4px
  },

  buttonLarge: {
    horizontal: spacing.lg, // 20px
    vertical: spacing.sm, // 12px
  },

  // Input fields
  input: {
    horizontalNone: spacing.none, // 0px
    horizontal: spacing.md, // 16px
    vertical: spacing.xs, // 8px
  },

  // Cards and containers
  card: {
    all: spacing.xl, // 24px
  },

  cardSmall: {
    all: spacing.md, // 16px
  },

  // Checklist items
  checklistItem: {
    horizontal: 14,
    vertical: spacing.sm, // 12px
  },

  // Sections
  section: {
    horizontal: spacing.md, // 16px
    vertical: spacing.sm, // 12px
  },

  sectionDescription: {
    horizontal: spacing.md, // 16px
    vertical: spacing.xs, // 8px
  },

  // Header
  header: {
    horizontal: spacing.xl, // 24px
    vertical: spacing.sm, // 12px
  },

  // Main panel
  panel: {
    horizontal: spacing.xl, // 24px
    vertical: 0,
  },

  // Badge
  badge: {
    horizontal: spacing.none, // 0px
    vertical: spacing.xxs, // 4px
  },

  // Progress tracker
  progressTracker: {
    horizontal: spacing.xs, // 8px
    vertical: spacing.xxs, // 4px
  },

  // Bulk action checkbox
  bulkAction: {
    all: spacing.xxs, // 4px
  },
} as const;

/**
 * Layout spacing - gaps between elements
 */
export const gap = {
  zero: spacing.none, // 0px
  // Tight grouping
  tight: spacing.xxs, // 4px
  compact: spacing.xs, // 8px

  // Normal spacing
  normal: spacing.sm, // 12px
  comfortable: spacing.md, // 16px

  // Loose spacing
  relaxed: spacing.lg, // 20px
  spacious: spacing.xl, // 24px

  // Section-level spacing
  section: spacing.xxl, // 28px
  major: spacing.xxxl, // 32px
} as const;

/**
 * Border radius scale
 */
export const radius = {
  none: 0,
  xxs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  x2l: 16,
  x3l: 20,
  x4l: 24,
  x5l: 28,
  x6l: 32,
  x7l: 36,
  x8l: 40,
  x9l: 44,
  x10l: 48,
  full: 999, // Pill shape
} as const;

/**
 * Component sizes
 */
export const sizes = {
  checkbox: {
    width: 16,
    height: 16,
  },

  icon: {
    small: 18,
    medium: 20,
    large: 24,
  },

  progressBar: {
    height: 12,
  },
  progressTextWidth: 120,
  progressBarMinWidth: 200,

  header: {
    height: 72,
  },

  widget: {
    width: 400,
  },

  progressTracker: {
    minWidth: 60,
  },
} as const;

export type Spacing = typeof spacing;
export type Padding = typeof padding;
export type Gap = typeof gap;
export type Radius = typeof radius;
export type Sizes = typeof sizes;
