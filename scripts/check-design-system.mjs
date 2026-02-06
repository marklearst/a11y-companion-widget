import { promises as fs } from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd(), "widget-src/components");
const EXTENSIONS = new Set([".ts", ".tsx"]);

const checks = [
  {
    name: "Hex color literal",
    regex: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    message:
      "Use design-system tokens instead of hex color literals in components.",
  },
  {
    name: "Raw Inter font",
    regex: /fontFamily=\"Inter\"|fontFamily='Inter'/g,
    message:
      "Use design-system typography tokens instead of raw font family literals.",
  },
  {
    name: "Numeric fontSize literal",
    regex: /fontSize=\{\d+\}/g,
    message:
      "Use design-system typography tokens instead of numeric font sizes.",
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

async function main() {
  const files = await walk(ROOT);
  const violations = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    for (const check of checks) {
      let match;
      while ((match = check.regex.exec(content))) {
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

  console.log("Design-system lint passed: no raw colors or typography literals in components.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
