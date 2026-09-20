import { NextResponse } from 'next/server'
import { deleteCurrentSession, expiredSessionCookie } from '@/lib/auth'

export async function POST() {
  try {
    await deleteCurrentSession()
  } catch {
    // Still clear the cookie so a dead session never lingers client-side.
  }
  const cookie = expiredSessionCookie()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
