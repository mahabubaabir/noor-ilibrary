import type { StudyThemeIcon } from '@noor/types'

export type ThemeAccent = "emerald" | "blue" | "purple" | "amber"

export interface AccentClasses {
  bg: string
  text: string
  border: string
  hoverBorder: string
}

const accentMap: Record<ThemeAccent, AccentClasses> = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-600",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-600",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    hoverBorder: "hover:border-purple-400 dark:hover:border-purple-600",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-600",
  },
}

export function getAccentClasses(accent: ThemeAccent): AccentClasses {
  return accentMap[accent] || accentMap.emerald
}

export interface ThemeAccentLegacy {
  chip: string
  badge: string
  heading: string
  hoverBorder: string
}

export const themeAccents: Record<StudyThemeIcon, ThemeAccentLegacy> = {
  star: {
    chip: 'bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300',
    badge: 'bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300',
    heading: 'text-emerald-800 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-600/40',
  },
  sparkles: {
    chip: 'bg-sky-700/10 text-sky-800 dark:bg-sky-400/10 dark:text-sky-300',
    badge: 'bg-sky-700/10 text-sky-800 dark:bg-sky-400/10 dark:text-sky-300',
    heading: 'text-sky-800 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-600/40',
  },
  eye: {
    chip: 'bg-violet-700/10 text-violet-800 dark:bg-violet-400/10 dark:text-violet-300',
    badge: 'bg-violet-700/10 text-violet-800 dark:bg-violet-400/10 dark:text-violet-300',
    heading: 'text-violet-800 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-600/40',
  },
  heart: {
    chip: 'bg-rose-700/10 text-rose-800 dark:bg-rose-400/10 dark:text-rose-300',
    badge: 'bg-rose-700/10 text-rose-800 dark:bg-rose-400/10 dark:text-rose-300',
    heading: 'text-rose-800 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-600/40',
  },
}
