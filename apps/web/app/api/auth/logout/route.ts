import { NextResponse } from 'next/server'
import { deleteCurrentSession, expiredSessionCookie } from '@/lib/auth'

export async function POST() {
  await deleteCurrentSession()
  const cookie = expiredSessionCookie()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
