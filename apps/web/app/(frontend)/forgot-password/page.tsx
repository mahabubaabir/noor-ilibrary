"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, MailCheck, KeyRound, Mail, ShieldCheck, RefreshCw } from "lucide-react"

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
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
            {submitted ? <MailCheck className="h-6 w-6" /> : <KeyRound className="h-6 w-6" />}
          </div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {submitted ? "ইমেইল চেক করুন" : "পাসওয়ার্ড পুনরুদ্ধার"}
          </h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {submitted
              ? "Password reset link sent to your inbox"
              : "Recover your Noor Islamic Library account"}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-left dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-black dark:text-white mt-0.5" />
                <div className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
                  <p className="font-bold mb-1">
                    রিসেট লিংক পাঠানো হয়েছে!
                  </p>
                  <p className="mb-2 text-neutral-600 dark:text-neutral-400">
                    <span className="font-mono text-black dark:text-white">{email}</span> ঠিকানায় একটি গোপন রিসেট লিংক পাঠানো হয়েছে।
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-500">
                    <li>ইনবক্স ও স্প্যাম ফোল্ডার চেক করুন।</li>
                    <li>লিংকটি ১ ঘণ্টার জন্য কার্যকর থাকবে।</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={cooldown > 0 || loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 text-xs font-semibold text-neutral-800 transition-all hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                {cooldown > 0 ? `পুনরায় পাঠাতে অপেক্ষা করুন (${cooldown}s)` : "ইমেইল পুনরায় পাঠান"}
              </button>

              <button
                type="button"
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="text-xs font-medium text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white underline"
              >
                ভিন্ন ইমেইল দিয়ে চেষ্টা করুন
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline dark:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> লগইন পেজে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                আপনার নিবন্ধিত ইমেইল
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 pl-10 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full rounded-xl bg-black py-3 text-xs font-bold text-white shadow transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> রিসেট লিংক তৈরি হচ্ছে...
                </span>
              ) : (
                "রিসেট লিংক পাঠান (Send Reset Link)"
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
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
