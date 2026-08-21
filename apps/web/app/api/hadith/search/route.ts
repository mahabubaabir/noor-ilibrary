import { NextResponse } from 'next/server'
import { searchHadith } from '@/lib/hadith'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? ''
  const collection = url.searchParams.get('collection') ?? undefined
  const limit = Number(url.searchParams.get('limit') ?? '10')

  if (q.trim().length < 2) {
    return NextResponse.json({ error: 'Query must be at least 2 characters' }, { status: 400 })
  }

  try {
    const result = await searchHadith(q, collection, Number.isFinite(limit) ? limit : 10)
    return NextResponse.json({ result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
