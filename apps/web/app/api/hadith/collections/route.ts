import { NextResponse } from 'next/server'
import { getHadithCollections } from '@/lib/hadith'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const collections = await getHadithCollections()
    return NextResponse.json({ collections })
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 502 })
  }
}
