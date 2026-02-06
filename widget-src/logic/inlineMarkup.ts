export type StyleState = {
  code?: boolean;
  kbd?: boolean;
  strong?: boolean;
  em?: boolean;
  href?: string;
};

export type Segment = {
  text: string;
  state: StyleState;
};

const TAG_REGEX = /<\/?[^>]+>/g;
const A11Y_BASE_URL = "https://www.a11yproject.com";

function decodeEntities(value: string) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

export function sanitizeHref(href?: string) {
  if (!href) return undefined;
  const trimmed = href.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `${A11Y_BASE_URL}${trimmed}`;
  }
  if (trimmed.startsWith("#")) {
    return `${A11Y_BASE_URL}${trimmed}`;
  }
  return undefined;
}

export function parseInlineMarkup(input: string): Segment[] {
  const segments: Segment[] = [];
  const stack: StyleState[] = [];
  let style: StyleState = {};
  let lastIndex = 0;
  TAG_REGEX.lastIndex = 0;

  const pushText = (text: string) => {
    if (!text) return;
    segments.push({ text: decodeEntities(text), state: { ...style } });
  };

  let match: RegExpExecArray | null;
  while ((match = TAG_REGEX.exec(input))) {
    const tag = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) {
      pushText(input.slice(lastIndex, index));
    }

    const isClosing = tag.startsWith("</");
    const tagMatch = tag.match(/^<\/?([a-zA-Z0-9]+)([^>]*)>/);
    if (!tagMatch) {
      lastIndex = index + tag.length;
      continue;
    }

    const [, rawName, rawAttrs = ""] = tagMatch;
    const name = rawName.toLowerCase();

    if (isClosing) {
      style = stack.pop() ?? {};
    } else {
      stack.push({ ...style });
      const next: StyleState = { ...style };
      if (name === "code") next.code = true;
      if (name === "kbd") next.kbd = true;
      if (name === "strong" || name === "b") next.strong = true;
      if (name === "em" || name === "i") next.em = true;
      if (name === "abbr") next.strong = true;
      if (name === "a") {
        const hrefMatch = rawAttrs.match(/href=["']([^"']+)["']/i);
        next.href = sanitizeHref(hrefMatch?.[1]);
      }
      style = next;
    }

    lastIndex = index + tag.length;
  }

  if (lastIndex < input.length) {
    pushText(input.slice(lastIndex));
  }

  return segments;
}

export function segmentsToPlainText(segments: Segment[]) {
  return segments.map((segment) => segment.text).join("");
}

export function segmentsToMarkdown(segments: Segment[]) {
  return segments
    .map((segment) => {
      let text = segment.text;
      if (segment.state.code || segment.state.kbd) {
        text = `\`${text}\``;
      }
      if (segment.state.strong) {
        text = `**${text}**`;
      }
      if (segment.state.em) {
        text = `*${text}*`;
      }
      if (segment.state.href) {
        text = `[${text}](${segment.state.href})`;
      }
      return text;
    })
    .join("");
}
