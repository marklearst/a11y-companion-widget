import type { ChecklistDataType, WCAGLevel } from "types";

type LegacyTask = {
  title?: string;
  checkboxId?: string;
  wcag?: string;
  url?: string;
  description?: string;
  level?: WCAGLevel | string | null;
};

type LegacySection = {
  preface?: string;
  tasks?: LegacyTask[];
};

export type LegacyChecklist = Record<string, LegacySection>;

const normalizeKey = (value?: string) => {
  if (!value) return "";
  return value.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
};

const resolveLegacySection = (
  legacy: LegacyChecklist,
  sectionId: string,
  sectionTitle: string
) => {
  const candidates = [
    sectionId,
    sectionTitle,
    sectionId ? sectionId.replace(/-/g, " ") : undefined,
  ]
    .map(normalizeKey)
    .filter(Boolean);
  for (const key of candidates) {
    const direct = legacy[key];
    if (direct) return direct;
  }
  return undefined;
};

type LegacyOverrideOptions = {
  sectionIds: string[];
};

export function applyLegacyOverrides(
  data: ChecklistDataType,
  legacy: LegacyChecklist,
  options: LegacyOverrideOptions
): ChecklistDataType {
  const sectionIds = new Set(options.sectionIds);
  if (sectionIds.size === 0) return data;

  return {
    ...data,
    sections: data.sections.map((section) => {
      if (!sectionIds.has(section.id)) return section;
      const legacySection = resolveLegacySection(
        legacy,
        section.id,
        section.title
      );
      if (!legacySection || !legacySection.tasks?.length) {
        return section;
      }
      const tasks = section.items.map((item, index) => {
        const legacyTask = legacySection.tasks?.[index];
        if (!legacyTask) return item;
        return {
          ...item,
          text: legacyTask.title ?? item.text,
          wcag: legacyTask.wcag ?? item.wcag,
          level: legacyTask.level ?? item.level ?? null,
          longDescription: legacyTask.description ?? item.longDescription,
        };
      });
      return {
        ...section,
        description: legacySection.preface ?? section.description,
        items: tasks,
      };
    }),
  };
}
