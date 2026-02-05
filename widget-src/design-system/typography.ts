/**
 * Typography system for A11y Companion Widget
 *
 * @remarks
 * Centralized font sizes, weights, line heights, and letter spacing.
 * All values optimized for accessibility and readability.
 */

export const typography = {
  /**
   * Font family stack
   */
  fontFamily: {
    primary: "Inter",
    fallback: "system-ui, -apple-system, sans-serif",
  },

  /**
   * Font sizes - optimized for readability at 100% zoom
   */
  fontSize: {
    // Header & titles
    headerTitle: 30,
    sectionTitle: 22,

    // Body text
    checklistItem: 19,
    sectionDescription: 16,
    progressText: 20,

    // UI elements
    badge: 13,
    button: 13,
    label: 13,
    input: 16,
    progressTracker: 16,

    // Small text
    caption: 12,
    metadata: 11,
  },

  /**
   * Font weights - semantic naming
   */
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  /**
   * Line heights - percentage values
   */
  lineHeight: {
    tight: "120%",
    normal: "140%",
    relaxed: "160%",
    loose: "180%",
  },

  /**
   * Letter spacing - for fine-tuning readability
   */
  letterSpacing: {
    tighter: -0.5,
    tight: -0.3,
    normal: 0,
    wide: 0.3,
    wider: 0.5,
  },
} as const;

export type Typography = typeof typography;
