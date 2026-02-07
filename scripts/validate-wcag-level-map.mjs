#!/usr/bin/env node

import { build } from "esbuild";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();

function compact(value) {
  return JSON.stringify(value).replace(/<\\\//g, "</");
}

async function validateWcagMap() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "a11y-wcag-map-"));
  const bundlePath = path.join(tempDir, "validate-wcag-map.bundle.cjs");

  const entry = `
    import {
      wcagLevelCriteriaMap,
      wcagCriteriaByLevel,
    } from "./widget-src/data/wcagLevelMap";

    const LEVELS = ${compact(["A", "AA", "AAA"])};
    const codeRegex = /^\\d+\\.\\d+\\.\\d+$/;
    const errors = [];
    const summary = {
      totalCriteria: 0,
      byLevel: {},
    };

    for (const level of LEVELS) {
      const criteria = wcagLevelCriteriaMap[level];
      const codeList = wcagCriteriaByLevel[level];

      if (!Array.isArray(criteria)) {
        errors.push(\`Missing criteria array for level \${level}.\`);
        continue;
      }
      if (!Array.isArray(codeList)) {
        errors.push(\`Missing code array for level \${level}.\`);
      }
      if (criteria.length === 0) {
        errors.push(\`No criteria entries found for level \${level}.\`);
      }

      const seenCodes = new Set();
      for (const [index, entry] of criteria.entries()) {
        const context = \`\${level}[\\\${index}]\`;
        const code = String(entry?.code ?? "").trim();
        const title = String(entry?.title ?? "").trim();
        const url = String(entry?.url ?? "").trim();

        if (!codeRegex.test(code)) {
          errors.push(\`\${context}: malformed criterion code "\${code}".\`);
        }
        if (!title) {
          errors.push(\`\${context}: missing criterion title.\`);
        }
        if (!url) {
          errors.push(\`\${context}: missing criterion URL.\`);
        }
        if (seenCodes.has(code)) {
          errors.push(\`\${context}: duplicate criterion code "\${code}" within level \${level}.\`);
        }
        seenCodes.add(code);
      }

      if (Array.isArray(codeList)) {
        const criteriaCodes = criteria.map((entry) => entry.code);
        const criteriaSet = new Set(criteriaCodes);
        const codeListSet = new Set(codeList);

        for (const code of codeList) {
          if (!criteriaSet.has(code)) {
            errors.push(
              \`wcagCriteriaByLevel[\${level}] includes code "\${code}" missing from wcagLevelCriteriaMap.\`
            );
          }
        }

        for (const code of criteriaCodes) {
          if (!codeListSet.has(code)) {
            errors.push(
              \`wcagLevelCriteriaMap[\${level}] code "\${code}" missing from wcagCriteriaByLevel.\`
            );
          }
        }
      }

      summary.byLevel[level] = criteria.length;
      summary.totalCriteria += criteria.length;
    }

    const crossLevel = new Map();
    for (const level of LEVELS) {
      const criteria = Array.isArray(wcagLevelCriteriaMap[level])
        ? wcagLevelCriteriaMap[level]
        : [];
      for (const entry of criteria) {
        const code = String(entry?.code ?? "").trim();
        if (!code) continue;
        const levels = crossLevel.get(code) ?? new Set();
        levels.add(level);
        crossLevel.set(code, levels);
      }
    }

    for (const [code, levels] of crossLevel.entries()) {
      if (levels.size > 1) {
        errors.push(
          \`Criterion code "\${code}" appears in multiple levels: \${[...levels].sort().join(", ")}.\`
        );
      }
    }

    console.log(JSON.stringify({ summary, errors }));
  `;

  try {
    await build({
      stdin: {
        contents: entry,
        resolveDir: ROOT,
        sourcefile: "validate-wcag-map-entry.ts",
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
      throw new Error(`WCAG map validation runner failed.\n${run.stderr || ""}`);
    }

    const stdout = (run.stdout || "").trim();
    if (!stdout) {
      throw new Error("WCAG map validation produced no output.");
    }

    return JSON.parse(stdout);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function main() {
  const report = await validateWcagMap();
  const levels = Object.entries(report.summary.byLevel)
    .map(([level, count]) => `${level}:${count}`)
    .join(", ");

  console.log(
    `WCAG map validation scanned ${report.summary.totalCriteria} criteria (${levels}).`
  );

  if (report.errors.length === 0) {
    console.log("WCAG map validation passed.");
    return;
  }

  console.error(`WCAG map validation failed with ${report.errors.length} issue(s):`);
  report.errors.forEach((error) => {
    console.error(`- ${error}`);
  });
  process.exit(1);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

