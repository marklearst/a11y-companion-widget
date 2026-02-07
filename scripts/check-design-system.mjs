import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const SCAN_ROOTS = [
  "widget-src/components",
  "widget-src/hooks",
  "widget-src/theme",
  "widget-src/effects",
  "widget-src/types",
].map((relativePath) => path.resolve(ROOT, relativePath));
const EXTENSIONS = new Set([".ts", ".tsx"]);
const ALLOWED_NUMERIC_LITERAL = new Set([0]);

const DEPRECATED_IMPORTS_BY_MODULE = new Map([
  [
    "design-system",
    new Set([
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
    ]),
  ],
  [
    "design-system/components/primitives",
    new Set([
      "primitiveComponentVariables",
      "primitiveComponentTokens",
      "PrimitiveComponentVariables",
      "PrimitiveComponentTokens",
    ]),
  ],
  [
    "design-system/components/checklist",
    new Set([
      "createChecklistTokens",
      "ChecklistTokens",
      "ChecklistThemeTokens",
    ]),
  ],
  [
    "design-system/components/overlays",
    new Set([
      "createOverlayTokens",
      "OverlayTokens",
      "OverlayThemeTokens",
    ]),
  ],
]);

const regexChecks = [
  {
    name: "Hex color literal",
    regex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    message:
      "Use design-system variables instead of hex color literals in components.",
  },
  {
    name: "Raw Inter font",
    regex: /fontFamily=\"Inter\"|fontFamily='Inter'/g,
    message:
      "Use design-system typography variables instead of raw font family literals.",
  },
  {
    name: "Numeric fontSize literal",
    regex: /fontSize=\{\d+\}/g,
    message:
      "Use design-system typography variables instead of numeric font sizes.",
  },
];

const numericChecks = [
  {
    name: "Raw style numeric literal",
    regex:
      /\b(?:padding|spacing|cornerRadius|radius|fontSize|strokeWidth|width|height|fontWeight|letterSpacing)\s*=\s*\{(\d+(?:\.\d+)?)\}/g,
    message:
      "Use design-system variables instead of raw non-zero style literals in JSX props.",
  },
  {
    name: "Raw style object numeric literal",
    regex:
      /\b(?:top|bottom|left|right|horizontal|vertical)\s*:\s*(\d+(?:\.\d+)?)\b/g,
    message:
      "Use design-system variables instead of raw non-zero style literals in layout objects.",
  },
  {
    name: "Raw style fallback numeric literal",
    regex:
      /\b(?:top|bottom|left|right|horizontal|vertical|padding|spacing|cornerRadius|radius|fontSize|strokeWidth|width|height|fontWeight|letterSpacing)\b[^\n;]*\?\?\s*(\d+(?:\.\d+)?)\b/g,
    message:
      "Use design-system variables instead of raw non-zero fallback style literals.",
  },
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
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

function parseImportSpecifiers(specifierBlock) {
  return specifierBlock
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/^type\s+/, "").trim())
    .map((part) => part.split(/\s+as\s+/)[0].trim())
    .filter(Boolean);
}

function collectDeprecatedImportViolations(content, file) {
  const violations = [];
  const importRegex =
    /import\s*\{([\s\S]*?)\}\s*from\s*["']([^"']+)["'];?/g;

  let match;
  while ((match = importRegex.exec(content))) {
    if (isCommentLine(content, match.index)) continue;
    const importPath = match[2];
    const deprecatedImports = DEPRECATED_IMPORTS_BY_MODULE.get(importPath);
    if (!deprecatedImports) continue;

    const imports = parseImportSpecifiers(match[1]);
    for (const importedName of imports) {
      if (!deprecatedImports.has(importedName)) continue;

      const localIndex = match.index + match[0].indexOf(importedName);
      const line = lineNumberForIndex(content, localIndex);
      violations.push({
        file,
        line,
        type: "Deprecated design-system import",
        detail: `${importPath}#${importedName}`,
        message:
          "Import canonical variables/modules instead of deprecated design-system exports.",
      });
    }
  }

  return violations;
}

function collectRegexViolations(content, file) {
  const violations = [];

  for (const check of regexChecks) {
    const regex = new RegExp(check.regex.source, check.regex.flags);
    let match;
    while ((match = regex.exec(content))) {
      if (isCommentLine(content, match.index)) continue;

      const line = lineNumberForIndex(content, match.index);
      violations.push({
        file,
        line,
        type: check.name,
        detail: match[0],
        message: check.message,
      });
    }
  }

  return violations;
}

function collectRawNumericViolations(content, file) {
  const violations = [];

  for (const check of numericChecks) {
    const regex = new RegExp(check.regex.source, check.regex.flags);
    let match;
    while ((match = regex.exec(content))) {
      if (isCommentLine(content, match.index)) continue;

      const numericValue = Number(match[1]);
      if (ALLOWED_NUMERIC_LITERAL.has(numericValue)) continue;

      const line = lineNumberForIndex(content, match.index);
      violations.push({
        file,
        line,
        type: check.name,
        detail: match[0],
        message: check.message,
      });
    }
  }

  return violations;
}

async function main() {
  const files = [];
  for (const scanRoot of SCAN_ROOTS) {
    if (!(await pathExists(scanRoot))) continue;
    files.push(...(await walk(scanRoot)));
  }
  const violations = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");

    violations.push(...collectRegexViolations(content, file));
    violations.push(...collectDeprecatedImportViolations(content, file));
    violations.push(...collectRawNumericViolations(content, file));
  }

  if (violations.length > 0) {
    console.error("Design-system lint failed:\n");
    for (const v of violations) {
      console.error(
        `- ${v.type}: ${path.relative(process.cwd(), v.file)}:${v.line} (${v.detail})\n  ${v.message}`
      );
    }
    process.exit(1);
  }

  console.log(
    "Design-system lint passed: no deprecated imports, raw colors, or raw non-zero style literals in scanned app files."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
