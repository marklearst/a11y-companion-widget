#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SOURCE_URL =
  "https://raw.githubusercontent.com/a11yproject/a11yproject.com/main/src/_data/checklists.json";
const FAIL_ON_UNRESOLVED_TEMPLATES = false;
const ELEVENTY_URL_TEMPLATE_REGEX =
  /\{\{\s*(['"])(.*?)\1\s*\|\s*url\s*\}\}/g;
const WCAG_LEVELS = new Set(["A", "AA", "AAA"]);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.resolve(
  __dirname,
  "../widget-src/data/checklist.json",
);

async function fetchText(url) {
  if (typeof fetch === "function") {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.text();
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        if (!statusCode || statusCode < 200 || statusCode >= 300) {
          reject(new Error(`Request failed: ${statusCode}`));
          res.resume();
          return;
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function formatPath(pathParts) {
  if (!pathParts.length) return "<root>";
  let output = "";
  for (const part of pathParts) {
    if (part.startsWith("[")) {
      output += part;
    } else {
      output += output ? `.${part}` : part;
    }
  }
  return output;
}

function sanitizeTemplateString(value) {
  let replacementCount = 0;
  const sanitized = value.replace(
    ELEVENTY_URL_TEMPLATE_REGEX,
    (_match, _quote, pathValue) => {
      replacementCount += 1;
      return String(pathValue ?? "").trim();
    },
  );
  return { sanitized, replacementCount };
}

function hasTemplateMarkers(value) {
  return value.includes("{{") || value.includes("}}");
}

function normalizeLevel(value) {
  if (!value) return null;
  const normalized = String(value).trim().toUpperCase();
  return WCAG_LEVELS.has(normalized) ? normalized : null;
}

function parseWcagCode(value) {
  const match = String(value ?? "").match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

async function readJsonIfExists(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function buildLevelLookup(existingChecklist) {
  const byCheckboxId = new Map();
  const byCode = new Map();
  if (!existingChecklist || typeof existingChecklist !== "object") {
    return { byCheckboxId, byCode };
  }

  for (const sectionData of Object.values(existingChecklist)) {
    const tasks = Array.isArray(sectionData?.tasks) ? sectionData.tasks : [];
    for (const task of tasks) {
      const level = normalizeLevel(task?.level);
      if (!level) continue;

      const checkboxId = String(task?.checkboxId ?? "").trim();
      if (checkboxId && !byCheckboxId.has(checkboxId)) {
        byCheckboxId.set(checkboxId, level);
      }

      const code = parseWcagCode(task?.wcag);
      if (code && !byCode.has(code)) {
        byCode.set(code, level);
      }
    }
  }

  return { byCheckboxId, byCode };
}

function hydrateTaskLevels(checklistData, levelLookup) {
  const report = {
    hydratedCount: 0,
    unresolvedPaths: [],
  };

  if (!checklistData || typeof checklistData !== "object") {
    return { hydrated: checklistData, report };
  }

  for (const [sectionKey, sectionData] of Object.entries(checklistData)) {
    const tasks = Array.isArray(sectionData?.tasks) ? sectionData.tasks : [];
    tasks.forEach((task, index) => {
      const existingLevel = normalizeLevel(task?.level);
      if (existingLevel) {
        task.level = existingLevel;
        return;
      }

      const checkboxId = String(task?.checkboxId ?? "").trim();
      const wcagCode = parseWcagCode(task?.wcag);
      const hydratedLevel =
        (checkboxId ? levelLookup.byCheckboxId.get(checkboxId) : undefined) ??
        (wcagCode ? levelLookup.byCode.get(wcagCode) : undefined) ??
        null;

      if (hydratedLevel) {
        task.level = hydratedLevel;
        report.hydratedCount += 1;
        return;
      }

      if (wcagCode) {
        report.unresolvedPaths.push(`${sectionKey}.tasks[${index}]`);
      }
    });
  }

  return { hydrated: checklistData, report };
}

function logLevelHydrationReport(report) {
  if (report.hydratedCount > 0) {
    console.warn(
      `[sync:a11y-checklist] Hydrated WCAG level on ${report.hydratedCount} task(s) using existing checklist data.`,
    );
  }

  if (report.unresolvedPaths.length > 0) {
    console.warn(
      `[sync:a11y-checklist] Missing WCAG level on ${report.unresolvedPaths.length} task(s) after hydration:\n- ${report.unresolvedPaths.join("\n- ")}`,
    );
  }
}

function sanitizeTemplatesDeep(input) {
  const report = {
    replacementCount: 0,
    transformedPaths: [],
    unresolvedPaths: [],
  };

  const walk = (value, pathParts) => {
    if (typeof value === "string") {
      const { sanitized, replacementCount } = sanitizeTemplateString(value);
      if (replacementCount > 0) {
        report.replacementCount += replacementCount;
        report.transformedPaths.push(formatPath(pathParts));
      }
      if (hasTemplateMarkers(sanitized)) {
        report.unresolvedPaths.push(formatPath(pathParts));
      }
      return sanitized;
    }

    if (Array.isArray(value)) {
      return value.map((entry, index) => walk(entry, [...pathParts, `[${index}]`]));
    }

    if (value && typeof value === "object") {
      const result = {};
      for (const [key, entry] of Object.entries(value)) {
        result[key] = walk(entry, [...pathParts, key]);
      }
      return result;
    }

    return value;
  };

  const sanitized = walk(input, []);
  return { sanitized, report };
}

function logTemplateSanitizerReport(report) {
  if (report.replacementCount > 0) {
    console.warn(
      `[sync:a11y-checklist] Sanitized ${report.replacementCount} Eleventy URL template expression(s) across ${report.transformedPaths.length} field(s).`,
    );
    console.warn(
      `[sync:a11y-checklist] Sanitized field paths:\n- ${report.transformedPaths.join("\n- ")}`,
    );
  }

  if (report.unresolvedPaths.length > 0) {
    const summary = `[sync:a11y-checklist] Found ${report.unresolvedPaths.length} field(s) with unresolved template markers after sanitization:\n- ${report.unresolvedPaths.join("\n- ")}`;
    if (FAIL_ON_UNRESOLVED_TEMPLATES) {
      throw new Error(summary);
    }
    console.warn(summary);
  }
}

async function main() {
  const raw = await fetchText(SOURCE_URL);
  const parsed = JSON.parse(raw);
  const existingChecklist = await readJsonIfExists(OUTPUT_PATH);
  const levelLookup = buildLevelLookup(existingChecklist);
  const { sanitized, report } = sanitizeTemplatesDeep(parsed);
  const { hydrated, report: levelReport } = hydrateTaskLevels(
    sanitized,
    levelLookup,
  );
  logTemplateSanitizerReport(report);
  logLevelHydrationReport(levelReport);
  const pretty = `${JSON.stringify(hydrated, null, 2)}\n`;
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, pretty, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);

  const generateMap = spawnSync(
    process.execPath,
    [path.resolve(__dirname, "./generate-wcag-level-map.mjs")],
    {
      cwd: path.resolve(__dirname, ".."),
      stdio: "inherit",
    },
  );

  if (generateMap.status !== 0) {
    throw new Error(
      `WCAG level map generation failed with exit code ${generateMap.status ?? "unknown"}.`,
    );
  }

  const validateMap = spawnSync(
    process.execPath,
    [path.resolve(__dirname, "./validate-wcag-level-map.mjs")],
    {
      cwd: path.resolve(__dirname, ".."),
      stdio: "inherit",
    },
  );

  if (validateMap.status !== 0) {
    throw new Error(
      `WCAG level map validation failed with exit code ${validateMap.status ?? "unknown"}.`,
    );
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
