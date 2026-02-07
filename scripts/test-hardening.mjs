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
    import { inferThemePresetFromAccent } from "./widget-src/theme/index";
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

