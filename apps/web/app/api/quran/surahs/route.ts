import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const surahs = await content.surahs()
    return NextResponse.json({ surahs })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}