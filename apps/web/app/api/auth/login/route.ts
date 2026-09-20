import { NextResponse } from 'next/server'
import { createSession, hashPassword, sessionCookie, validateEmail, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'

const MAX_PASSWORD_LENGTH = 128

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null
  const email = body?.email?.trim().toLowerCase() ?? ''
  const password = body?.password ?? ''

  if (!validateEmail(email) || !password || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Equalize timing: burn an equivalent scrypt operation for unknown emails.
      await hashPassword(password).catch(() => undefined)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    if (!(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const session = await createSession(user.id)
    const cookie = sessionCookie(session.token, session.expiresAt)
    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })
    response.cookies.set(cookie.name, cookie.value, cookie.options)
    return response
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 })
  }
}
