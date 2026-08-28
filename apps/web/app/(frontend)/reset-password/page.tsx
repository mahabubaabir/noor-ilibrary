"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { KeyRound, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight, AlertTriangle, ShieldCheck } from "lucide-react"

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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            মেয়াদোত্তীর্ণ বা অবৈধ লিংক
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            এই পাসওয়ার্ড রিসেট লিংকটি অবৈধ অথবা এর মেয়াদ শেষ হয়ে গেছে।
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
        >
          নতুন লিংক তৈরি করুন <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center space-y-5">
        <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-6 text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold">পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে!</h2>
          <p className="mt-1.5 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300">
            আপনার নতুন পাসওয়ার্ড কার্যকর হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে অ্যাকাউন্টে প্রবেশ করতে পারেন।
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-700 hover:to-teal-700 transition-all"
        >
          লগইন করুন (Sign In Now) <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
          নতুন পাসওয়ার্ড (New Password)
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="কমপক্ষে ৬ অক্ষর"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 pr-10 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-stone-400">
          সর্বনিম্ন ৬ অক্ষর দীর্ঘ হতে হবে
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-stone-700 dark:text-stone-300">
          পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="পুনরায় পাসওয়ার্ড লিখুন"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading || password.length < 6}
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> পাসওয়ার্ড সংরক্ষণ হচ্ছে...
          </span>
        ) : (
          "পাসওয়ার্ড সংরক্ষণ করুন (Save New Password)"
        )}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/90">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-600/20">
            <KeyRound className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            নতুন পাসওয়ার্ড সেট করুন
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Set and confirm your new secure password
          </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center gap-2 py-8 text-xs font-semibold text-stone-400">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> টোকেন যাচাই হচ্ছে...
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
