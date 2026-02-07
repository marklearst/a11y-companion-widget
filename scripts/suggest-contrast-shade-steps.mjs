import { build } from "esbuild";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();

const REQUIRED_PAIRS = [
  {
    label: "headerText on headerBg",
    foregroundKey: "headerText",
    backgroundKey: "headerBg",
    largeText: true,
  },
  {
    label: "textPrimary on panelBg",
    foregroundKey: "textPrimary",
    backgroundKey: "panelBg",
    largeText: false,
  },
  {
    label: "textSecondary on panelBg",
    foregroundKey: "textSecondary",
    backgroundKey: "panelBg",
    largeText: false,
  },
  {
    label: "textStrong on panelBg",
    foregroundKey: "textStrong",
    backgroundKey: "panelBg",
    largeText: false,
  },
  {
    label: "wcagBadgeText on wcagBadge",
    foregroundKey: "wcagBadgeText",
    backgroundKey: "wcagBadge",
    largeText: false,
  },
  {
    label: "panelBg on progressFill",
    foregroundKey: "panelBg",
    backgroundKey: "progressFill",
    largeText: false,
  },
  {
    label: "progressFill on panelBg",
    foregroundKey: "progressFill",
    backgroundKey: "panelBg",
    largeText: false,
  },
];

function parseArgs() {
  const args = process.argv.slice(2);
  const extraAccents = [];
  let json = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--json") {
      json = true;
      continue;
    }

    if (arg === "--accent") {
      const value = args[i + 1];
      if (!value) {
        throw new Error("Missing value for --accent");
      }
      extraAccents.push(value);
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { extraAccents, json };
}

function compact(value) {
  return JSON.stringify(value).replace(/<\\\//g, "</");
}

async function evaluateSuggestions(extraAccents) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "a11y-contrast-steps-"));
  const bundlePath = path.join(tempDir, "suggest-contrast-shade-steps.bundle.cjs");

  const entry = `
    import { resolveTheme, themePresets } from "./widget-src/theme/index";
    import { calculateContrastRatioHex, WCAG_AA } from "./widget-src/design-system/utils/contrast";

    const requiredPairs = ${compact(REQUIRED_PAIRS)};
    const extraAccents = ${compact(extraAccents)};
    const accentRegex = /^#(?:[0-9a-fA-F]{6})$/;

    function normalizeHex(value) {
      if (typeof value !== "string") return null;
      const normalized = value.trim().toUpperCase();
      return accentRegex.test(normalized) ? normalized : null;
    }

    function parseHex(hex) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ];
    }

    function colorDistance(hexA, hexB) {
      const [ar, ag, ab] = parseHex(hexA);
      const [br, bg, bb] = parseHex(hexB);
      return Math.sqrt(
        (ar - br) * (ar - br) +
        (ag - bg) * (ag - bg) +
        (ab - bb) * (ab - bb),
      );
    }

    function dedupe(values) {
      const result = [];
      for (const value of values) {
        if (!result.includes(value)) result.push(value);
      }
      return result;
    }

    function findNearestScaleIndex(scale, color) {
      const exactIndex = scale.findIndex((entry) => entry.color === color);
      if (exactIndex >= 0) {
        return {
          index: exactIndex,
          exact: true,
          distance: 0,
        };
      }

      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let index = 0; index < scale.length; index += 1) {
        const distance = colorDistance(color, scale[index].color);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      }

      return {
        index: bestIndex,
        exact: false,
        distance: Number(bestDistance.toFixed(3)),
      };
    }

    const presetNames = Object.keys(themePresets);
    const presetAccentValues = presetNames
      .map((name) => normalizeHex(themePresets[name].lightTheme.progressFill))
      .filter((value) => value !== null);
    const normalizedExtraAccents = extraAccents
      .map((value) => normalizeHex(value))
      .filter((value) => value !== null);
    const accentsToTest = dedupe([null, ...presetAccentValues, ...normalizedExtraAccents]);

    const scenarioReports = [];
    const suggestions = [];
    const unresolved = [];

    for (const preset of presetNames) {
      const scale = Object.entries(themePresets[preset].brand.purple)
        .map(([shade, color]) => ({ shade: Number(shade), color: normalizeHex(color) }))
        .filter((entry) => entry.color !== null)
        .sort((a, b) => a.shade - b.shade);

      for (const mode of ["light", "dark"]) {
        for (const accent of accentsToTest) {
          const themeVariables = resolveTheme(
            mode === "dark",
            preset,
            accent === null ? undefined : accent,
          );

          const pairResults = requiredPairs.map((pair) => {
            const foreground = normalizeHex(themeVariables[pair.foregroundKey]);
            const background = normalizeHex(themeVariables[pair.backgroundKey]);
            const threshold = pair.largeText ? WCAG_AA.large : WCAG_AA.normal;
            const rawRatio =
              foreground && background
                ? calculateContrastRatioHex(foreground, background)
                : null;
            const ratio =
              typeof rawRatio === "number" ? Number(rawRatio.toFixed(3)) : null;
            const passAA = ratio !== null ? ratio >= threshold : false;

            return {
              label: pair.label,
              foregroundKey: pair.foregroundKey,
              backgroundKey: pair.backgroundKey,
              foreground,
              background,
              threshold,
              ratio,
              passAA,
            };
          });

          const failures = pairResults.filter((entry) => !entry.passAA);
          scenarioReports.push({
            preset,
            mode,
            accent,
            totalFailures: failures.length,
          });

          if (failures.length === 0) continue;

          const progressFailures = failures.filter(
            (entry) =>
              entry.foregroundKey === "progressFill" ||
              entry.backgroundKey === "progressFill",
          );

          if (progressFailures.length === 0) {
            unresolved.push({
              preset,
              mode,
              accent,
              reason: "No progressFill variable in failing pairs.",
              pairLabels: failures.map((entry) => entry.label),
            });
            continue;
          }

          if (scale.length === 0) {
            unresolved.push({
              preset,
              mode,
              accent,
              reason: "Preset does not expose a brand scale.",
              pairLabels: progressFailures.map((entry) => entry.label),
            });
            continue;
          }

          const accentInUse = normalizeHex(accent) ?? normalizeHex(themeVariables.progressFill);
          if (!accentInUse) {
            unresolved.push({
              preset,
              mode,
              accent,
              reason: "Unable to normalize accent color.",
              pairLabels: progressFailures.map((entry) => entry.label),
            });
            continue;
          }

          const reference = findNearestScaleIndex(scale, accentInUse);
          const referenceEntry = scale[reference.index];
          const groups = new Map();

          for (const failure of progressFailures) {
            const otherColor =
              failure.foregroundKey === "progressFill"
                ? failure.background
                : failure.foreground;
            if (!otherColor) continue;
            const key = otherColor + "|" + String(failure.threshold);
            if (!groups.has(key)) {
              groups.set(key, {
                otherColor,
                threshold: failure.threshold,
                pairLabels: [failure.label],
              });
            } else {
              groups.get(key).pairLabels.push(failure.label);
            }
          }

          for (const group of groups.values()) {
            const candidates = scale
              .map((entry, index) => {
                const rawRatio = calculateContrastRatioHex(entry.color, group.otherColor);
                const ratio =
                  typeof rawRatio === "number" ? Number(rawRatio.toFixed(3)) : null;
                return {
                  ...entry,
                  index,
                  ratio,
                  passAA: ratio !== null ? ratio >= group.threshold : false,
                };
              })
              .filter((entry) => entry.passAA && entry.ratio !== null);

            if (candidates.length === 0) {
              unresolved.push({
                preset,
                mode,
                accent,
                reason: "No shade in preset scale can satisfy required contrast.",
                pairLabels: group.pairLabels,
              });
              continue;
            }

            candidates.sort((a, b) => {
              const indexDeltaA = Math.abs(a.index - reference.index);
              const indexDeltaB = Math.abs(b.index - reference.index);
              if (indexDeltaA !== indexDeltaB) {
                return indexDeltaA - indexDeltaB;
              }

              const overshootA = Math.abs(a.ratio - group.threshold);
              const overshootB = Math.abs(b.ratio - group.threshold);
              if (overshootA !== overshootB) {
                return overshootA - overshootB;
              }

              return a.shade - b.shade;
            });

            const best = candidates[0];
            const shadeStep = best.shade - referenceEntry.shade;

            suggestions.push({
              preset,
              mode,
              accentInput: accent,
              accentInUse,
              targetVariable: "progressFill",
              compareAgainstColor: group.otherColor,
              requiredRatio: group.threshold,
              pairLabels: group.pairLabels,
              mappedReferenceShade: referenceEntry.shade,
              mappedReferenceColor: referenceEntry.color,
              mappedReferenceExact: reference.exact,
              mappedReferenceDistance: reference.distance,
              recommendedShade: best.shade,
              recommendedColor: best.color,
              recommendedRatio: best.ratio,
              shadeStep,
              shadeStepLabel: shadeStep > 0 ? "+" + String(shadeStep) : String(shadeStep),
            });
          }
        }
      }
    }

    const failingScenarios = scenarioReports.filter(
      (entry) => entry.totalFailures > 0,
    ).length;

    console.log(
      JSON.stringify({
        summary: {
          presets: presetNames,
          accentsTested: accentsToTest,
          totalScenarios: scenarioReports.length,
          failingScenarios,
          totalSuggestions: suggestions.length,
          totalUnresolved: unresolved.length,
        },
        suggestions,
        unresolved,
      }),
    );
  `;

  try {
    await build({
      stdin: {
        contents: entry,
        resolveDir: ROOT,
        sourcefile: "suggest-contrast-shade-steps-entry.ts",
        loader: "ts",
      },
      bundle: true,
      platform: "node",
      format: "cjs",
      target: "node18",
      outfile: bundlePath,
      logLevel: "silent",
    });

    const run = spawnSync(process.execPath, [bundlePath], {
      cwd: ROOT,
      encoding: "utf8",
    });

    if (run.status !== 0) {
      throw new Error(
        `Failed to execute contrast suggestion script.\n${run.stderr || ""}`,
      );
    }

    const stdout = (run.stdout || "").trim();
    if (!stdout) {
      throw new Error("Contrast suggestion script produced no output.");
    }

    return JSON.parse(stdout);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function sortSuggestions(suggestions) {
  return [...suggestions].sort((a, b) => {
    const presetDiff = a.preset.localeCompare(b.preset);
    if (presetDiff !== 0) return presetDiff;

    const modeDiff = a.mode.localeCompare(b.mode);
    if (modeDiff !== 0) return modeDiff;

    const accentA = a.accentInput ?? "";
    const accentB = b.accentInput ?? "";
    const accentDiff = accentA.localeCompare(accentB);
    if (accentDiff !== 0) return accentDiff;

    const ratioDiff = a.requiredRatio - b.requiredRatio;
    if (ratioDiff !== 0) return ratioDiff;

    return a.compareAgainstColor.localeCompare(b.compareAgainstColor);
  });
}

function printHumanReadable(report) {
  const { summary, suggestions, unresolved } = report;
  console.log(
    "Policy: WCAG 2.2 SC 1.4.3 (normal text >= 4.5:1, large text >= 3.0:1)."
  );
  console.log(
    "Scope: Suggestions are generated for text contrast failures only; decorative/incidental/logotype exceptions are excluded."
  );
  console.log(
    `Contrast shade-step suggestions: ${summary.totalSuggestions} proposal(s) across ${summary.failingScenarios}/${summary.totalScenarios} failing scenario(s).`,
  );
  console.log(`Presets: ${summary.presets.join(", ")}`);
  console.log(
    `Accent overrides tested: ${summary.accentsTested
      .map((value) => value ?? "(none)")
      .join(", ")}`,
  );

  if (suggestions.length === 0) {
    console.log("No shade-step proposals were generated.");
  } else {
    console.log("\nProposals:");
    const sortedSuggestions = sortSuggestions(suggestions);
    for (const suggestion of sortedSuggestions) {
      const accentLabel = suggestion.accentInput ?? "(none)";
      console.log(
        `- [${suggestion.preset}/${suggestion.mode}/accent:${accentLabel}] ${suggestion.targetVariable} -> shade ${suggestion.recommendedShade} (${suggestion.recommendedColor}), step ${suggestion.shadeStepLabel}, ratio ${suggestion.recommendedRatio}:1 (required ${suggestion.requiredRatio}:1)`,
      );
      console.log(`  pairs: ${suggestion.pairLabels.join(", ")}`);
      console.log(
        `  mapped reference: shade ${suggestion.mappedReferenceShade} (${suggestion.mappedReferenceColor}) from ${suggestion.accentInUse}`,
      );
      if (!suggestion.mappedReferenceExact) {
        console.log(
          `  note: accent mapped to nearest scale color (distance ${suggestion.mappedReferenceDistance}).`,
        );
      }
    }
  }

  if (unresolved.length > 0) {
    console.log(`\nUnresolved groups: ${unresolved.length}`);
    unresolved.slice(0, 20).forEach((entry) => {
      const accentLabel = entry.accent ?? "(none)";
      console.log(
        `- [${entry.preset}/${entry.mode}/accent:${accentLabel}] ${entry.reason} (${entry.pairLabels.join(", ")})`,
      );
    });
    if (unresolved.length > 20) {
      console.log(`... ${unresolved.length - 20} additional unresolved group(s) omitted`);
    }
  }
}

async function main() {
  const { extraAccents, json } = parseArgs();
  const report = await evaluateSuggestions(extraAccents);

  if (json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  printHumanReadable(report);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
