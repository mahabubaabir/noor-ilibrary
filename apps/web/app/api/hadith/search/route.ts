import { NextResponse } from 'next/server'
import { searchHadith } from '@/lib/hadith'

export const dynamic = 'force-dynamic'

const MAX_LIMIT = 50

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 200)
  const rawCollection = (url.searchParams.get('collection') ?? '').trim()
  const limit = Number(url.searchParams.get('limit') ?? '10')

  if (q.length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 })
  }

  // UmmahAPI accepts a single collection key only. CSV lists (e.g. "bukhari,muslim")
  // silently return zero results, so anything invalid means "search all".
  const collection =
    /^[a-z]+$/.test(rawCollection) && rawCollection !== 'all' ? rawCollection : undefined
  const safeLimit =
    Number.isFinite(limit) && limit >= 1 ? Math.min(Math.floor(limit), MAX_LIMIT) : 10

  try {
    const result = await searchHadith(q, collection, safeLimit)
    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}
