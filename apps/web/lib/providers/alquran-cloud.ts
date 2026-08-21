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
const TTL_HOME = 60 * 60 * 12

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
  const res = await fetch(`${ALQURAN_BASE}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`alquran.cloud ${path} -> ${res.status}`)
  const body = (await res.json()) as AlquranResponse<T>
  if (body.code !== 200) throw new Error(`alquran.cloud ${path} -> code ${body.code}`)
  return body.data
}

function mergeEditions(results: AlquranEditionResult[]): Ayah[] {
  const byId = new Map(results.map((r) => [r.edition.identifier, r.ayahs]))
  const arabic = byId.get(EDITION_AR) ?? []
  const english = byId.get(EDITION_EN) ?? []
  const bengali = byId.get(EDITION_BN) ?? []
  return arabic.map((a, i) => ({
    surahNumber: 0,
    numberInSurah: a.numberInSurah,
    globalNumber: a.number,
    juz: a.juz,
    page: a.page,
    sajda: Boolean(a.sajda),
    textArabic: a.text,
    translationEn: english[i]?.text ?? '',
    translationBn: bengali[i]?.text ?? '',
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
    return withCache('provider:alquran:random-ayah', TTL_HOME, async () => {
      const results = await fetchJson<AlquranEditionResult[]>(
        `/ayah/random/editions/${EDITION_AR},${EDITION_EN},${EDITION_BN}`,
      )
      const ayahs = mergeEditions(results)
      return ayahs[0] ?? null
    })
  },

  getTafsirChapter: async () => null,
}