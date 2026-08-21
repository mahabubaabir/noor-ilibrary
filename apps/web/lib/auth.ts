import { cookies } from 'next/headers'
import { randomBytes, timingSafeEqual, scrypt as scryptCallback } from 'crypto'
import { promisify } from 'util'
import { prisma } from '@/lib/db'

const scrypt = promisify(scryptCallback)
const SESSION_COOKIE = 'noor_session'
const SESSION_DAYS = 30
const SECURE_COOKIE = process.env.AUTH_COOKIE_SECURE === 'true'

export interface SafeUser {
  id: string
  email: string
  name: string | null
  role: string
}

function toSafeUser(user: { id: string; email: string; name: string | null; role?: string }): SafeUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role || 'user' }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derived = (await scrypt(password, salt, 64)) as Buffer
  return `${salt}:${derived.toString('hex')}`
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false
  const expected = Buffer.from(hash, 'hex')
  const actual = (await scrypt(password, salt, expected.length)) as Buffer
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}

export async function createSession(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await prisma.session.create({ data: { token, userId, expiresAt } })
  return { token, expiresAt }
}

export async function createPasswordResetToken(userId: string): Promise<{ token: string; expiresAt: Date }> {
  // Delete any existing reset tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId } }).catch(() => undefined)
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour validity
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  })
  return { token, expiresAt }
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!validatePassword(newPassword)) {
    return { success: false, error: 'Password must be at least 6 characters' }
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!record || record.expiresAt <= new Date()) {
    if (record) await prisma.passwordResetToken.delete({ where: { id: record.id } }).catch(() => undefined)
    return { success: false, error: 'Invalid or expired password reset link' }
  }

  const newHash = await hashPassword(newPassword)
  await prisma.user.update({
    where: { id: record.userId },
    data: { passwordHash: newHash },
  })

  // Delete all reset tokens and sessions for this user for security
  await prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }).catch(() => undefined)
  await prisma.session.deleteMany({ where: { userId: record.userId } }).catch(() => undefined)

  return { success: true }
}

export function sessionCookie(token: string, expiresAt: Date) {
  return {
    name: SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: SECURE_COOKIE,
      path: '/',
      expires: expiresAt,
    },
  }
}

export function expiredSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: '',
    options: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: SECURE_COOKIE,
      path: '/',
      expires: new Date(0),
    },
  }
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: { select: { id: true, email: true, name: true, role: true } } },
  })

  if (!session || session.expiresAt <= new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined)
    return null
  }

  return toSafeUser(session.user)
}

export async function deleteCurrentSession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return
  await prisma.session.deleteMany({ where: { token } })
}
