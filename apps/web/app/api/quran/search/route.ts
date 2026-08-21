import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'
import type { TranslationLanguage } from '@noor/types'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? ''
  const lang = (url.searchParams.get('lang') ?? 'en') === 'bn' ? 'bn' : 'en'

  if (q.trim().length < 3) {
    return NextResponse.json({ error: 'Query must be at least 3 characters' }, { status: 400 })
  }

  try {
    const matches = await content.search(q, lang as TranslationLanguage)
    return NextResponse.json({ query: q, language: lang, matches })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}