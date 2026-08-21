import type {
  Ayah,
  Reciter,
  SearchMatch,
  SurahDetail,
  SurahMeta,
  TafsirChapter,
  TranslationLanguage,
} from '@noor/types'
import { alQuranCloudProvider } from './alquran-cloud'
import { quranComProvider } from './quran-com'
import type { ContentProvider } from './types'

/**
 * Ordered registry. Providers are tried in order; `null` or a thrown error
 * falls through to the next provider, so a single source outage never breaks
 * the app. Add a provider (e.g. UmmahAPI for hadith) by appending it here.
 */
const providers: ContentProvider[] = [alQuranCloudProvider, quranComProvider]

async function withFallback<T>(call: (provider: ContentProvider) => Promise<T | null>): Promise<T> {
  let lastError: unknown
  for (const provider of providers) {
    try {
      const result = await call(provider)
      if (result !== null) return result
    } catch (error) {
      lastError = error
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error('All content providers failed')
}

export const content = {
  surahs: () => withFallback((p) => p.getSurahList()),
  surah: (number: number) => withFallback((p) => p.getSurah(number)),
  search: (query: string, language: TranslationLanguage) =>
    withFallback((p) => p.search(query, language)),
  audioEditions: () => withFallback((p) => p.getAudioEditions()),
  randomAyah: () => withFallback((p) => p.getRandomAyah()),
  tafsir: (surahNumber: number, language: TranslationLanguage) =>
    withFallback((p) => p.getTafsirChapter(surahNumber, language)),
}

export type { Ayah, ContentProvider, Reciter, SearchMatch, SurahDetail, SurahMeta, TafsirChapter }