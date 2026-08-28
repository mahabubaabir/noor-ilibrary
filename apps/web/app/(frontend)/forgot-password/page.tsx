"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, MailCheck, KeyRound, Mail, Clock, ShieldCheck, RefreshCw } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cooldown > 0) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || "পাসওয়ার্ড পুনরুদ্ধারে সমস্যা হয়েছে। আবার চেষ্টা করুন।")
      } else {
        setSubmitted(true)
        setCooldown(60) // 60s cooldown for security & spam prevention
      }
    } catch {
      setError("সার্ভারে সংযোগ করা সম্ভব হয়নি। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/90">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-600/20">
            {submitted ? <MailCheck className="h-7 w-7" /> : <KeyRound className="h-7 w-7" />}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {submitted ? "ইমেইল চেক করুন" : "পাসওয়ার্ড পুনরুদ্ধার"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {submitted
              ? "Password reset link sent to your inbox"
              : "Recover your Noor Islamic Library account"}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200/80 bg-red-50/90 p-4 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="space-y-5 text-center">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-5 text-left dark:border-emerald-800/50 dark:bg-emerald-950/30">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
                  <p className="font-semibold text-sm mb-1">
                    রিসেট লিংক পাঠানো হয়েছে!
                  </p>
                  <p className="mb-2">
                    <span className="font-medium text-emerald-950 dark:text-emerald-100 underline underline-offset-2">{email}</span> ঠিকানায় একটি গোপন রিসেট লিংক পাঠানো হয়েছে।
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-emerald-800 dark:text-emerald-300">
                    <li>ইনবক্স ও <strong>স্প্যাম (Spam/Junk)</strong> ফোল্ডার চেক করুন।</li>
                    <li>লিংকটি পরবর্তী <strong>১ ঘণ্টার</strong> জন্য কার্যকর থাকবে।</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={cooldown > 0 || loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 py-3 text-xs font-bold text-stone-700 transition-all hover:bg-stone-100 disabled:opacity-50 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                {cooldown > 0 ? `পুনরায় পাঠাতে অপেক্ষা করুন (${cooldown}s)` : "ইমেইল পুনরায় পাঠান (Resend Email)"}
              </button>

              <button
                type="button"
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="text-xs font-medium text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 underline"
              >
                ভিন্ন ইমেইল দিয়ে চেষ্টা করুন
              </button>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> লগইন পেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>আপনার নিবন্ধিত ইমেইল</span>
                <span className="text-[11px] text-stone-400">Account Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@domain.com"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 pl-11 text-sm text-stone-900 placeholder:text-stone-400 transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-100 dark:focus:border-emerald-400 dark:focus:bg-stone-800"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> রিসেট লিংক তৈরি হচ্ছে...
                </span>
              ) : (
                "রিসেট লিংক পাঠান (Send Reset Link)"
              )}
            </button>

            <div className="pt-3 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 transition-colors hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> লগইন স্ক্রিনে ফিরে যান
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
