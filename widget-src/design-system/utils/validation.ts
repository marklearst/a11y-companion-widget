/**
 * Design System Validation Utilities
 *
 * Validate design system tokens for WCAG compliance and consistency.
 * Generate reports for theme validation and color accessibility.
 */

import { lightTheme, darkTheme, colors } from "../primitives/color";
import { hexToRgb } from "./colorConversion";
import {
  calculateContrastRatio,
  isCompliantAA,
  isCompliantAAA,
} from "./contrast";
import { isAccessibleForAll } from "./colorBlindness";

// ============================================
// Theme Validation
// ============================================

/**
 * Theme validation result
 */
export interface ThemeValidationIssue {
  label: string;
  foreground: string;
  background: string;
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  recommendation: string;
}

/**
 * Complete theme validation report
 */
export interface ThemeValidationReport {
  theme: "light" | "dark";
  totalCombinations: number;
  passedAA: number;
  passedAAA: number;
  failedAA: ThemeValidationIssue[];
  warnings: ThemeValidationIssue[];
}

/**
 * Validate all text/background combinations in a theme
 *
 * @param theme - Theme mode to validate
 * @returns Validation report
 */
export function validateThemeContrast(
  theme: "light" | "dark",
): ThemeValidationReport {
  const themeColors = theme === "light" ? lightTheme : darkTheme;
  const issues: ThemeValidationIssue[] = [];
  const warnings: ThemeValidationIssue[] = [];
  let totalCombinations = 0;
  let passedAA = 0;
  let passedAAA = 0;

  // Test all text colors against all background colors
  const textColors = [
    { label: "text.primary", color: themeColors.text.primary },
    { label: "text.secondary", color: themeColors.text.secondary },
    { label: "text.tertiary", color: themeColors.text.tertiary },
  ];

  const backgrounds = [
    { label: "background.primary", color: themeColors.background.primary },
    { label: "background.secondary", color: themeColors.background.secondary },
    { label: "background.tertiary", color: themeColors.background.tertiary },
  ];

  for (const text of textColors) {
    for (const bg of backgrounds) {
      const fgRgb = hexToRgb(text.color);
      const bgRgb = hexToRgb(bg.color);

      if (!fgRgb || !bgRgb) continue;

      totalCombinations++;
      const ratio = calculateContrastRatio(fgRgb, bgRgb);
      const passAA = isCompliantAA(ratio, false);
      const passAAA = isCompliantAAA(ratio, false);

      if (passAA) passedAA++;
      if (passAAA) passedAAA++;

      const label = `${text.label} on ${bg.label}`;

      if (!passAA) {
        issues.push({
          label,
          foreground: text.color,
          background: bg.color,
          ratio,
          passAA,
          passAAA,
          recommendation: `Increase contrast to at least 4.5:1 (currently ${ratio.toFixed(2)}:1)`,
        });
      } else if (!passAAA) {
        warnings.push({
          label,
          foreground: text.color,
          background: bg.color,
          ratio,
          passAA,
          passAAA,
          recommendation: `Consider increasing contrast to 7:1 for AAA compliance (currently ${ratio.toFixed(2)}:1)`,
        });
      }
    }
  }

  return {
    theme,
    totalCombinations,
    passedAA,
    passedAAA,
    failedAA: issues,
    warnings,
  };
}

// ============================================
// Color Scale Validation
// ============================================

/**
 * Color pair combination result
 */
export interface ColorCombinationResult {
  foregroundLabel: string;
  foregroundColor: string;
  backgroundLabel: string;
  backgroundColor: string;
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  accessibleForAll: boolean;
}

/**
 * Validate all color combinations in design system
 *
 * Tests all color scale values against each other to find
 * accessible combinations.
 *
 * @returns Array of all color combination results
 */
export function validateAllColorCombinations(): ColorCombinationResult[] {
  const results: ColorCombinationResult[] = [];

  // Get all color scales
  const scales = [
    { name: "indigo", scale: colors.indigo },
    { name: "purple", scale: colors.purple },
    { name: "gray", scale: colors.gray },
    { name: "slate", scale: colors.slate },
    { name: "green", scale: colors.green },
    { name: "amber", scale: colors.amber },
    { name: "red", scale: colors.red },
    { name: "blue", scale: colors.blue },
  ];

  // Test each color against each background
  for (const fgScale of scales) {
    const fgShades = Object.keys(fgScale.scale) as unknown as Array<
      keyof typeof fgScale.scale
    >;
    for (const fgShade of fgShades) {
      const fgColor = fgScale.scale[fgShade];
      const fgRgb = hexToRgb(fgColor);
      if (!fgRgb) continue;

      for (const bgScale of scales) {
        const bgShades = Object.keys(bgScale.scale) as unknown as Array<
          keyof typeof bgScale.scale
        >;
        for (const bgShade of bgShades) {
          const bgColor = bgScale.scale[bgShade];
          const bgRgb = hexToRgb(bgColor);
          if (!bgRgb) continue;

          const ratio = calculateContrastRatio(fgRgb, bgRgb);
          const passAA = isCompliantAA(ratio, false);
          const passAAA = isCompliantAAA(ratio, false);
          const accessibleForAll = isAccessibleForAll(fgRgb, bgRgb, false);

          results.push({
            foregroundLabel: `${fgScale.name}-${fgShade}`,
            foregroundColor: fgColor,
            backgroundLabel: `${bgScale.name}-${bgShade}`,
            backgroundColor: bgColor,
            ratio,
            passAA,
            passAAA,
            accessibleForAll,
          });
        }
      }
    }
  }

  return results;
}

/**
 * Find accessible color combinations
 *
 * Returns only combinations that pass WCAG AA for all vision types.
 *
 * @param minRatio - Minimum contrast ratio (default: 4.5 for AA)
 * @returns Array of accessible combinations
 */
export function findAccessibleCombinations(
  minRatio: number = 4.5,
): ColorCombinationResult[] {
  const allCombinations = validateAllColorCombinations();
  return allCombinations.filter(
    (combo) =>
      combo.passAA && combo.accessibleForAll && combo.ratio >= minRatio,
  );
}

// ============================================
// Compliance Reporting
// ============================================

/**
 * Comprehensive compliance report
 */
export interface ComplianceReport {
  generatedAt: string;
  lightTheme: ThemeValidationReport;
  darkTheme: ThemeValidationReport;
  totalColorCombinations: number;
  accessibleCombinationsAA: number;
  accessibleCombinationsAAA: number;
  accessibleForAllVisionTypes: number;
  summary: {
    lightThemeCompliance: number; // Percentage
    darkThemeCompliance: number; // Percentage
    overallCompliance: number; // Percentage
  };
}

/**
 * Export complete compliance report
 *
 * Validates both themes and all color combinations.
 * Returns comprehensive report suitable for documentation.
 *
 * @returns Complete compliance report
 */
export function exportComplianceReport(): ComplianceReport {
  const lightReport = validateThemeContrast("light");
  const darkReport = validateThemeContrast("dark");
  const allCombinations = validateAllColorCombinations();

  const accessibleAA = allCombinations.filter((c) => c.passAA).length;
  const accessibleAAA = allCombinations.filter((c) => c.passAAA).length;
  const accessibleForAll = allCombinations.filter(
    (c) => c.accessibleForAll,
  ).length;

  const lightThemeCompliance =
    (lightReport.passedAA / lightReport.totalCombinations) * 100;
  const darkThemeCompliance =
    (darkReport.passedAA / darkReport.totalCombinations) * 100;
  const overallCompliance =
    ((lightReport.passedAA + darkReport.passedAA) /
      (lightReport.totalCombinations + darkReport.totalCombinations)) *
    100;

  return {
    generatedAt: new Date().toISOString(),
    lightTheme: lightReport,
    darkTheme: darkReport,
    totalColorCombinations: allCombinations.length,
    accessibleCombinationsAA: accessibleAA,
    accessibleCombinationsAAA: accessibleAAA,
    accessibleForAllVisionTypes: accessibleForAll,
    summary: {
      lightThemeCompliance,
      darkThemeCompliance,
      overallCompliance,
    },
  };
}

/**
 * Export compliance report as JSON
 *
 * @returns JSON string of compliance report
 */
export function exportComplianceReportJson(): string {
  const report = exportComplianceReport();
  return JSON.stringify(report, null, 2);
}

/**
 * Export compliance report as markdown
 *
 * @returns Markdown formatted report
 */
export function exportComplianceReportMarkdown(): string {
  const report = exportComplianceReport();

  let md = "# Design System Accessibility Compliance Report\n\n";
  md += `Generated: ${new Date(report.generatedAt).toLocaleString()}\n\n`;

  md += "## Summary\n\n";
  md += `- **Overall Compliance**: ${report.summary.overallCompliance.toFixed(1)}%\n`;
  md += `- **Light Theme Compliance**: ${report.summary.lightThemeCompliance.toFixed(1)}%\n`;
  md += `- **Dark Theme Compliance**: ${report.summary.darkThemeCompliance.toFixed(1)}%\n`;
  md += `- **Total Color Combinations**: ${report.totalColorCombinations}\n`;
  md += `- **Accessible (AA)**: ${report.accessibleCombinationsAA}\n`;
  md += `- **Accessible (AAA)**: ${report.accessibleCombinationsAAA}\n`;
  md += `- **Accessible for All Vision Types**: ${report.accessibleForAllVisionTypes}\n\n`;

  // Light theme issues
  if (report.lightTheme.failedAA.length > 0) {
    md += "## Light Theme Issues\n\n";
    md += "| Combination | Ratio | Status | Recommendation |\n";
    md += "|-------------|-------|--------|----------------|\n";
    report.lightTheme.failedAA.forEach((issue) => {
      md += `| ${issue.label} | ${issue.ratio.toFixed(2)}:1 | ❌ AA | ${issue.recommendation} |\n`;
    });
    md += "\n";
  }

  // Dark theme issues
  if (report.darkTheme.failedAA.length > 0) {
    md += "## Dark Theme Issues\n\n";
    md += "| Combination | Ratio | Status | Recommendation |\n";
    md += "|-------------|-------|--------|----------------|\n";
    report.darkTheme.failedAA.forEach((issue) => {
      md += `| ${issue.label} | ${issue.ratio.toFixed(2)}:1 | ❌ AA | ${issue.recommendation} |\n`;
    });
    md += "\n";
  }

  if (
    report.lightTheme.failedAA.length === 0 &&
    report.darkTheme.failedAA.length === 0
  ) {
    md += "## ✅ All Theme Colors Pass WCAG AA\n\n";
    md += "No accessibility issues found in theme color combinations.\n";
  }

  return md;
}
