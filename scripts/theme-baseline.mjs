import { build } from "esbuild";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const SNAPSHOT_PATH = path.resolve(
  ROOT,
  "widget-src/design-system/baselines/theme-baseline.snapshot.json"
);

function deepSort(value) {
  if (Array.isArray(value)) {
    return value.map((item) => deepSort(item));
  }

  if (value && typeof value === "object") {
    const sorted = {};
    for (const key of Object.keys(value).sort()) {
      sorted[key] = deepSort(value[key]);
    }
    return sorted;
  }

  return value;
}

function stableStringify(value) {
  return JSON.stringify(deepSort(value));
}

function hashSnapshot(snapshot) {
  return createHash("sha256").update(stableStringify(snapshot)).digest("hex");
}

async function generateCurrentSnapshot() {
  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "a11y-theme-baseline-")
  );
  const bundlePath = path.join(tempDir, "theme-baseline.bundle.cjs");

  const entry = `
    import { defaultTheme } from "./widget-src/design-system/theme/default";
    import { createTheme } from "./widget-src/design-system/theme/createTheme";
    import { themePresets } from "./widget-src/design-system/theme/presets";

    const output = {
      defaultTheme,
      createThemeDefault: createTheme(),
      presets: Object.fromEntries(Object.entries(themePresets)),
    };

    console.log(JSON.stringify(output));
  `;

  try {
    await build({
      stdin: {
        contents: entry,
        resolveDir: ROOT,
        sourcefile: "theme-baseline-entry.ts",
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
        `Failed to execute bundled baseline script.\n${run.stderr || ""}`
      );
    }

    const stdout = (run.stdout || "").trim();
    if (!stdout) {
      throw new Error("Baseline script produced no output.");
    }

    return deepSort(JSON.parse(stdout));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function writeSnapshot(snapshot) {
  const hash = hashSnapshot(snapshot);
  const payload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      generatedBy: "scripts/theme-baseline.mjs",
      hash,
      presetNames: Object.keys(snapshot.presets || {}).sort(),
    },
    snapshot,
  };

  await fs.mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true });
  await fs.writeFile(SNAPSHOT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Theme baseline written to ${path.relative(ROOT, SNAPSHOT_PATH)}`);
  console.log(`Snapshot hash: ${hash}`);
}

async function checkSnapshot(snapshot) {
  let current;

  try {
    const raw = await fs.readFile(SNAPSHOT_PATH, "utf8");
    current = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Missing or invalid snapshot at ${path.relative(
        ROOT,
        SNAPSHOT_PATH
      )}. Run: node scripts/theme-baseline.mjs --write`
    );
  }

  const expectedSnapshot = deepSort(current.snapshot ?? {});
  const actualSnapshot = deepSort(snapshot);

  const expectedHash = hashSnapshot(expectedSnapshot);
  const actualHash = hashSnapshot(actualSnapshot);

  if (stableStringify(expectedSnapshot) !== stableStringify(actualSnapshot)) {
    throw new Error(
      `Theme baseline mismatch.\nExpected hash: ${expectedHash}\nActual hash:   ${actualHash}\nRun: node scripts/theme-baseline.mjs --write`
    );
  }

  console.log(
    `Theme baseline check passed (${path.relative(ROOT, SNAPSHOT_PATH)} | ${actualHash})`
  );
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const writeMode = args.has("--write");
  const checkMode = args.has("--check") || !writeMode;

  const snapshot = await generateCurrentSnapshot();

  if (writeMode) {
    await writeSnapshot(snapshot);
  }

  if (checkMode) {
    await checkSnapshot(snapshot);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
