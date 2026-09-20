import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const number = Number(id)
  if (!Number.isInteger(number) || number < 1 || number > 114) {
    return NextResponse.json({ error: 'Surah number must be 1-114' }, { status: 400 })
  }
  try {
    const surah = await content.surah(number)
    if (!surah) {
      return NextResponse.json({ error: 'Surah not found' }, { status: 404 })
    }
    return NextResponse.json({ surah })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}