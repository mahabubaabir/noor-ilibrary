import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { revalidatePath } from 'next/cache'

const REVALIDATE_PATHS = ['/', '/stories', '/prophets', '/history', '/companions', '/study']

function secretMatches(provided: string | null, required: string): boolean {
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(required)
  return a.length === b.length && timingSafeEqual(a, b)
}

/**
 * Sanity publish webhook -> revalidate CMS-backed pages.
 * Configure in Sanity: webhook secret header `x-webhook-secret`.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 403 })
  }

  const url = new URL(request.url)
  const provided = request.headers.get('x-webhook-secret') ?? url.searchParams.get('secret')
  if (!secretMatches(provided, secret)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = (await request.json().catch(() => null)) as { _type?: string } | null

  try {
    for (const path of REVALIDATE_PATHS) {
      revalidatePath(path)
    }
    // Detail routes are dynamic; tag the document type for finer revalidation later.
    if (body?._type) {
      revalidatePath(`/${body._type}`)
    }
    return NextResponse.json({ revalidated: REVALIDATE_PATHS, type: body?._type ?? null })
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
