export type Locale = "en" | "es";

export type Messages = {
  appTitle: string;
  progressText: (completed: number, total: number) => string;
  tooltipsToggle: string;
  hideCompletedToggle: string;
  markAllComplete: string;
  markAllIncomplete: string;
  collapseAll: string;
  expandAll: string;
  searchLabel: string;
  searchPlaceholder: string;
  exportProgress: string;
  importProgress: string;
  noResults: string;
  quickCopy: string;
  exportFormat: string;
  checklistTemplate: string;
  templates: {
    all: { name: string; description: string };
    landingPage: { name: string; description: string };
    dashboard: { name: string; description: string };
    mobileApp: { name: string; description: string };
    quickAudit: { name: string; description: string };
    formsHeavy: { name: string; description: string };
  };
};

const en: Messages = {
  appTitle: "a11y Companion",
  progressText: (c, t) => `${c} of ${t} accessibility checks done`,
  tooltipsToggle: "Show tooltips on checkable items",
  hideCompletedToggle: "Hide completed items",
  markAllComplete: "Mark all complete",
  markAllIncomplete: "Mark all incomplete",
  collapseAll: "Collapse all",
  expandAll: "Expand all",
  searchLabel: "Search:",
  searchPlaceholder: "Type to filter items...",
  exportProgress: "Export progress",
  importProgress: "Import progress",
  noResults: "No items found",
  quickCopy: "Export Format:",
  exportFormat: "Export Format:",
  checklistTemplate: "Checklist Template:",
  templates: {
    all: {
      name: "All Checks",
      description: "Complete accessibility checklist",
    },
    landingPage: {
      name: "Landing Page",
      description: "Content-focused marketing pages",
    },
    dashboard: {
      name: "Dashboard / App",
      description: "Interactive applications and dashboards",
    },
    mobileApp: {
      name: "Mobile App",
      description: "Mobile and touch-focused experiences",
    },
    quickAudit: {
      name: "Quick Audit",
      description: "Top 10 most common accessibility issues",
    },
    formsHeavy: {
      name: "Forms Heavy",
      description: "Forms and data entry focused",
    },
  },
};

const es: Messages = {
  appTitle: "Compañero a11y",
  progressText: (c, t) =>
    `${c} de ${t} comprobaciones de accesibilidad completadas`,
  tooltipsToggle: "Mostrar tooltips en elementos con casilla",
  hideCompletedToggle: "Ocultar elementos completados",
  markAllComplete: "Marcar todo como completo",
  markAllIncomplete: "Marcar todo como incompleto",
  collapseAll: "Contraer todo",
  expandAll: "Expandir todo",
  searchLabel: "Buscar:",
  searchPlaceholder: "Escribe para filtrar...",
  exportProgress: "Exportar progreso",
  importProgress: "Importar progreso",
  noResults: "No se encontraron elementos",
  quickCopy: "Formato de Exportación:",
  exportFormat: "Formato de Exportación:",
  checklistTemplate: "Plantilla de Lista:",
  templates: {
    all: {
      name: "Todas las Comprobaciones",
      description: "Lista completa de accesibilidad",
    },
    landingPage: {
      name: "Página de Destino",
      description: "Páginas de marketing centradas en contenido",
    },
    dashboard: {
      name: "Panel / App",
      description: "Aplicaciones interactivas y paneles",
    },
    mobileApp: {
      name: "App Móvil",
      description: "Experiencias móviles y táctiles",
    },
    quickAudit: {
      name: "Auditoría Rápida",
      description: "Top 10 problemas de accesibilidad más comunes",
    },
    formsHeavy: {
      name: "Formularios Pesados",
      description: "Enfocado en formularios y entrada de datos",
    },
  },
};

export const locales: Record<Locale, Messages> = { en, es };

export function getMessages(locale: Locale): Messages {
  return locales[locale] ?? en;
}
