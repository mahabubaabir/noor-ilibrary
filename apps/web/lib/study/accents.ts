import type { StudyThemeIcon } from '@noor/types'

export interface ThemeAccent {
  chip: string
  badge: string
  heading: string
  hoverBorder: string
}

export const themeAccents: Record<StudyThemeIcon, ThemeAccent> = {
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