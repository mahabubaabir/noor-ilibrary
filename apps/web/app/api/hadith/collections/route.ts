import { NextResponse } from 'next/server'
import { getHadithCollections } from '@/lib/hadith'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const collections = await getHadithCollections()
    return NextResponse.json({ collections })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
