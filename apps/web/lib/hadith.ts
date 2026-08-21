import { withCache } from '@/lib/cache'
import { BROWSER_UA } from '@/lib/constants'
import type { HadithCollection, HadithRecord, HadithSearchResult } from '@noor/types'

const UMMAH_BASE = 'https://ummahapi.com/api/hadith'
const TTL_COLLECTIONS = 60 * 60 * 24 * 7
const TTL_HADITH = 60 * 60 * 24 * 30
const TTL_SEARCH = 60 * 60 * 12

interface UmmahResponse<T> {
  success: boolean
  service: string
  data: T
  timestamp?: string
}

interface UmmahCollection {
  key: string
  name: string
  arabic_name: string
  author: string
  reliability: string
  total_hadiths: number
}

interface UmmahHadith {
  id: string
  collection: string
  collection_name: string
  hadithnumber: number
  arabic: string
  english: string
  grade: string
}

interface UmmahSearchData {
  query: string
  collection: string | null
  limit: number
  total_found: number
  hadiths: UmmahHadith[]
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${UMMAH_BASE}${path}`, {
    cache: 'no-store',
    headers: { 'User-Agent': BROWSER_UA },
  })
  if (!res.ok) throw new Error(`UmmahAPI ${path} -> ${res.status}`)
  const body = (await res.json()) as UmmahResponse<T>
  if (!body.success) throw new Error(`UmmahAPI ${path} -> request failed`)
  return body.data
}

function mapCollection(item: UmmahCollection): HadithCollection {
  return {
    key: item.key,
    name: item.name,
    arabicName: item.arabic_name,
    author: item.author,
    reliability: item.reliability,
    totalHadiths: item.total_hadiths,
  }
}

function mapHadith(item: UmmahHadith): HadithRecord {
  return {
    id: item.id,
    collection: item.collection,
    collectionName: item.collection_name,
    hadithNumber: item.hadithnumber,
    arabic: item.arabic,
    english: item.english,
    grade: item.grade,
    translationBn: null,
  }
}

export async function getHadithCollections(): Promise<HadithCollection[]> {
  return withCache('hadith:collections', TTL_COLLECTIONS, async () => {
    const data = await fetchJson<{ collections: UmmahCollection[] }>('/collections')
    return data.collections.map(mapCollection)
  })
}

export async function getHadith(collection: string, number: number): Promise<HadithRecord> {
  return withCache(`hadith:${collection}:${number}`, TTL_HADITH, async () => {
    const data = await fetchJson<UmmahHadith>(`/${collection}/${number}`)
    return mapHadith(data)
  })
}

export async function searchHadith(
  query: string,
  collection?: string,
  limit = 10,
): Promise<HadithSearchResult> {
  const safeQuery = query.trim()
  return withCache(
    `hadith:search:${collection ?? 'all'}:${limit}:${safeQuery.toLowerCase()}`,
    TTL_SEARCH,
    async () => {
      const params = new URLSearchParams({ q: safeQuery, limit: String(limit) })
      if (collection) params.set('collection', collection)
      const data = await fetchJson<UmmahSearchData>(`/search?${params.toString()}`)
      return {
        query: data.query,
        collection: data.collection,
        limit: data.limit,
        totalFound: data.total_found,
        hadiths: data.hadiths.map(mapHadith),
      }
    },
  )
}
