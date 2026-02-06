import { promises as fs, watch as watchFs } from "fs";
import path from "path";
import { spawn } from "child_process";

const ROOT = process.cwd();
const WATCH_TARGETS = [
  "widget-src/components",
  "widget-src/hooks",
  "widget-src/theme",
  "widget-src/ui",
  "widget-src/design-system",
  "scripts/check-design-system.mjs",
  "scripts/check-variable-architecture.mjs",
  "scripts/theme-baseline.mjs",
  "scripts/generate-variable-gap-report.mjs",
  "scripts/suggest-contrast-shade-steps.mjs",
  "scripts/check-contrast-aa.mjs",
  "package.json",
];

const ENABLE_CONTRAST_AA_CHECK = process.argv.includes("--with-contrast-aa");

function buildCheckCommands() {
  const commands = [
    ["node", ["scripts/check-design-system.mjs"]],
    ["node", ["scripts/check-variable-architecture.mjs"]],
    ["node", ["scripts/theme-baseline.mjs", "--check"]],
    ["node", ["scripts/generate-variable-gap-report.mjs"]],
    ["node", ["scripts/suggest-contrast-shade-steps.mjs"]],
  ];

  if (ENABLE_CONTRAST_AA_CHECK) {
    commands.push(["node", ["scripts/check-contrast-aa.mjs"]]);
  }

  return commands;
}

const CHECK_COMMANDS = buildCheckCommands();

const IGNORE_PATTERNS = [
  "widget-src/design-system/baselines/",
  "DESIGN_SYSTEM_VARIABLE_GAP.md",
  "node_modules/",
  ".git/",
];

function shouldIgnore(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return IGNORE_PATTERNS.some((pattern) => normalized.includes(pattern));
}

async function collectDirectories(startPath) {
  const absolutePath = path.resolve(ROOT, startPath);
  const stat = await fs.stat(absolutePath);

  if (!stat.isDirectory()) {
    return [];
  }

  const dirs = [absolutePath];
  const entries = await fs.readdir(absolutePath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const child = path.join(absolutePath, entry.name);
    const relativeChild = path.relative(ROOT, child).replace(/\\/g, "/");
    if (shouldIgnore(relativeChild)) continue;
    dirs.push(...(await collectDirectories(child)));
  }

  return dirs;
}

function runCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      stdio: "inherit",
      shell: false,
    });

    child.on("close", (code) => {
      resolve(code === 0);
    });
  });
}

async function runChecks(triggerLabel = "manual") {
  const startedAt = new Date().toISOString();
  console.log(`\n[watch:ds] Running checks (${triggerLabel}) @ ${startedAt}`);

  for (const [command, args] of CHECK_COMMANDS) {
    const ok = await runCommand(command, args);
    if (!ok) {
      console.log(`[watch:ds] Stopped after failure in: ${command} ${args.join(" ")}`);
      return false;
    }
  }

  console.log("[watch:ds] All checks passed.");
  return true;
}

async function main() {
  const watcherHandles = [];
  let running = false;
  let rerunRequested = false;
  let debounceTimer = null;

  const queueRun = (label) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      if (running) {
        rerunRequested = true;
        return;
      }

      running = true;
      await runChecks(label);
      running = false;

      if (rerunRequested) {
        rerunRequested = false;
        queueRun("queued");
      }
    }, 200);
  };

  if (ENABLE_CONTRAST_AA_CHECK) {
    console.log("[watch:ds] Strict mode enabled (includes check-contrast-aa).");
  }

  await runChecks("startup");

  for (const target of WATCH_TARGETS) {
    const absolute = path.resolve(ROOT, target);

    try {
      const stat = await fs.stat(absolute);
      if (stat.isDirectory()) {
        const dirs = await collectDirectories(target);
        for (const dir of dirs) {
          const watcher = watchFs(dir, (_event, fileName) => {
            const relative = path.relative(ROOT, path.join(dir, fileName || ""));
            if (shouldIgnore(relative)) return;
            queueRun(`change: ${relative}`);
          });
          watcherHandles.push(watcher);
        }
      } else {
        const parent = path.dirname(absolute);
        const baseName = path.basename(absolute);
        const watcher = watchFs(parent, (_event, fileName) => {
          if (fileName !== baseName) return;
          const relative = path.relative(ROOT, absolute);
          if (shouldIgnore(relative)) return;
          queueRun(`change: ${relative}`);
        });
        watcherHandles.push(watcher);
      }
    } catch (error) {
      // Ignore missing optional watch targets.
    }
  }

  console.log("[watch:ds] Watching design-system files. Press Ctrl+C to stop.");

  process.on("SIGINT", () => {
    for (const watcher of watcherHandles) {
      watcher.close();
    }
    console.log("\n[watch:ds] Stopped.");
    process.exit(0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
