import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    return NextResponse.json({ user })
  } catch {
    // A broken session or DB hiccup must never break the header render.
    return NextResponse.json({ user: null })
  }
}
