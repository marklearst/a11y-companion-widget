import { build } from "esbuild";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();

const REQUIRED_PAIRS = [
  {
    label: "headerText on headerBg",
    foreground: "headerText",
    background: "headerBg",
    largeText: true,
  },
  {
    label: "textPrimary on panelBg",
    foreground: "textPrimary",
    background: "panelBg",
    largeText: false,
  },
  {
    label: "textSecondary on panelBg",
    foreground: "textSecondary",
    background: "panelBg",
    largeText: false,
  },
  {
    label: "textStrong on panelBg",
    foreground: "textStrong",
    background: "panelBg",
    largeText: false,
  },
  {
    label: "wcagBadgeText on wcagBadge",
    foreground: "wcagBadgeText",
    background: "wcagBadge",
    largeText: false,
  },
  {
    label: "panelBg on progressFill",
    foreground: "panelBg",
    background: "progressFill",
    largeText: false,
  },
  {
    label: "progressFill on panelBg",
    foreground: "progressFill",
    background: "panelBg",
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

async function evaluateContrast(extraAccents) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "a11y-contrast-aa-"));
  const bundlePath = path.join(tempDir, "check-contrast-aa.bundle.cjs");

  const entry = `
    import { resolveTheme, themePresets } from "./widget-src/theme/index";
    import { calculateContrastRatioHex, WCAG_AA } from "./widget-src/design-system/utils/contrast";

    const requiredPairs = ${compact(REQUIRED_PAIRS)};
    const extraAccents = ${compact(extraAccents)};

    const accentRegex = /^#(?:[0-9a-fA-F]{6})$/;
    const normalizedExtraAccents = extraAccents
      .map((value) => String(value || "").trim())
      .filter((value) => accentRegex.test(value))
      .map((value) => value.toUpperCase());

    const presetNames = Object.keys(themePresets);
    const presetAccentValues = presetNames
      .map((name) => themePresets[name].lightTheme.progressFill)
      .filter((value, index, array) => array.indexOf(value) === index);

    const accentsToTest = [
      null,
      ...presetAccentValues,
      ...normalizedExtraAccents,
    ].filter((value, index, array) => array.indexOf(value) === index);

    const results = [];

    for (const preset of presetNames) {
      for (const mode of ["light", "dark"]) {
        for (const accent of accentsToTest) {
          const themeVariables = resolveTheme(
            mode === "dark",
            preset,
            accent === null ? undefined : accent,
          );

          for (const pair of requiredPairs) {
            const foreground = themeVariables[pair.foreground];
            const background = themeVariables[pair.background];
            const threshold = pair.largeText ? WCAG_AA.large : WCAG_AA.normal;
            const ratio = calculateContrastRatioHex(foreground, background);

            const validRatio = typeof ratio === "number";
            const passAA = validRatio ? ratio >= threshold : false;

            results.push({
              preset,
              mode,
              accent,
              pair: pair.label,
              foreground,
              background,
              ratio: validRatio ? Number(ratio.toFixed(3)) : null,
              threshold,
              largeText: pair.largeText,
              passAA,
            });
          }
        }
      }
    }

    const failures = results.filter((entry) => !entry.passAA);
    const summary = {
      totalChecks: results.length,
      totalFailures: failures.length,
      passRate: Number(((results.length - failures.length) / results.length * 100).toFixed(2)),
      presets: presetNames,
      accentsTested: accentsToTest,
    };

    console.log(JSON.stringify({ summary, failures, results }));
  `;

  try {
    await build({
      stdin: {
        contents: entry,
        resolveDir: ROOT,
        sourcefile: "check-contrast-aa-entry.ts",
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
        `Failed to execute contrast script.\n${run.stderr || ""}`
      );
    }

    const stdout = (run.stdout || "").trim();
    if (!stdout) {
      throw new Error("Contrast script produced no output.");
    }

    return JSON.parse(stdout);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function printHumanReadable(report) {
  const { summary, failures } = report;
  console.log(
    `Contrast AA check: ${summary.totalChecks - summary.totalFailures}/${summary.totalChecks} passed (${summary.passRate}%)`
  );
  console.log(`Presets tested: ${summary.presets.join(", ")}`);
  console.log(
    `Accent overrides tested: ${summary.accentsTested
      .map((value) => value ?? "(none)")
      .join(", ")}`
  );

  if (failures.length === 0) {
    console.log("All required variable pairs pass WCAG AA.");
    return;
  }

  console.log("\nFailures:");
  failures.slice(0, 50).forEach((failure) => {
    const accentLabel = failure.accent ?? "(none)";
    const ratioText = failure.ratio === null ? "n/a" : `${failure.ratio}:1`;
    console.log(
      `- [${failure.preset}/${failure.mode}/accent:${accentLabel}] ${failure.pair}: ${ratioText} (required ${failure.threshold}:1)`
    );
  });

  if (failures.length > 50) {
    console.log(`... ${failures.length - 50} additional failures omitted`);
  }
}

async function main() {
  const { extraAccents, json } = parseArgs();
  const report = await evaluateContrast(extraAccents);

  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReadable(report);
  }

  if (report.summary.totalFailures > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
