import { NextResponse } from 'next/server'
import { createSession, sessionCookie, validateEmail, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null
  const email = body?.email?.trim().toLowerCase() ?? ''
  const password = body?.password ?? ''

  if (!validateEmail(email) || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const session = await createSession(user.id)
  const cookie = sessionCookie(session.token, session.expiresAt)
  const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
