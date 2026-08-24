"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ArrowLeft, Loader2, CheckCircle2, KeyRound } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ message: string; resetUrl?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(null)

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || "পাসওয়ার্ড পুনরুদ্ধারে সমস্যা হয়েছে")
      } else {
        setSuccess({
          message: data.message,
          resetUrl: data.resetUrl,
        })
      }
    } catch {
      setError("নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            পাসওয়ার্ড পুনরুদ্ধার
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Reset or recover your account password
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {success ? (
          <div className="space-y-4 text-center">
            <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold">{success.message}</p>
            </div>

            {success.resetUrl && (
              <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-left dark:border-emerald-800 dark:bg-stone-800">
                <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mb-2">
                  সরাসরি পাসওয়ার্ড পরিবর্তন লিঙ্ক:
                </p>
                <Link
                  href={success.resetUrl}
                  className="block text-center rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                >
                  পাসওয়ার্ড রিসেট করুন (Click to Reset)
                </Link>
              </div>
            )}

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:text-stone-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> লগইন পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
                আপনার ইমেইল অ্যাড্রেস
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "রিসেট লিংক তৈরি করুন"}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> লগইনে ফিরে যান
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
