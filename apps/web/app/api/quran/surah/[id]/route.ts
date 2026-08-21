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
    return NextResponse.json({ surah })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}