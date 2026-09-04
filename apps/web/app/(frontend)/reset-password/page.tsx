"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("রিসেট টোকেন পাওয়া যায়নি। অনুগ্রহ করে নতুন করে আবেদন করুন।")
      return
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।")
      return
    }

    if (password !== confirmPassword) {
      setError("উভয় পাসওয়ার্ড মেলেনি। আবার পরীক্ষা করুন।")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || "পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে। টোকেনটির মেয়াদ শেষ হতে পারে।")
      } else {
        setSuccess(true)
      }
    } catch {
      setError("নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।")
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            মেয়াদোত্তীর্ণ বা অবৈধ লিংক
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            এই পাসওয়ার্ড রিসেট লিংকটি অবৈধ অথবা এর মেয়াদ শেষ হয়ে গেছে।
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-all dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          নতুন লিংক তৈরি করুন <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-black dark:text-white" />
          <h2 className="text-lg font-bold">পাসওয়ার্ড সংরক্ষিত হয়েছে!</h2>
          <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            আপনার নতুন পাসওয়ার্ড কার্যকর হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে প্রবেশ করতে পারেন।
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow hover:bg-neutral-800 transition-all dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          লগইন করুন (Sign In Now) <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
          <KeyRound className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          নতুন পাসওয়ার্ড নির্ধারণ
        </h1>
        <p className="mt-1 text-xs text-neutral-500">
          Create a secure new password for your account
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            নতুন পাসওয়ার্ড
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            পুনরায় নতুন পাসওয়ার্ড দিন
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-xs font-bold text-white shadow transition-all hover:bg-neutral-800 active:scale-95 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> সংরক্ষণ হচ্ছে...
            </span>
          ) : (
            "পাসওয়ার্ড সংরক্ষণ করুন (Save Password)"
          )}
        </button>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-8">
        <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin text-neutral-400 mx-auto" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
