#!/usr/bin/env node

/**
 * Injects WCAG level (A/AA/AAA) into all a11yChecklistData*.json files
 * by extracting the WCAG criterion code from each item's `wcag` field
 * and looking it up in the level map built from checklist.json.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../widget-src/data");
const CHECKLIST_PATH = path.join(DATA_DIR, "checklist.json");

const WCAG_CODE_REGEX = /(\d+\.\d+\.\d+)/;
const VALID_LEVELS = new Set(["A", "AA", "AAA"]);

function buildLevelMap(checklist) {
  const map = {};
  for (const sectionData of Object.values(checklist)) {
    const tasks = Array.isArray(sectionData?.tasks) ? sectionData.tasks : [];
    for (const task of tasks) {
      const level = String(task?.level ?? "").trim().toUpperCase();
      if (!VALID_LEVELS.has(level)) continue;
      const match = String(task?.wcag ?? "").match(WCAG_CODE_REGEX);
      if (match) {
        map[match[1]] = level;
      }
    }
  }
  return map;
}

function extractCode(wcag) {
  const match = String(wcag ?? "").match(WCAG_CODE_REGEX);
  return match ? match[1] : null;
}

async function processFile(filePath, levelMap) {
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  let injected = 0;

  for (const section of data.sections ?? []) {
    for (const item of section.items ?? []) {
      const code = extractCode(item.wcag);
      const level = code ? (levelMap[code] ?? null) : null;
      if (level && item.level !== level) {
        item.level = level;
        injected++;
      } else if (level === null && !item.level) {
        item.level = null;
      }
    }
  }

  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  return injected;
}

async function main() {
  const checklist = JSON.parse(await fs.readFile(CHECKLIST_PATH, "utf8"));
  const levelMap = buildLevelMap(checklist);
  const codes = Object.keys(levelMap);
  console.log(`Built level map: ${codes.length} WCAG codes mapped`);

  const entries = await fs.readdir(DATA_DIR);
  const targets = entries
    .filter((f) => f.startsWith("a11yChecklistData") && f.endsWith(".json"))
    .sort();

  for (const file of targets) {
    const filePath = path.join(DATA_DIR, file);
    const count = await processFile(filePath, levelMap);
    console.log(`  ${file}: ${count} level(s) injected`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
