import { NextResponse } from 'next/server'
import {
  createSession,
  hashPassword,
  sessionCookie,
  validateEmail,
  validatePassword,
} from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string; name?: string }
    | null
  const email = body?.email?.trim().toLowerCase() ?? ''
  const password = body?.password ?? ''
  const name = body?.name?.trim() || null

  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (!validatePassword(password)) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'An account already exists for this email' }, { status: 409 })
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: await hashPassword(password),
      preference: { create: {} },
    },
    select: { id: true, email: true, name: true, role: true },
  })

  // Dispatch Welcome Email to the user
  try {
    await sendWelcomeEmail({ to: user.email, name: user.name })
  } catch (emailErr) {
    console.error('[AUTH REGISTER] Welcome email dispatch failed:', emailErr)
  }

  const session = await createSession(user.id)
  const cookie = sessionCookie(session.token, session.expiresAt)
  const response = NextResponse.json({ user })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
