import type { TafsirChapter, TranslationLanguage } from '@noor/types'
import { withCache } from '@/lib/cache'
import { BROWSER_UA, QURANCOM_BASE } from '@/lib/constants'
import type { ContentProvider } from './types'

const TTL_QURAN = 60 * 60 * 24 * 30

const TAFSIR_SLUGS: Record<TranslationLanguage, { slug: string; source: string }> = {
  en: { slug: 'en-tafisr-ibn-kathir', source: 'Tafsir Ibn Kathir (abridged)' },
  bn: { slug: 'bn-tafsir-ahsanul-bayaan', source: 'Tafsir Ahsanul Bayaan' },
}

interface QuranComTafsirResponse {
  tafsirs: {
    verse_key: string
    text: string
  }[]
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${QURANCOM_BASE}${path}`, {
    cache: 'no-store',
    headers: { 'User-Agent': BROWSER_UA },
  })
  if (!res.ok) throw new Error(`quran.com ${path} -> ${res.status}`)
  return (await res.json()) as T
}

export const quranComProvider: ContentProvider = {
  id: 'quran-com',
  name: 'Quran.com',

  async getTafsirChapter(
    surahNumber: number,
    language: TranslationLanguage,
  ): Promise<TafsirChapter | null> {
    const { slug, source } = TAFSIR_SLUGS[language]
    return withCache(`provider:qurancom:tafsir:${language}:${surahNumber}`, TTL_QURAN, async () => {
      const data = await fetchJson<QuranComTafsirResponse>(
        `/tafsirs/${slug}/by_chapter/${surahNumber}?fields=text`,
      )
      const entries: Record<number, string> = {}
      for (const t of data.tafsirs ?? []) {
        const ayahNumber = Number(t.verse_key.split(':')[1])
        if (Number.isInteger(ayahNumber)) entries[ayahNumber] = t.text
      }
      return { surahNumber, language, source, entries }
    })
  },

  getSurahList: async () => null,
  getSurah: async () => null,
  search: async () => null,
  getAudioEditions: async () => null,
  getRandomAyah: async () => null,
}