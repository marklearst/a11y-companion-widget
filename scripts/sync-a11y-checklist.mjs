#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SOURCE_URL =
  "https://raw.githubusercontent.com/a11yproject/a11yproject.com/main/src/_data/checklists.json";

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

async function main() {
  const raw = await fetchText(SOURCE_URL);
  const parsed = JSON.parse(raw);
  const pretty = `${JSON.stringify(parsed, null, 2)}\n`;
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
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
