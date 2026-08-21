import { NextResponse } from 'next/server'
import { getHadithCollections, getHadithList } from '@/lib/hadith'
import { augmentAllWithBangla } from '@/lib/hadith-bn'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: Promise<{ collection: string }> },
) {
  const { collection } = await context.params
  const url = new URL(request.url)
  
  const startParam = url.searchParams.get('start')
  const endParam = url.searchParams.get('end')
  const pageParam = url.searchParams.get('page')
  const limitParam = url.searchParams.get('limit')

  let start = 1
  let limit = 10

  if (startParam && endParam) {
    const s = parseInt(startParam, 10)
    const e = parseInt(endParam, 10)
    if (!isNaN(s) && !isNaN(e) && e >= s) {
      start = Math.max(1, s)
      limit = Math.min(e - s + 1, 30)
    }
  } else if (pageParam) {
    const page = Math.max(1, parseInt(pageParam, 10) || 1)
    limit = Math.min(Math.max(1, parseInt(limitParam || '10', 10)), 30)
    start = (page - 1) * limit + 1
  } else if (startParam) {
    start = Math.max(1, parseInt(startParam, 10) || 1)
    limit = Math.min(Math.max(1, parseInt(limitParam || '10', 10)), 30)
  }

  try {
    const collections = await getHadithCollections()
    const match = collections.find((c) => c.key.toLowerCase() === collection.toLowerCase())
    if (!match) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 })
    }

    const { hadiths, total } = await getHadithList(match.key, start, limit)
    const translatedHadiths = await augmentAllWithBangla(hadiths, 4)

    return NextResponse.json({
      collection: match,
      hadiths: translatedHadiths,
      start,
      limit,
      total,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
