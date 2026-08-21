import type { Metadata } from 'next'
import { content } from '@/lib/providers'
import { SurahList } from '@/components/quran/surah-list'

export const metadata: Metadata = {
  title: 'Read the Quran',
  description: 'Browse all 114 surahs of the Quran.',
}

export default async function QuranIndexPage() {
  const surahs = await content.surahs()
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-semibold">The Quran</h1>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        All 114 surahs — Arabic (Uthmani) with English (Saheeh International) and Bangla
        (Muhiuddin Khan) translations, verse audio and more.
      </p>
      <div className="mt-6">
        <SurahList surahs={surahs} />
      </div>
    </div>
  )
}