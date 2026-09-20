import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const reciters = await content.audioEditions()
    return NextResponse.json({ reciters })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}