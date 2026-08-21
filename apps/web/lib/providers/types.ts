import type {
  Reciter,
  SearchMatch,
  SurahDetail,
  SurahMeta,
  TafsirChapter,
  TranslationLanguage,
} from '@noor/types'

/**
 * Every content source (Quran, tafsir, hadith, audio, ...) plugs into this
 * interface. A method returns `null` when the provider does not support it;
 * the registry then falls through to the next provider.
 *
 * Adding a new resource type later (e.g. hadith, dua, prayer times) means
 * extending this interface and adding a provider implementation - the rest of
 * the app stays unchanged.
 */
export interface ContentProvider {
  readonly id: string
  readonly name: string
  getSurahList(): Promise<SurahMeta[] | null>
  getSurah(number: number): Promise<SurahDetail | null>
  search(query: string, language: TranslationLanguage): Promise<SearchMatch[] | null>
  getAudioEditions(): Promise<Reciter[] | null>
  getRandomAyah(): Promise<SurahDetail['ayahs'][number] | null>
  getTafsirChapter(
    surahNumber: number,
    language: TranslationLanguage,
  ): Promise<TafsirChapter | null>
}