interface SendPasswordResetParams {
  to: string
  name?: string | null
  token: string
}

interface SendWelcomeEmailParams {
  to: string
  name?: string | null
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

/**
 * Minimalist Black & White Responsive Welcome Email Template
 */
export function generateWelcomeEmailHtml({
  name,
  libraryUrl,
}: {
  name?: string | null
  libraryUrl: string
}): string {
  const displayName = name?.trim() || 'সম্মানিত সদস্য'

  return `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>স্বাগতম - Noor Islamic Library</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #171717;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="580" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Minimalist Header -->
          <tr>
            <td style="background-color: #000000; padding: 36px 28px; text-align: center; color: #ffffff;">
              <div style="font-size: 22px; font-weight: 500; letter-spacing: 1px; margin-bottom: 12px; font-family: 'Amiri', serif;">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                NOOR ISLAMIC LIBRARY
              </h1>
              <p style="margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a3a3a3;">
                জ্ঞান ও হেদায়াতের উন্মুক্ত সংগ্রহশালা
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin-top: 0; font-size: 16px; line-height: 1.6; font-weight: 700; color: #0a0a0a;">
                আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ, ${displayName}!
              </p>
              
              <p style="font-size: 14px; line-height: 1.7; color: #404040;">
                <strong>Noor Islamic Library</strong>-তে আপনাকে আন্তরিক মোবারকবাদ। আপনার অ্যাকাউন্টটি সফলভাবে সক্রিয় করা হয়েছে। এখন থেকে আপনি নিজের কুরআন ও হাদিস পাঠের অগ্রগতি সংরক্ষণ, প্রিয় আয়াত বুকমার্ক এবং ইসলামিক রিসোর্স নির্বিঘ্নে অধ্যয়ন করতে পারবেন।
              </p>

              <!-- Features Box -->
              <div style="background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #171717;">
                  আপনার অ্যাকাউন্টের বিশেষ সুবিধাসমূহ:
                </p>
                <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #525252;">
                  <li><strong>কুরআন ট্র্যাকিং:</strong> সর্বশেষ পঠিত আয়াত ও পারা স্বয়ংক্রিয় সংরক্ষণ</li>
                  <li><strong>আয়াত ও হাদিস বুকমার্ক:</strong> ব্যক্তিগত পাঠাগার সংগ্রহ</li>
                  <li><strong>অডিও রিসিটেশন:</strong> প্রখ্যাত ক্বারীদের বিশুদ্ধ তিলাওয়াত</li>
                  <li><strong>সালাত ট্র্যাকার:</strong> দৈনিক নির্ভুল নামাজের সময়সূচী ও সালাত ট্র্যাকিং</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${libraryUrl}" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px; letter-spacing: 0.5px;">
                      লাইব্রেরি শুরু করুন (Explore Library) &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid #f0f0f0; margin-top: 32px; padding-top: 20px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #737373;">
                  যদি আপনি এই অ্যাকাউন্ট তৈরি না করে থাকেন, তবে নির্দ্বিধায় এই ইমেইলটি এড়িয়ে যান।
                </p>
              </div>
            </td>
          </tr>

          <!-- Minimalist Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea; font-size: 11px; color: #737373;">
              <p style="margin: 0 0 4px; font-weight: 700; color: #171717;">
                Noor Islamic Library • ডিজিটাল ইসলামিক লাইব্রেরি
              </p>
              <p style="margin: 0;">
                কুরআন, হাদিস, সাহাবীদের ইতিহাস ও আধুনিক ইসলামিক রিসোর্স
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

/**
 * Minimalist Black & White Password Reset Email Template
 */
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
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #171717;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="580" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e5; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          
          <!-- Brand Header -->
          <tr>
            <td style="background-color: #000000; padding: 36px 28px; text-align: center; color: #ffffff;">
              <div style="font-size: 22px; font-weight: 500; letter-spacing: 1px; margin-bottom: 12px; font-family: 'Amiri', serif;">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
                NOOR ISLAMIC LIBRARY
              </h1>
              <p style="margin: 6px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a3a3a3;">
                পাসওয়ার্ড রিসেট লিংক • PASSWORD RESET REQUEST
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin-top: 0; font-size: 16px; line-height: 1.6; font-weight: 700; color: #0a0a0a;">
                আসসালামু আলাইকুম ${displayName},
              </p>
              
              <p style="font-size: 14px; line-height: 1.7; color: #404040;">
                আপনার <strong>Noor Islamic Library</strong> অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তনের একটি অনুরোধ পাওয়া গেছে। নতুন পাসওয়ার্ড নির্ধারণ করতে নিচের বাটনে ক্লিক করুন:
              </p>

              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 32px; border-radius: 12px; letter-spacing: 0.5px;">
                      পাসওয়ার্ড রিসেট করুন (Reset Password) &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry Alert -->
              <div style="background-color: #fafafa; border-left: 3px solid #000000; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #171717; font-weight: 600;">
                  ⏱️ <strong>সময়সীমা:</strong> এই নিরাপত্তা লিংকটির মেয়াদ <strong>১ ঘণ্টা</strong> পর্যন্ত কার্যকর থাকবে।
                </p>
              </div>

              <!-- Fallback Link -->
              <p style="font-size: 12px; line-height: 1.6; color: #737373; margin-bottom: 6px;">
                যদি উপরের বাটনটি কাজ না করে, নিচের লিংকটি ব্রাউজারে পেস্ট করুন:
              </p>
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 10px 14px; word-break: break-all; font-size: 11px; color: #171717; font-family: monospace;">
                ${resetUrl}
              </div>

              <div style="border-top: 1px solid #f0f0f0; margin-top: 32px; padding-top: 20px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #737373;">
                  🔒 <strong>নিরাপত্তা নোটিশ:</strong> আপনি যদি এই অনুরোধ না করে থাকেন, তবে এই বার্তাটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট সম্পূর্ণ সুরক্ষিত থাকবে।
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #eaeaea; font-size: 11px; color: #737373;">
              <p style="margin: 0 0 4px; font-weight: 700; color: #171717;">
                Noor Islamic Library • ডিজিটাল ইসলামিক লাইব্রেরি
              </p>
              <p style="margin: 0;">
                কুরআন, হাদিস, সাহাবীদের ইতিহাস ও আধুনিক ইসলামিক রিসোর্স
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

/**
 * Dispatch Welcome Email via Resend with Dev Safe Fallback
 */
export async function sendWelcomeEmail({
  to,
  name,
}: SendWelcomeEmailParams): Promise<{ success: boolean; error?: string; devMode?: boolean }> {
  const baseUrl = getBaseUrl()
  const libraryUrl = `${baseUrl}/library`
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM || 'Noor Library <onboarding@resend.dev>'

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject: 'Noor Library — স্বাগতম! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে',
          html: generateWelcomeEmailHtml({ name, libraryUrl }),
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error('[EMAIL ERROR] Resend Welcome API error:', data)
        return { success: false, error: data?.message || 'Failed to send welcome email' }
      }

      console.log(`[EMAIL SUCCESS] Welcome email sent to ${to} (ID: ${data?.id})`)
      return { success: true }
    } catch (err) {
      console.error('[EMAIL EXCEPTION] Welcome email exception:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Network error' }
    }
  }

  // Development/Local Fallback
  console.log(`\n======================================================`)
  console.log(`[DEV AUTH] WELCOME EMAIL SENT TO: ${to}`)
  console.log(`[DEV AUTH] USER NAME: ${name || 'N/A'}`)
  console.log(`[DEV AUTH] LIBRARY URL: ${libraryUrl}`)
  console.log(`======================================================\n`)

  return { success: true, devMode: true }
}

/**
 * Dispatch Password Reset Email via Resend with Dev Safe Fallback
 */
export async function sendPasswordResetEmail({
  to,
  name,
  token,
}: SendPasswordResetParams): Promise<{ success: boolean; error?: string; devMode?: boolean }> {
  const baseUrl = getBaseUrl()
  const resetUrl = `${baseUrl}/reset-password?token=${token}`
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM || 'Noor Library <onboarding@resend.dev>'

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
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
        console.error('[EMAIL ERROR] Resend Password Reset API error:', data)
        return { success: false, error: data?.message || 'Failed to send email via Resend' }
      }

      console.log(`[EMAIL SUCCESS] Password reset email sent to ${to} (ID: ${data?.id})`)
      return { success: true }
    } catch (err) {
      console.error('[EMAIL EXCEPTION]', err)
      return { success: false, error: err instanceof Error ? err.message : 'Network error sending email' }
    }
  }

  // Development/Local Fallback
  console.log(`\n======================================================`)
  console.log(`[DEV AUTH] PASSWORD RESET LINK FOR: ${to}`)
  console.log(`[DEV AUTH] RESET URL: ${resetUrl}`)
  console.log(`[DEV AUTH] Set RESEND_API_KEY to send real transactional emails`)
  console.log(`======================================================\n`)

  return { success: true, devMode: true }
}
