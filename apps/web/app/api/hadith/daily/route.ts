import { NextResponse } from 'next/server'
import { CURATED_DAILY_HADITHS, getDailyHadith } from '@/lib/daily-hadith'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const indexParam = url.searchParams.get('index')
    const action = url.searchParams.get('action')
    
    let index: number | undefined = undefined

    if (action === 'shuffle' || action === 'random') {
      index = Math.floor(Math.random() * CURATED_DAILY_HADITHS.length)
    } else if (indexParam !== null) {
      const parsed = parseInt(indexParam, 10)
      if (!isNaN(parsed)) {
        index = (parsed + CURATED_DAILY_HADITHS.length) % CURATED_DAILY_HADITHS.length
      }
    }

    const hadith = await getDailyHadith(undefined, index)
    return NextResponse.json({
      hadith,
      currentIndex: index ?? 0,
      totalCount: CURATED_DAILY_HADITHS.length,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
