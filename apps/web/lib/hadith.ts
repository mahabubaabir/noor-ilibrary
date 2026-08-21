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

const FALLBACK_COLLECTIONS: HadithCollection[] = [
  {
    key: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabicName: 'صحيح البخاري',
    author: 'Imam Muhammad al-Bukhari',
    reliability: 'Sahih (Authentic)',
    totalHadiths: 7563,
  },
  {
    key: 'muslim',
    name: 'Sahih Muslim',
    arabicName: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj',
    reliability: 'Sahih (Authentic)',
    totalHadiths: 7500,
  },
  {
    key: 'abudawud',
    name: 'Sunan Abi Dawud',
    arabicName: 'سنن أبي داود',
    author: 'Imam Abu Dawud',
    reliability: 'Sunan',
    totalHadiths: 5274,
  },
  {
    key: 'tirmidhi',
    name: 'Jami` at-Tirmidhi',
    arabicName: 'جامع الترمذي',
    author: 'Imam at-Tirmidhi',
    reliability: 'Sunan',
    totalHadiths: 3956,
  },
  {
    key: 'nasai',
    name: 'Sunan an-Nasa\'i',
    arabicName: 'سنن النسائي',
    author: 'Imam an-Nasa\'i',
    reliability: 'Sunan',
    totalHadiths: 5758,
  },
  {
    key: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    arabicName: 'سنن ابن ماجه',
    author: 'Imam Ibn Majah',
    reliability: 'Sunan',
    totalHadiths: 4341,
  },
  {
    key: 'nawawi40',
    name: '40 Hadith an-Nawawi',
    arabicName: 'الأربعون النووية',
    author: 'Imam Yahya an-Nawawi',
    reliability: 'Sahih & Hasan',
    totalHadiths: 42,
  },
]

export async function getHadithCollections(): Promise<HadithCollection[]> {
  return withCache('hadith:collections', TTL_COLLECTIONS, async () => {
    try {
      const data = await fetchJson<{ collections: UmmahCollection[] }>('/collections')
      if (data?.collections && Array.isArray(data.collections) && data.collections.length > 0) {
        return data.collections.map(mapCollection)
      }
      return FALLBACK_COLLECTIONS
    } catch {
      return FALLBACK_COLLECTIONS
    }
  })
}

export async function getHadith(collection: string, number: number): Promise<HadithRecord> {
  return withCache(`hadith:${collection}:${number}`, TTL_HADITH, async () => {
    const data = await fetchJson<UmmahHadith>(`/${collection}/${number}`)
    return mapHadith(data)
  })
}

export async function getHadithList(
  collection: string,
  start = 1,
  limit = 10,
): Promise<{ hadiths: HadithRecord[]; total: number }> {
  const safeLimit = Math.min(Math.max(limit, 1), 50)
  const safeStart = Math.max(start, 1)

  const items: HadithRecord[] = []
  const promises: Promise<void>[] = []

  for (let num = safeStart; num < safeStart + safeLimit; num++) {
    promises.push(
      getHadith(collection, num)
        .then((h) => {
          items.push(h)
        })
        .catch(() => undefined),
    )
  }

  await Promise.all(promises)
  // Sort by hadithNumber ascending
  items.sort((a, b) => a.hadithNumber - b.hadithNumber)

  const collections = await getHadithCollections()
  const col = collections.find((c) => c.key === collection)

  return {
    hadiths: items,
    total: col?.totalHadiths || 7500,
  }
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

