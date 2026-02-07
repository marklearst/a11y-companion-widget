import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const TARGET_DIRS = [
  "widget-src/components",
  "widget-src/hooks",
  "widget-src/theme",
  "widget-src/effects",
  "widget-src/types",
].map((dir) => path.resolve(ROOT, dir));
const EXTENSIONS = new Set([".ts", ".tsx"]);
const ALLOWED_NUMERIC_LITERAL = new Set([0]);

const OUTPUT_PATH = path.resolve(
  ROOT,
  process.argv[2] || "DESIGN_SYSTEM_VARIABLE_GAP.md"
);

const DEPRECATED_TOP_LEVEL_IMPORTS = new Set([
  "typography",
  "legacySpacing",
  "spacing",
  "padding",
  "gap",
  "radius",
  "sizes",
  "lightTheme",
  "darkTheme",
  "brand",
  "neutral",
  "semantic",
  "shadows",
  "withOpacity",
  "designSystem",
  "getThemeShadow",
  "createChecklistTokens",
  "ChecklistTokens",
  "ChecklistThemeTokens",
  "createOverlayTokens",
  "OverlayTokens",
  "OverlayThemeTokens",
  "primitiveComponentVariables",
  "primitiveComponentTokens",
  "PrimitiveComponentVariables",
  "PrimitiveComponentTokens",
]);

const colorChecks = [
  {
    type: "Raw hex color literal",
    regex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
  },
  {
    type: "Raw rgba()/rgb() literal",
    regex: /rgba?\(/g,
  },
];

const numericChecks = [
  {
    type: "Raw style numeric literal",
    regex:
      /\b(?:padding|spacing|cornerRadius|radius|fontSize|strokeWidth|width|height|fontWeight|letterSpacing)\s*=\s*\{(\d+(?:\.\d+)?)\}/g,
  },
  {
    type: "Raw style object numeric literal",
    regex:
      /\b(?:top|bottom|left|right|horizontal|vertical)\s*:\s*(\d+(?:\.\d+)?)\b/g,
  },
  {
    type: "Raw style fallback numeric literal",
    regex:
      /\b(?:top|bottom|left|right|horizontal|vertical|padding|spacing|cornerRadius|radius|fontSize|strokeWidth|width|height|fontWeight|letterSpacing)\b[^\n;]*\?\?\s*(\d+(?:\.\d+)?)\b/g,
  },
];

async function walk(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function lineNumberForIndex(content, index) {
  let line = 1;
  let lastIndex = 0;
  while (true) {
    const next = content.indexOf("\n", lastIndex);
    if (next === -1 || next >= index) return line;
    line += 1;
    lastIndex = next + 1;
  }
}

function lineTextForIndex(content, index) {
  const lineStart = content.lastIndexOf("\n", index - 1) + 1;
  const lineEnd = content.indexOf("\n", index);
  if (lineEnd === -1) return content.slice(lineStart);
  return content.slice(lineStart, lineEnd);
}

function isCommentLine(content, index) {
  const lineText = lineTextForIndex(content, index).trim();
  return lineText.startsWith("//") || lineText.startsWith("*");
}

function compactLinePreview(content, index) {
  return lineTextForIndex(content, index).trim().replace(/\|/g, "\\|");
}

function parseImportSpecifiers(specifierBlock) {
  return specifierBlock
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/^type\s+/, "").trim())
    .map((part) => part.split(/\s+as\s+/)[0].trim())
    .filter(Boolean);
}

function collectDeprecatedImportFindings(content, file) {
  const findings = [];
  const importRegex =
    /import\s*\{([\s\S]*?)\}\s*from\s*["']design-system["'];?/g;

  let match;
  while ((match = importRegex.exec(content))) {
    if (isCommentLine(content, match.index)) continue;

    const imports = parseImportSpecifiers(match[1]);
    for (const importedName of imports) {
      if (!DEPRECATED_TOP_LEVEL_IMPORTS.has(importedName)) continue;

      const localIndex = match.index + match[0].indexOf(importedName);
      findings.push({
        type: "Deprecated design-system import",
        file,
        line: lineNumberForIndex(content, localIndex),
        detail: importedName,
        preview: compactLinePreview(content, localIndex),
        recommendation: "Switch to canonical module path (theme/default, primitives/*, or component variables).",
      });
    }
  }

  return findings;
}

function collectColorFindings(content, file) {
  const findings = [];

  for (const check of colorChecks) {
    const regex = new RegExp(check.regex.source, check.regex.flags);
    let match;
    while ((match = regex.exec(content))) {
      if (isCommentLine(content, match.index)) continue;

      findings.push({
        type: check.type,
        file,
        line: lineNumberForIndex(content, match.index),
        detail: match[0],
        preview: compactLinePreview(content, match.index),
        recommendation: "Replace raw colors with theme or semantic variable values.",
      });
    }
  }

  return findings;
}

function collectNumericFindings(content, file) {
  const findings = [];

  for (const check of numericChecks) {
    const regex = new RegExp(check.regex.source, check.regex.flags);
    let match;
    while ((match = regex.exec(content))) {
      if (isCommentLine(content, match.index)) continue;

      const numericValue = Number(match[1]);
      if (ALLOWED_NUMERIC_LITERAL.has(numericValue)) continue;

      findings.push({
        type: check.type,
        file,
        line: lineNumberForIndex(content, match.index),
        detail: match[0],
        preview: compactLinePreview(content, match.index),
        recommendation: "Move non-zero style literals to component variables or primitives.",
      });
    }
  }

  return findings;
}

function sortFindings(findings) {
  return findings.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    return a.line - b.line;
  });
}

function summarize(findings) {
  const byType = {};
  for (const finding of findings) {
    byType[finding.type] = (byType[finding.type] || 0) + 1;
  }
  return byType;
}

function toMarkdown(findings) {
  const rel = (file) => path.relative(ROOT, file);
  const summary = summarize(findings);
  const sorted = sortFindings(findings);

  const lines = [];
  lines.push("# Design System Variable Gap Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total findings: ${sorted.length}`);
  for (const [type, count] of Object.entries(summary).sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    lines.push(`- ${type}: ${count}`);
  }

  if (sorted.length === 0) {
    lines.push("");
    lines.push("No variable gaps detected in scanned files.");
    return lines.join("\n");
  }

  lines.push("");
  lines.push("## Findings");
  lines.push("");
  lines.push("| Type | File | Line | Detail | Recommendation |");
  lines.push("| --- | --- | ---: | --- | --- |");

  for (const finding of sorted) {
    lines.push(
      `| ${finding.type} | ${rel(finding.file)} | ${finding.line} | \`${finding.detail}\`<br/>\`${finding.preview}\` | ${finding.recommendation} |`
    );
  }

  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- This report scans `widget-src/components`, `widget-src/hooks`, `widget-src/theme`, `widget-src/effects`, and `widget-src/types`.");
  lines.push("- Numeric literal checks allow explicit `0` values.");
  lines.push("- Use this report to drive variable additions and migration PRs.");

  return lines.join("\n");
}

async function main() {
  const allFiles = [];
  for (const dir of TARGET_DIRS) {
    if (!(await pathExists(dir))) continue;
    allFiles.push(...(await walk(dir)));
  }

  const findings = [];
  for (const file of allFiles) {
    const content = await fs.readFile(file, "utf8");
    findings.push(...collectDeprecatedImportFindings(content, file));
    findings.push(...collectColorFindings(content, file));
    findings.push(...collectNumericFindings(content, file));
  }

  const markdown = toMarkdown(findings);
  await fs.writeFile(OUTPUT_PATH, `${markdown}\n`, "utf8");

  console.log(
    `Variable gap report written to ${path.relative(ROOT, OUTPUT_PATH)} (${findings.length} findings)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
