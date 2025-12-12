/**
 * Checklist templates for common design scenarios.
 *
 * @remarks
 * Pre-configured section filters for different project types.
 *
 * @since 1.2.0
 */

export type TemplateType =
  | "all"
  | "landing-page"
  | "dashboard"
  | "mobile-app"
  | "quick-audit"
  | "forms-heavy";

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  sections: string[];
}

export const templates: Template[] = [
  {
    id: "all",
    name: "All Checks",
    description: "Complete accessibility checklist",
    sections: [
      "Content",
      "Código global",
      "Global code",
      "Teclado",
      "Keyboard",
      "Imágenes",
      "Images",
      "Encabezados",
      "Headings",
      "Listas",
      "Lists",
      "Controles",
      "Controls",
      "Tablas",
      "Tables",
      "Formularios",
      "Forms",
      "Medios",
      "Media",
      "Video",
      "Audio",
      "Apariencia",
      "Appearance",
      "Animación",
      "Animation",
      "Contraste de color",
      "Color contrast",
      "Móvil y táctil",
      "Mobile and touch",
    ],
  },
  {
    id: "landing-page",
    name: "Landing Page",
    description: "Content-focused marketing pages",
    sections: [
      "Content",
      "Contenido",
      "Images",
      "Imágenes",
      "Headings",
      "Encabezados",
      "Controls",
      "Controles",
      "Color contrast",
      "Contraste de color",
      "Forms",
      "Formularios",
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard / App",
    description: "Interactive applications and dashboards",
    sections: [
      "Keyboard",
      "Teclado",
      "Controls",
      "Controles",
      "Forms",
      "Formularios",
      "Tables",
      "Tablas",
      "Color contrast",
      "Contraste de color",
      "Global code",
      "Código global",
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    description: "Mobile and touch-focused experiences",
    sections: [
      "Mobile and touch",
      "Móvil y táctil",
      "Keyboard",
      "Teclado",
      "Controls",
      "Controles",
      "Color contrast",
      "Contraste de color",
      "Content",
      "Contenido",
    ],
  },
  {
    id: "quick-audit",
    name: "Quick Audit",
    description: "Top 10 most common accessibility issues",
    sections: [
      "Color contrast",
      "Contraste de color",
      "Images",
      "Imágenes",
      "Controls",
      "Controles",
      "Keyboard",
      "Teclado",
      "Content",
      "Contenido",
    ],
  },
  {
    id: "forms-heavy",
    name: "Forms Heavy",
    description: "Forms and data entry focused",
    sections: [
      "Forms",
      "Formularios",
      "Controls",
      "Controles",
      "Keyboard",
      "Teclado",
      "Color contrast",
      "Contraste de color",
    ],
  },
];

/**
 * Gets template by ID.
 */
export function getTemplate(id: TemplateType): Template {
  return templates.find((t) => t.id === id) ?? templates[0];
}

/**
 * Filters sections based on template.
 */
export function filterSectionsByTemplate<T extends { title: string }>(
  sections: T[],
  template: TemplateType
): T[] {
  if (template === "all") {
    return sections;
  }

  const templateDef = getTemplate(template);
  return sections.filter((section) =>
    templateDef.sections.includes(section.title)
  );
}
