import type { Metadata } from 'next'
import { studyThemes } from '@/lib/study/themes'
import { ThemeCard } from '@/components/study/theme-card'

export const metadata: Metadata = {
  title: 'Study & Themes',
  description:
    'Guided study themes from the Quran — the oneness of Allah, signs in creation, the unseen world, and the purpose of life.',
}

export default function StudyIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Study & Themes</h1>
      <p className="mt-1 max-w-3xl text-sm text-stone-500 dark:text-stone-400">
        Guided journeys through the Quran. Each theme gathers the verses and hadiths around one
        central idea — a small course for learning the meaning of deen, one ayah at a time.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {studyThemes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  )
}