import { NextResponse } from 'next/server'
import { resetPasswordWithToken, validatePassword } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      token?: string
      password?: string
    } | null

    const token = body?.token?.trim() ?? ''
    const password = body?.password ?? ''

    if (!token) {
      return NextResponse.json({ error: 'Reset token is required' }, { status: 400 })
    }

    if (!validatePassword(password)) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    const result = await resetPasswordWithToken(token, password)
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Password reset failed' }, { status: 400 })
    }

    return NextResponse.json({
      ok: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
