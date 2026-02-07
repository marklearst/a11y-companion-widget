import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const COMPONENT_ROOT = path.resolve(ROOT, "widget-src/components");
const EXTENSIONS = new Set([".ts", ".tsx"]);

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

function collectComponentImportViolations(content, file) {
  const violations = [];
  const importRegex = /import\s+[^;]+from\s+["']([^"']+)["'];?/g;

  let match;
  while ((match = importRegex.exec(content))) {
    const importPath = match[1];

    if (importPath.startsWith("design-system/primitives/")) {
      violations.push({
        file,
        line: lineNumberForIndex(content, match.index),
        detail: importPath,
        message:
          "Component files should not import primitives directly. Route values through alias/component variable layers.",
      });
    }

    if (importPath === "design-system/spacing" || importPath === "design-system/colors") {
      violations.push({
        file,
        line: lineNumberForIndex(content, match.index),
        detail: importPath,
        message:
          "Component files should use canonical variables exports instead of legacy spacing/colors modules.",
      });
    }
  }

  return violations;
}

async function main() {
  const componentFiles = await walk(COMPONENT_ROOT);

  const violations = [];

  for (const file of componentFiles) {
    const content = await fs.readFile(file, "utf8");
    violations.push(...collectComponentImportViolations(content, file));
  }

  if (violations.length > 0) {
    console.error("Variable architecture check failed:\n");
    for (const violation of violations) {
      console.error(
        `- ${path.relative(ROOT, violation.file)}:${violation.line} (${violation.detail})\n  ${violation.message}`
      );
    }
    process.exit(1);
  }

  console.log(
    "Variable architecture check passed: primitives -> alias -> component variable layering is respected."
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
