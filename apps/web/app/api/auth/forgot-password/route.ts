import { NextResponse } from 'next/server'
import { createPasswordResetToken, validateEmail } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { email?: string } | null
    const email = body?.email?.trim().toLowerCase() ?? ''

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'সঠিক ইমেইল এড্রেস প্রদান করুন (Valid email required)' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    
    if (user) {
      const { token } = await createPasswordResetToken(user.id)
      
      // Dispatch real transactional email via Resend (or secure dev logging)
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        token,
      })
    }

    // Always return safe generic success message to prevent user enumeration & account hijacking
    return NextResponse.json({
      ok: true,
      message: 'যদি এই ইমেইলে কোনো অ্যাকাউন্ট নিবন্ধিত থাকে, তবে একটি পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইনবক্স এবং স্প্যাম ফোল্ডার চেক করুন।',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
