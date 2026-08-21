import { NextResponse } from 'next/server'
import { createPasswordResetToken, validateEmail } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { email?: string } | null
    const email = body?.email?.trim().toLowerCase() ?? ''

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Return success without leaking whether email exists
      return NextResponse.json({
        ok: true,
        message: 'If an account with this email exists, a password reset link has been created.',
      })
    }

    const { token } = await createPasswordResetToken(user.id)
    
    // In production, an email service (Resend, SendGrid, etc.) would send the link.
    // For complete transparency and instant recovery, we return the resetUrl and token.
    const resetUrl = `/reset-password?token=${token}`

    return NextResponse.json({
      ok: true,
      message: 'Password reset link generated successfully.',
      resetUrl,
      token,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
