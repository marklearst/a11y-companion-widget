/**
 * Typography Primitive
 *
 * Mathematical type scale based on modular scale principles.
 *
 * Font sizes follow a near-perfect fourth scale (1.333) with adjustments
 * for practical pixel values:
 * 11, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48
 *
 * This creates:
 * - Clear visual hierarchy
 * - Proportional relationships
 * - Readable text at all sizes
 */

import type {
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
} from "../types/primitives";

/**
 * Font size scale
 *
 * @example
 * ```tsx
 * <Text fontSize={fontSize.base}>Body text</Text>
 * <Text fontSize={fontSize['2xl']}>Heading</Text>
 * ```
 */
export const fontSize: FontSize = {
  xs: 11, // Small labels, captions
  sm: 12, // Default small text
  base: 14, // Body text default
  md: 16, // Emphasized body
  lg: 18, // Large body, small headings
  xl: 20, // H4
  "2xl": 24, // H3
  "3xl": 28, // H2
  "4xl": 32, // H1
  "5xl": 40, // Display
  "6xl": 48, // Large display
} as const;

/**
 * Font weight scale
 *
 * Limited to weights that work well in Figma widgets.
 * Inter font family supports all these weights.
 */
export const fontWeight: FontWeight = {
  thin: 100, // Body text
  extralight: 200, // Body text
  light: 300, // Body text
  normal: 400, // Body text
  medium: 500, // Emphasis
  semibold: 600, // Strong emphasis
  bold: 700, // Headings
  extrabold: 800, // Display text
  black: 900, // Display text
} as const;

/**
 * Line height scale
 *
 * Unitless values for consistent vertical rhythm.
 * Smaller text gets taller line heights for readability.
 */
export const lineHeight: LineHeight = {
  none: 1.0, // Single line (badges, buttons)
  tight: 1.25, // Headings
  snug: 1.375, // Large text
  normal: 1.5, // Body text
  relaxed: 1.625, // Reading text
  loose: 2.0, // Spacious reading
} as const;

/**
 * Letter spacing scale
 *
 * Em-based for proportional scaling.
 * Negative for large text, positive for small caps/tracking.
 */
export const letterSpacing: LetterSpacing = {
  tighter: "-0.05em", // Large headings
  tight: "-0.025em", // Headings
  normal: "0", // Default
  wide: "0.025em", // Slight tracking
  wider: "0.05em", // All caps
  widest: "0.1em", // Extreme tracking
} as const;

/**
 * Font family tokens
 *
 * Figma widgets support Inter by default.
 * These tokens allow future font family changes.
 */
export const fontFamily = {
  sans: "Inter", // Default UI font
  mono: "Roboto Mono", // Cross-platform monospace available in Figma
} as const;

/**
 * Semantic typography styles
 *
 * Pre-composed styles for common text patterns.
 * These combine size, weight, and line height.
 *
 * @example
 * ```tsx
 * const styles = textStyles.body.md
 * <Text
 *   fontSize={styles.fontSize}
 *   fontWeight={styles.fontWeight}
 *   lineHeight={styles.lineHeight}
 * >
 * ```
 */
export const textStyles = {
  // Display text (hero sections)
  display: {
    lg: {
      fontSize: fontSize["6xl"], // 48px
      fontWeight: fontWeight.extrabold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tighter,
    },
    md: {
      fontSize: fontSize["5xl"], // 40px
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tighter,
    },
    sm: {
      fontSize: fontSize["4xl"], // 32px
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
  },

  // Headings
  heading: {
    h1: {
      fontSize: fontSize["4xl"], // 32px
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    h2: {
      fontSize: fontSize["3xl"], // 28px
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    h3: {
      fontSize: fontSize["2xl"], // 24px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
    h4: {
      fontSize: fontSize.xl, // 20px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
    h5: {
      fontSize: fontSize.lg, // 18px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    h6: {
      fontSize: fontSize.md, // 16px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Body text
  body: {
    lg: {
      fontSize: fontSize.lg, // 18px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.relaxed,
      letterSpacing: letterSpacing.normal,
    },
    md: {
      fontSize: fontSize.md, // 16px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    base: {
      fontSize: fontSize.base, // 14px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSize.sm, // 12px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    xs: {
      fontSize: fontSize.xs, // 11px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wide,
    },
  },

  // Labels and captions
  label: {
    lg: {
      fontSize: fontSize.base, // 14px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.none,
      letterSpacing: letterSpacing.normal,
    },
    md: {
      fontSize: fontSize.sm, // 12px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.none,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSize.xs, // 11px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.none,
      letterSpacing: letterSpacing.wide,
    },
  },

  // Code and monospace
  code: {
    lg: {
      fontSize: fontSize.base, // 14px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    md: {
      fontSize: fontSize.sm, // 12px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    sm: {
      fontSize: fontSize.xs, // 11px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
  },
} as const;
