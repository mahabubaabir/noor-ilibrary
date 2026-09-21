import type {
  Ayah,
  Reciter,
  SearchMatch,
  SurahDetail,
  SurahMeta,
  TranslationLanguage,
} from '@noor/types'
import { withCache } from '@/lib/cache'
import {
  ALQURAN_BASE,
  EDITION_AR,
  EDITION_BN,
  EDITION_EN,
} from '@/lib/constants'
import type { ContentProvider } from './types'

const TTL_QURAN = 60 * 60 * 24 * 30
const TTL_SEARCH = 60 * 60 * 24 * 7

interface AlquranAyah {
  number: number
  text: string
  numberInSurah: number
  juz: number
  page: number
  sajda?: boolean
}

interface AlquranSurahMeta {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  revelationType: 'Meccan' | 'Medinan'
  numberOfAyahs: number
}

interface AlquranEdition {
  identifier: string
  language: string
  name: string
  englishName?: string
}

interface AlquranEditionResult {
  edition: AlquranEdition
  ayahs: AlquranAyah[]
}

interface AlquranRandomAyah {
  number: number
  text: string
  edition: AlquranEdition
  surah: { number: number }
  numberInSurah: number
  juz: number
  page: number
  sajda?: boolean
}

interface AlquranSearchResult {
  count: number
  matches: {
    number: number
    text: string
    numberInSurah: number
    surah: { number: number }
  }[]
}

interface AlquranResponse<T> {
  code: number
  status: string
  data: T
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${ALQURAN_BASE}${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`alquran.cloud ${path} -> ${res.status}`)
  const body = (await res.json()) as AlquranResponse<T>
  if (body.code !== 200) throw new Error(`alquran.cloud ${path} -> code ${body.code}`)
  return body.data
}

function mergeEditions(results: AlquranEditionResult[]): Ayah[] {
  const byId = new Map(results.map((r) => [r.edition.identifier, r.ayahs]))
  const arabic = byId.get(EDITION_AR) ?? []
  // Align translations by ayah number, not array position: if an edition
  // returns a different count/order, index-based merging would silently
  // attach the wrong translation to an ayah.
  const englishByAyah = new Map(
    (byId.get(EDITION_EN) ?? []).map((a) => [a.numberInSurah, a.text]),
  )
  const bengaliByAyah = new Map(
    (byId.get(EDITION_BN) ?? []).map((a) => [a.numberInSurah, a.text]),
  )
  return arabic.map((a) => ({
    surahNumber: 0,
    numberInSurah: a.numberInSurah,
    globalNumber: a.number,
    juz: a.juz,
    page: a.page,
    sajda: Boolean(a.sajda),
    textArabic: a.text,
    translationEn: englishByAyah.get(a.numberInSurah) ?? '',
    translationBn: bengaliByAyah.get(a.numberInSurah) ?? '',
  }))
}

export const alQuranCloudProvider: ContentProvider = {
  id: 'alquran-cloud',
  name: 'AlQuran Cloud',

  async getSurahList(): Promise<SurahMeta[]> {
    return withCache('provider:alquran:surah-list', TTL_QURAN, async () => {
      const surahs = await fetchJson<AlquranSurahMeta[]>('/surah')
      return surahs.map((s) => ({
        number: s.number,
        nameArabic: s.name,
        nameEnglish: s.englishName,
        nameTranslation: s.englishNameTranslation,
        revelationType: s.revelationType,
        ayahCount: s.numberOfAyahs,
        pageStart: 0,
        pageEnd: 0,
      }))
    })
  },

  async getSurah(number: number): Promise<SurahDetail | null> {
    return withCache(`provider:alquran:surah:${number}`, TTL_QURAN, async () => {
      const results = await fetchJson<AlquranEditionResult[]>(
        `/surah/${number}/editions/${EDITION_AR},${EDITION_EN},${EDITION_BN}`,
      )
      const ayahs = mergeEditions(results)
      const list = await this.getSurahList()
      const meta = list?.find((s) => s.number === number)
      if (!meta) return null
      const firstPage = ayahs[0]?.page ?? 0
      const lastPage = ayahs[ayahs.length - 1]?.page ?? 0
      return {
        meta: { ...meta, pageStart: firstPage, pageEnd: lastPage },
        ayahs: ayahs.map((a) => ({ ...a, surahNumber: number })),
      }
    })
  },

  async search(query: string, language: TranslationLanguage): Promise<SearchMatch[] | null> {
    const edition = language === 'bn' ? EDITION_BN : EDITION_EN
    return withCache(
      `provider:alquran:search:${language}:${query.trim().toLowerCase()}`,
      TTL_SEARCH,
      async () => {
        const data = await fetchJson<AlquranSearchResult>(
          `/search/${encodeURIComponent(query.trim())}/all/${edition}`,
        )
        return data.matches.map((m) => ({
          surahNumber: m.surah.number,
          numberInSurah: m.numberInSurah,
          globalNumber: m.number,
          text: m.text,
        }))
      },
    )
  },

  async getAudioEditions(): Promise<Reciter[] | null> {
    return withCache('provider:alquran:audio-editions', TTL_QURAN, async () => {
      const data = await fetchJson<AlquranEdition[]>('/edition?format=audio&type=versebyverse')
      return data
        .filter((e) => e.language === 'ar')
        .map((e) => ({ id: e.identifier, name: e.englishName ?? e.name }))
    })
  },

  async getRandomAyah(): Promise<Ayah | null> {
    // Deliberately NOT cached: a fixed cache key would serve the same
    // "random" ayah to every visitor for the whole TTL (12h).
    // The random endpoint returns a flat list of ayah objects (one per edition),
    // not the { edition, ayahs } shape used by chapter editions.
    const results = await fetchJson<AlquranRandomAyah[]>(
      `/ayah/random/editions/${EDITION_AR},${EDITION_EN},${EDITION_BN}`,
    )
    const byEdition = new Map(results.map((item) => [item.edition.identifier, item]))
    const arabic = byEdition.get(EDITION_AR)
    if (!arabic) return null
    const english = byEdition.get(EDITION_EN)
    const bengali = byEdition.get(EDITION_BN)
    return {
      surahNumber: arabic.surah?.number ?? 0,
      numberInSurah: arabic.numberInSurah,
      globalNumber: arabic.number,
      juz: arabic.juz,
      page: arabic.page,
      sajda: Boolean(arabic.sajda),
      textArabic: arabic.text,
      translationEn: english?.text ?? '',
      translationBn: bengali?.text ?? '',
    }
  },

  getTafsirChapter: async () => null,
}