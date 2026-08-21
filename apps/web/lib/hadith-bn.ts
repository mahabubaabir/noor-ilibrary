import { createHash } from 'node:crypto'
import type { HadithRecord } from '@noor/types'
import { withCache } from '@/lib/cache'
import { BROWSER_UA } from '@/lib/constants'

const GOOGLE_TRANSLATE = 'https://translate.googleapis.com/translate_a/single'
const TTL_BN = 60 * 60 * 24 * 30

function cacheKey(text: string): string {
  return `hadith:bn:${createHash('sha1').update(text).digest('hex')}`
}

/**
 * Translate an English hadith to Bangla via Google's public translation
 * endpoint. Unofficial but free and keyless; results are cached in the
 * content cache so each hadith is translated at most once.
 */
export async function translateToBangla(text: string): Promise<string> {
  const clean = text.trim()
  if (!clean) return ''
  return withCache(cacheKey(clean), TTL_BN, async () => {
    const body = new URLSearchParams({
      q: clean,
      client: 'gtx',
      sl: 'en',
      tl: 'bn',
      dt: 't',
    }).toString()

    const res = await fetch(GOOGLE_TRANSLATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': BROWSER_UA,
      },
      body,
    })
    if (!res.ok) throw new Error(`Google translate -> ${res.status}`)

    const data = (await res.json()) as Array<Array<Array<string | null> | null>>
    const first = data[0]
    if (!Array.isArray(first)) throw new Error('Google translate -> bad payload')

    return first
      .map((segment) => (Array.isArray(segment) ? segment[0] ?? '' : ''))
      .join('')
      .trim()
  })
}

/**
 * Attach a Bangla translation to a hadith record. Returns the same record
 * with `translationBn` set, or the original record (with null) if the
 * translation is unavailable — Bangla is always optional.
 */
export async function augmentWithBangla(record: HadithRecord): Promise<HadithRecord> {
  if (record.translationBn) return record
  try {
    const translation = await translateToBangla(record.english)
    return { ...record, translationBn: translation || null }
  } catch {
    return record
  }
}

/** Attach Bangla translations to many records with limited concurrency. */
export async function augmentAllWithBangla(
  records: HadithRecord[],
  concurrency = 3,
): Promise<HadithRecord[]> {
  const result: HadithRecord[] = new Array(records.length)
  for (let i = 0; i < records.length; i += concurrency) {
    const chunk = records.slice(i, i + concurrency)
    const translated = await Promise.all(chunk.map((record) => augmentWithBangla(record)))
    translated.forEach((record, j) => {
      result[i + j] = record
    })
  }
  return result
}