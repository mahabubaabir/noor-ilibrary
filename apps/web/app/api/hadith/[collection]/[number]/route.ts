import { NextResponse } from 'next/server'
import { getHadithCollections, getHadith } from '@/lib/hadith'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  context: { params: Promise<{ collection: string; number: string }> },
) {
  const { collection, number } = await context.params
  const hadithNumber = Number(number)

  if (!Number.isInteger(hadithNumber) || hadithNumber < 1) {
    return NextResponse.json({ error: 'Hadith number must be a positive integer' }, { status: 400 })
  }

  try {
    const collections = await getHadithCollections()
    const match = collections.find((item) => item.key === collection)
    if (!match) {
      return NextResponse.json({ error: 'Unknown collection' }, { status: 404 })
    }

    const hadith = await getHadith(collection, hadithNumber)
    return NextResponse.json({ collection: match, hadith })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
