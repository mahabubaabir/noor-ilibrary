import { NextResponse } from 'next/server'
import { content } from '@/lib/providers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const ayah = await content.randomAyah()
    if (!ayah) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
    }
    return NextResponse.json({ ayah })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}
