export type Locale = 'en' | 'es'

export type Messages = {
  appTitle: string
  progressText: (completed: number, total: number) => string
  tooltipsToggle: string
  hideCompletedToggle: string
  markAllComplete: string
  markAllIncomplete: string
  collapseAll: string
  expandAll: string
  searchPlaceholder: string
  exportProgress: string
  importProgress: string
  noResults: string
}

const en: Messages = {
  appTitle: 'a11y Companion',
  progressText: (c, t) => `${c} of ${t} accessibility checks done`,
  tooltipsToggle: 'Show tooltips on checkable items',
  hideCompletedToggle: 'Hide completed items',
  markAllComplete: 'Mark all complete',
  markAllIncomplete: 'Mark all incomplete',
  collapseAll: 'Collapse all',
  expandAll: 'Expand all',
  searchPlaceholder: 'Search checklist...',
  exportProgress: 'Export progress',
  importProgress: 'Import progress',
  noResults: 'No items found',
}

const es: Messages = {
  appTitle: 'Compañero a11y',
  progressText: (c, t) => `${c} de ${t} comprobaciones de accesibilidad completadas`,
  tooltipsToggle: 'Mostrar tooltips en elementos con casilla',
  hideCompletedToggle: 'Ocultar elementos completados',
  markAllComplete: 'Marcar todo como completo',
  markAllIncomplete: 'Marcar todo como incompleto',
  collapseAll: 'Contraer todo',
  expandAll: 'Expandir todo',
  searchPlaceholder: 'Buscar en lista...',
  exportProgress: 'Exportar progreso',
  importProgress: 'Importar progreso',
  noResults: 'No se encontraron elementos',
}

export const locales: Record<Locale, Messages> = { en, es }

export function getMessages(locale: Locale): Messages {
  return locales[locale] ?? en
}
