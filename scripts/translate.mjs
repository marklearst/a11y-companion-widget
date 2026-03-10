#!/usr/bin/env node

/**
 * Translation script for i18n messages and checklist data.
 *
 * Usage:
 *   pnpm run translate -- --locale fr [--provider lingva|mymemory|google|libre|dry-run]
 *
 * Environment:
 *   GOOGLE_TRANSLATE_API_KEY - API key for Google Cloud Translation
 *   LIBRETRANSLATE_API_URL   - Base URL for libre (default: https://libretranslate.com)
 *   LIBRETRANSLATE_API_KEY   - API key if required by LibreTranslate instance
 *   LINGVA_URL               - Lingva instance URL (default: https://lingva.ml)
 *
 * Providers:
 *   lingva   - Lingva Translate (free Google Translate proxy, no API key, default)
 *   mymemory - MyMemory API (free, no API key, daily limit)
 *   google   - Google Cloud Translation API (requires API key + billing)
 *   libre    - LibreTranslate API (self-hosted free, or paid hosted)
 *   dry-run  - Output structure with English text for manual translation
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  protectBeforeTranslate,
  restoreAfterTranslate,
} from "./translation-protect.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MESSAGES_EN = path.join(ROOT, "widget-src/i18n/messages/en.json");
const CHECKLIST_EN = path.join(ROOT, "widget-src/data/a11yChecklistData.json");

const LINGVA_INSTANCES = [
  "https://lingva.ml",
  "https://translate.plausibility.cloud",
];

async function translateWithLingva(text, targetLang, baseUrl) {
  const encoded = encodeURIComponent(text);
  const url = `${baseUrl}/api/v1/en/${targetLang}/${encoded}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Lingva API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.translation ?? text;
}

async function translateWithLingvaFallback(text, targetLang, preferredUrl) {
  const instances = preferredUrl
    ? [preferredUrl, ...LINGVA_INSTANCES.filter((u) => u !== preferredUrl)]
    : LINGVA_INSTANCES;
  for (const instance of instances) {
    try {
      return await translateWithLingva(text, targetLang, instance);
    } catch (_err) {
      continue;
    }
  }
  throw new Error("All Lingva instances failed");
}

const MYMEMORY_BASE = "https://api.mymemory.translated.net/get";
const MYMEMORY_MAX_BYTES = 500;

function chunkForMyMemory(text) {
  const byteLength = Buffer.byteLength(text, "utf8");
  if (byteLength <= MYMEMORY_MAX_BYTES) return [text];

  const parts = [];
  let remaining = text;
  while (remaining.length > 0) {
    let chunk = remaining;
    while (
      Buffer.byteLength(chunk, "utf8") > MYMEMORY_MAX_BYTES &&
      chunk.length > 1
    ) {
      const lastSpace = chunk.lastIndexOf(" ", MYMEMORY_MAX_BYTES);
      const splitAt = lastSpace > 0 ? lastSpace : MYMEMORY_MAX_BYTES;
      chunk = chunk.slice(0, splitAt);
    }
    parts.push(chunk);
    remaining = remaining.slice(chunk.length).replace(/^\s+/, "");
  }
  return parts;
}

async function translateWithMyMemory(text, targetLang) {
  const chunks = chunkForMyMemory(text);
  const results = [];
  for (const chunk of chunks) {
    const encoded = encodeURIComponent(chunk);
    const url = `${MYMEMORY_BASE}?q=${encoded}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`MyMemory API error ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    const translated =
      data.responseData?.translatedText ??
      data.matches?.[0]?.translation ??
      chunk;
    results.push(translated);
  }
  return results.join(" ");
}

const GOOGLE_TRANSLATE_URL =
  "https://translation.googleapis.com/language/translate/v2";

async function translateWithGoogle(text, targetLang, apiKey) {
  const body = new URLSearchParams({
    q: text,
    target: targetLang,
    source: "en",
    format: "text",
  });
  const res = await fetch(`${GOOGLE_TRANSLATE_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Translation API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.data?.translations?.[0]?.translatedText ?? text;
}

async function translateWithLibre(text, targetLang, apiUrl, apiKey) {
  const url = `${apiUrl.replace(/\/$/, "")}/translate`;
  const body = {
    q: text,
    source: "en",
    target: targetLang,
    format: "text",
  };
  if (apiKey) body.api_key = apiKey;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`LibreTranslate API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.translatedText ?? text;
}

const RATE_LIMIT_MS = 50;

const LOCALE_TO_API_CODE = {
  "pt-BR": "pt",
  nb: "no",
};

function resolveApiLang(locale) {
  return LOCALE_TO_API_CODE[locale] ?? locale;
}

const SKIP_MESSAGE_KEYS = new Set(["appTitle"]);

async function translateString(text, targetLang, provider, apiUrl, apiKey) {
  if (!text || typeof text !== "string") return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  if (provider === "dry-run") {
    return text;
  }

  const { protected: shielded, restorationMap } = protectBeforeTranslate(text);
  const apiLang = resolveApiLang(targetLang);

  let translated;

  if (provider === "lingva") {
    const lingvaUrl = process.env.LINGVA_URL || "";
    translated = await translateWithLingvaFallback(
      shielded,
      apiLang,
      lingvaUrl,
    );
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  } else if (provider === "mymemory") {
    translated = await translateWithMyMemory(shielded, apiLang);
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  } else if (provider === "google") {
    const gKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!gKey) {
      throw new Error(
        "Google provider requires GOOGLE_TRANSLATE_API_KEY environment variable",
      );
    }
    translated = await translateWithGoogle(shielded, apiLang, gKey);
    await new Promise((r) => setTimeout(r, 50));
  } else if (provider === "libre") {
    translated = await translateWithLibre(shielded, apiLang, apiUrl, apiKey);
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  } else {
    return text;
  }

  return restoreAfterTranslate(translated, restorationMap);
}

function collectStrings(obj, prefix = "") {
  const result = [];
  if (typeof obj === "string") {
    result.push({ path: prefix, value: obj });
    return result;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      result.push(...collectStrings(obj[i], `${prefix}[${i}]`));
    }
    return result;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (
        typeof v === "string" &&
        !k.startsWith("_") &&
        k !== "id" &&
        k !== "link"
      ) {
        result.push({ path: key, value: v });
      } else if (typeof v === "object" && v !== null) {
        result.push(...collectStrings(v, key));
      }
    }
  }
  return result;
}

function setByPath(obj, pathStr, value) {
  const parts = pathStr.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = current[p];
    if (next === undefined) {
      current[p] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    }
    current = current[p];
  }
  current[parts[parts.length - 1]] = value;
}

function collectChecklistStrings(checklist) {
  const result = [];
  // Skip top-level title (brand name stays "a11y Companion")
  for (let s = 0; s < (checklist.sections || []).length; s++) {
    const sec = checklist.sections[s];
    if (sec.title)
      result.push({ path: `sections[${s}].title`, value: sec.title });
    if (sec.description)
      result.push({
        path: `sections[${s}].description`,
        value: sec.description,
      });
    for (let i = 0; i < (sec.items || []).length; i++) {
      const item = sec.items[i];
      if (item.text)
        result.push({
          path: `sections[${s}].items[${i}].text`,
          value: item.text,
        });
      if (item.wcag)
        result.push({
          path: `sections[${s}].items[${i}].wcag`,
          value: item.wcag,
        });
      if (item.longDescription)
        result.push({
          path: `sections[${s}].items[${i}].longDescription`,
          value: item.longDescription,
        });
    }
  }
  return result;
}

function setChecklistByPath(checklist, pathStr, value) {
  const match = pathStr.match(
    /^sections\[(\d+)\]\.items\[(\d+)\]\.(text|wcag|longDescription)$/,
  );
  if (match) {
    const [, s, i, field] = match;
    checklist.sections[+s].items[+i][field] = value;
    return;
  }
  const secMatch = pathStr.match(/^sections\[(\d+)\]\.(title|description)$/);
  if (secMatch) {
    const [, s, field] = secMatch;
    checklist.sections[+s][field] = value;
    return;
  }
  if (pathStr === "title") checklist.title = value;
}

async function main() {
  const args = process.argv.slice(2);
  let locale = null;
  let provider = "lingva";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--locale" && args[i + 1]) {
      locale = args[++i];
    } else if (args[i] === "--provider" && args[i + 1]) {
      provider = args[++i];
    }
  }

  if (!locale) {
    console.error(
      "Usage: pnpm run translate -- --locale <code> [--provider lingva|mymemory|google|libre|dry-run]",
    );
    process.exit(1);
  }

  const apiUrl =
    process.env.LIBRETRANSLATE_API_URL || "https://libretranslate.com";
  const apiKey = process.env.LIBRETRANSLATE_API_KEY || "";

  console.log(`Translating to ${locale} (provider: ${provider})`);

  const messagesEn = JSON.parse(await fs.readFile(MESSAGES_EN, "utf8"));
  const checklistEn = JSON.parse(await fs.readFile(CHECKLIST_EN, "utf8"));

  const messagesOut = { ...messagesEn };
  const checklistOut = JSON.parse(JSON.stringify(checklistEn));

  const messageEntries = Object.entries(messagesEn);
  for (let i = 0; i < messageEntries.length; i++) {
    const [key, value] = messageEntries[i];
    if (SKIP_MESSAGE_KEYS.has(key)) {
      messagesOut[key] = value;
      continue;
    }
    messagesOut[key] = await translateString(
      value,
      locale,
      provider,
      apiUrl,
      apiKey,
    );
    if (provider !== "dry-run" && (i + 1) % 10 === 0) {
      console.log(`  Messages: ${i + 1}/${messageEntries.length}`);
    }
  }

  const checklistEntries = collectChecklistStrings(checklistEn);
  for (let i = 0; i < checklistEntries.length; i++) {
    const { path: p, value } = checklistEntries[i];
    const translated = await translateString(
      value,
      locale,
      provider,
      apiUrl,
      apiKey,
    );
    setChecklistByPath(checklistOut, p, translated);
    if (provider !== "dry-run" && (i + 1) % 20 === 0) {
      console.log(`  Checklist: ${i + 1}/${checklistEntries.length}`);
    }
  }

  const messagesPath = path.join(
    ROOT,
    `widget-src/i18n/messages/${locale}.json`,
  );
  const checklistPath = path.join(
    ROOT,
    `widget-src/data/a11yChecklistData.${locale}.json`,
  );

  await fs.mkdir(path.dirname(messagesPath), { recursive: true });
  await fs.writeFile(
    messagesPath,
    JSON.stringify(messagesOut, null, 2) + "\n",
    "utf8",
  );
  await fs.writeFile(
    checklistPath,
    JSON.stringify(checklistOut, null, 2) + "\n",
    "utf8",
  );

  console.log(`Wrote ${messagesPath}`);
  console.log(`Wrote ${checklistPath}`);

  if (provider === "dry-run") {
    console.log(
      "\nDry-run: output files contain English text. Run with --provider lingva (free, default), mymemory, google, or libre to translate.",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
