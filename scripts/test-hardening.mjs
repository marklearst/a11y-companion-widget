import { build } from "esbuild";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();

async function runHardeningChecks() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "a11y-hardening-"));
  const bundlePath = path.join(tempDir, "test-hardening.bundle.cjs");

  const entry = `
    import assert from "node:assert/strict";
    import { normalizeHexColor } from "./widget-src/shared/hexColor";
    import {
      inferThemePresetFromAccent,
      resolveTheme,
      themePresets,
    } from "./widget-src/theme/index";
    import { accentStepPolicy } from "./widget-src/design-system/theme/contrastPolicy";
    import {
      capAvatarIds,
      resolveAvatarStep,
      resolveAvatarStackWidth,
    } from "./widget-src/shared/avatarStack";

    assert.equal(normalizeHexColor("#abc"), "#AABBCC");
    assert.equal(normalizeHexColor("#a1b2c3"), "#A1B2C3");
    assert.equal(normalizeHexColor("  #0f0  "), "#00FF00");
    assert.equal(normalizeHexColor("#bad-input"), undefined);

    assert.equal(inferThemePresetFromAccent("#4E56A0"), "default");
    assert.equal(inferThemePresetFromAccent("#4F46E5"), "indigo");
    assert.equal(inferThemePresetFromAccent("#059669"), "emerald");
    assert.equal(inferThemePresetFromAccent("#E11D48"), "rose");
    assert.equal(inferThemePresetFromAccent("#475569"), "slate");
    assert.equal(inferThemePresetFromAccent("#0891B2"), "cyan");
    assert.equal(inferThemePresetFromAccent("#123456"), undefined);

    assert.deepEqual(capAvatarIds(["a", "b", "c"], 2), ["a", "b"]);
    assert.deepEqual(capAvatarIds(["a", "b", "c"], 0), []);
    assert.deepEqual(capAvatarIds(["a", "b"], 5), ["a", "b"]);
    assert.deepEqual(capAvatarIds(["a", "b"], -3), []);

    assert.equal(resolveAvatarStep(34, -8), 26);
    assert.equal(resolveAvatarStep(34, -40), 0);
    assert.equal(resolveAvatarStackWidth(0, 34, 26), 0);
    assert.equal(resolveAvatarStackWidth(1, 34, 26), 34);
    assert.equal(resolveAvatarStackWidth(5, 34, 26), 138);

    assert.equal(accentStepPolicy.stepSize, 100);
    assert.equal(accentStepPolicy.mode.light.primaryDirection, "darker");
    assert.equal(accentStepPolicy.mode.light.fallbackDirection, "lighter");
    assert.equal(accentStepPolicy.mode.dark.primaryDirection, "lighter");
    assert.equal(accentStepPolicy.mode.dark.fallbackDirection, "darker");
    assert.equal(accentStepPolicy.stopCondition, "first-pass");
    assert.equal(
      accentStepPolicy.unresolvedBehavior,
      "fail-validation-no-silent-mutation"
    );
    assert.equal(accentStepPolicy.thresholds.normalTextAA, 4.5);
    assert.equal(accentStepPolicy.thresholds.largeTextAA, 3.0);

    const presetNames = Object.keys(themePresets);
    for (const preset of presetNames) {
      const tokens = resolveTheme(true, preset);
      assert.equal(
        tokens.progressFill,
        themePresets[preset].darkTheme.progressFill,
        "Dark theme base resolution should match preset dark progressFill.",
      );
    }

    const presetSwatchMatrix = [
      { swatch: "#4E56A0", expectedPreset: "default" },
      { swatch: "#4F46E5", expectedPreset: "indigo" },
      { swatch: "#059669", expectedPreset: "emerald" },
      { swatch: "#E11D48", expectedPreset: "rose" },
      { swatch: "#475569", expectedPreset: "slate" },
      { swatch: "#0891B2", expectedPreset: "cyan" },
    ];

    for (const row of presetSwatchMatrix) {
      const matched = inferThemePresetFromAccent(row.swatch);
      assert.equal(matched, row.expectedPreset);
      const preset = matched ?? "default";
      const accentOverride = matched ? undefined : row.swatch;
      const dark = resolveTheme(true, preset, accentOverride);
      assert.equal(
        dark.progressFill,
        themePresets[row.expectedPreset].darkTheme.progressFill,
        "Preset swatches should resolve via preset dark accent, not raw override."
      );
    }

    const customAccent = "#123456";
    const matchedCustom = inferThemePresetFromAccent(customAccent);
    assert.equal(matchedCustom, undefined);
    const customDark = resolveTheme(
      true,
      matchedCustom ?? "default",
      matchedCustom ? undefined : customAccent
    );
    assert.equal(
      customDark.progressFill,
      customAccent,
      "Unknown custom accent should remain a direct override until step-policy runtime is enabled."
    );

    console.log("Hardening checks passed.");
  `;

  try {
    await build({
      stdin: {
        contents: entry,
        resolveDir: ROOT,
        sourcefile: "test-hardening-entry.ts",
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
      throw new Error(`Hardening tests failed.\n${run.stderr || ""}`);
    }

    const output = (run.stdout || "").trim();
    if (output) {
      console.log(output);
    }
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

runHardeningChecks().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
