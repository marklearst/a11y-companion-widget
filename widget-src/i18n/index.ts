export type Locale = 'en' | 'es'

export type Messages = {
  appTitle: string
  progressText: (completed: number, total: number) => string
  tooltipsToggle: string
  hideCompletedToggle: string
}

const en: Messages = {
  appTitle: 'a11y Companion',
  progressText: (c, t) => `${c} of ${t} accessibility checks done`,
  tooltipsToggle: 'Show tooltips on checkable items',
  hideCompletedToggle: 'Hide completed items',
}

const es: Messages = {
  appTitle: 'Compañero a11y',
  progressText: (c, t) => `${c} de ${t} comprobaciones de accesibilidad completadas`,
  tooltipsToggle: 'Mostrar tooltips en elementos con casilla',
  hideCompletedToggle: 'Ocultar elementos completados',
}

export const locales: Record<Locale, Messages> = { en, es }

export function getMessages(locale: Locale): Messages {
  return locales[locale] ?? en
}
