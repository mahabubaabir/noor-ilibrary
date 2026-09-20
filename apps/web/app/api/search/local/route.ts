import { NextResponse } from 'next/server'
import { PROPHETS_COLLECTION } from '@/lib/prophets-data'
import { COMPANIONS_COLLECTION } from '@/lib/companions-data'
import { HISTORY_BOOKS } from '@/lib/history-books'
import { studyThemes } from '@/lib/study/themes'

export interface LocalSearchResult {
  type: 'prophet' | 'companion' | 'book' | 'study'
  titleBn: string
  titleEn: string
  snippet: string
  href: string
}

function matches(query: string, ...values: (string | undefined)[]): boolean {
  return values.some((value) => value?.toLowerCase().includes(query))
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 120).toLowerCase()
  if (q.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 })
  }

  const results: LocalSearchResult[] = []

  for (const prophet of PROPHETS_COLLECTION) {
    if (matches(q, prophet.nameBn, prophet.nameEn, prophet.nameAr, prophet.titleBn, prophet.titleEn, prophet.summaryBn, prophet.summaryEn)) {
      results.push({
        type: 'prophet',
        titleBn: prophet.nameBn,
        titleEn: prophet.nameEn,
        snippet: prophet.summaryBn,
        href: `/prophets/${prophet.slug}`,
      })
    }
  }

  for (const companion of COMPANIONS_COLLECTION) {
    if (matches(q, companion.nameBn, companion.nameEn, companion.titleBn, companion.titleEn, companion.shortBioBn)) {
      results.push({
        type: 'companion',
        titleBn: companion.nameBn,
        titleEn: companion.nameEn,
        snippet: companion.shortBioBn,
        href: `/companions/${companion.slug}`,
      })
    }
  }

  for (const book of HISTORY_BOOKS) {
    const inText = book.chapters.some((c) =>
      matches(q, c.titleBn, c.titleEn, ...c.contentBn, ...c.contentEn),
    )
    if (inText || matches(q, book.titleBn, book.titleEn, book.authorBn, book.authorEn, book.descriptionBn, book.descriptionEn)) {
      results.push({
        type: 'book',
        titleBn: book.titleBn,
        titleEn: book.titleEn,
        snippet: book.descriptionBn,
        href: `/history/${book.slug}`,
      })
    }
  }

  for (const theme of studyThemes) {
    if (matches(q, theme.title, theme.tagline, theme.description)) {
      results.push({
        type: 'study',
        titleBn: theme.title,
        titleEn: theme.title,
        snippet: theme.tagline,
        href: `/study/${theme.id}`,
      })
    }
  }

  return NextResponse.json({ query: q, total: results.length, results: results.slice(0, 30) })
}
