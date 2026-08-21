import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'
import type { TranslationLanguage } from '@noor/types'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ surah: string }> },
) {
  const { surah } = await context.params
  const number = Number(surah)
  if (!Number.isInteger(number) || number < 1 || number > 114) {
    return NextResponse.json({ error: 'Surah number must be 1-114' }, { status: 400 })
  }

  const url = new URL(_request.url)
  const lang = (url.searchParams.get('lang') ?? 'en') === 'bn' ? 'bn' : 'en'

  try {
    const tafsir = await content.tafsir(number, lang as TranslationLanguage)
    return NextResponse.json({ tafsir })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}