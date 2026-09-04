import type { StudyThemeIcon } from '@noor/types'

export type ThemeAccent = "emerald" | "blue" | "purple" | "amber"

export interface AccentClasses {
  bg: string
  text: string
  border: string
  hoverBorder: string
}

// Pure monochrome high-contrast B&W design tokens
const monoAccent: AccentClasses = {
  bg: "bg-neutral-100 dark:bg-neutral-900",
  text: "text-neutral-900 dark:text-neutral-100",
  border: "border-neutral-200 dark:border-neutral-800",
  hoverBorder: "hover:border-neutral-900 dark:hover:border-white",
}

const accentMap: Record<ThemeAccent, AccentClasses> = {
  emerald: monoAccent,
  blue: monoAccent,
  purple: monoAccent,
  amber: monoAccent,
}

export function getAccentClasses(accent: ThemeAccent): AccentClasses {
  return accentMap[accent] || monoAccent
}

export interface ThemeAccentLegacy {
  chip: string
  badge: string
  heading: string
  hoverBorder: string
}

const monoLegacy: ThemeAccentLegacy = {
  chip: 'bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800',
  badge: 'bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800',
  heading: 'text-neutral-900 dark:text-white',
  hoverBorder: 'hover:border-neutral-900 dark:hover:border-white',
}

export const themeAccents: Record<StudyThemeIcon, ThemeAccentLegacy> = {
  star: monoLegacy,
  sparkles: monoLegacy,
  eye: monoLegacy,
  heart: monoLegacy,
}
