interface SendPasswordResetParams {
  to: string
  name?: string | null
  token: string
}

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export function generatePasswordResetEmailHtml({
  name,
  resetUrl,
}: {
  name?: string | null
  resetUrl: string
}): string {
  const displayName = name?.trim() || 'সম্মানিত সদস্য'

  return `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>পাসওয়ার্ড রিসেট - Noor Islamic Library</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="580" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 20px; font-weight: bold; letter-spacing: 1px; margin-bottom: 6px; font-family: 'Amiri', 'Traditional Arabic', serif;">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                Noor Islamic Library
              </h1>
              <p style="margin: 4px 0 0; font-size: 13px; color: #a7f3d0; font-weight: 500;">
                নূর ইসলামিক নলেজ লাইব্রেরি
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <p style="margin-top: 0; font-size: 16px; line-height: 1.6; font-weight: 600; color: #0f172a;">
                আসসালামু আলাইকুম ${displayName},
              </p>
              
              <p style="font-size: 14px; line-height: 1.7; color: #334155;">
                আপনার <strong>Noor Islamic Library</strong> অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তনের জন্য একটি অনুরোধ পেয়েছি। নতুন পাসওয়ার্ড সেট করতে নিচের বাটনে ক্লিক করুন:
              </p>

              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 14px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.35); text-align: center;">
                      পাসওয়ার্ড রিসেট করুন (Reset Password) &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry Alert -->
              <div style="background-color: #ecfdf5; border-left: 4px solid #059669; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #065f46; font-weight: 500;">
                  ⏱️ <strong>সময়সীমা:</strong> এই নিরাপত্তা লিংকটির মেয়াদ <strong>১ ঘণ্টা</strong> পর্যন্ত থাকবে।
                </p>
              </div>

              <!-- Fallback Link -->
              <p style="font-size: 12px; line-height: 1.6; color: #64748b; margin-bottom: 6px;">
                যদি উপরের বাটনটি কাজ না করে, নিচের লিংকটি কপি করে আপনার ব্রাউজারে পেস্ট করুন:
              </p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; word-break: break-all; font-size: 11px; color: #0284c7; font-family: monospace;">
                ${resetUrl}
              </div>

              <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 20px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">
                  🔒 <strong>নিরাপত্তা নোটিশ:</strong> আপনি যদি এই অনুরোধ না করে থাকেন, তবে এই ইমেইলটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট সুরক্ষিত থাকবে।
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
              <p style="margin: 0 0 4px; font-weight: 600; color: #64748b;">
                Noor Islamic Knowledge Library
              </p>
              <p style="margin: 0;">
                কুরআন, হাদিস, সাহাবীদের জীবনী ও ইসলামিক সাহিত্যের সমন্বিত ডিজিটাল প্ল্যাটফর্ম
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export async function sendPasswordResetEmail({
  to,
  name,
  token,
}: SendPasswordResetParams): Promise<{ success: boolean; error?: string; devMode?: boolean }> {
  const baseUrl = getBaseUrl()
  const resetUrl = `${baseUrl}/reset-password?token=${token}`
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM || 'Noor Library <onboarding@resend.dev>'

  // If Resend API Key is available, dispatch live email
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject: 'Noor Library — পাসওয়ার্ড রিসেট লিংক / Password Reset Request',
          html: generatePasswordResetEmailHtml({ name, resetUrl }),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error('[EMAIL ERROR] Resend API error:', data)
        return { success: false, error: data?.message || 'Failed to send email via Resend' }
      }

      console.log(`[EMAIL SUCCESS] Password reset email sent to ${to} (ID: ${data?.id})`)
      return { success: true }
    } catch (err) {
      console.error('[EMAIL EXCEPTION]', err)
      return { success: false, error: err instanceof Error ? err.message : 'Network error sending email' }
    }
  }

  // Development/Local Fallback: Log reset link to server console safely
  console.log(`\n======================================================`)
  console.log(`[DEV AUTH] PASSWORD RESET LINK FOR: ${to}`)
  console.log(`[DEV AUTH] RESET URL: ${resetUrl}`)
  console.log(`[DEV AUTH] To send real emails, set RESEND_API_KEY in your .env`)
  console.log(`======================================================\n`)

  return { success: true, devMode: true }
}
