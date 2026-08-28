"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { NextStudio } from "next-sanity/studio"
import { ShieldAlert, Lock, ArrowLeft, Loader2, LogIn } from "lucide-react"
import config from "../../../sanity.config"

interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
}

export default function StudioPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data?.user || null)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 text-white">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500 mb-4" />
        <p className="text-sm font-semibold text-stone-300">
          অ্যাডমিন অনুমতি যাচাই করা হচ্ছে... (Verifying Admin Authorization...)
        </p>
      </div>
    )
  }

  // Not logged in or not an admin
  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 p-6 text-center text-white">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-2xl shadow-amber-950/50 backdrop-blur-xl">
          <Lock className="h-10 w-10" />
        </div>

        <span className="inline-block rounded-full border border-amber-500/30 bg-amber-950/60 px-4 py-1 text-xs font-black text-amber-300 backdrop-blur-md">
          RESTRICTED ADMIN AREA • সংরক্ষিত অ্যাডমিন এলাকা
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-stone-100">
          Sanity Content Studio শুধুমাত্র অ্যাডমিনদের জন্য
        </h1>

        <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-stone-400">
          সাধারণ পাঠকদের জন্য এই প্যানেলটি উন্মুক্ত নয়। আপনি যদি সাইটের অ্যাডমিনিস্ট্রেটর হন, তবে অনুগ্রহ করে আপনার অ্যাডমিন অ্যাকাউন্টে সাইন ইন করুন।
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/login?redirect=/studio"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-xs font-black text-white shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95"
          >
            <LogIn className="h-4 w-4" />
            <span>অ্যাডমিন একাউন্টে সাইন ইন করুন</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-stone-700 bg-stone-900/80 px-6 py-3 text-xs font-bold text-stone-300 transition-all hover:bg-stone-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>মূল ওয়েবসাইটে ফিরে যান</span>
          </Link>
        </div>
      </div>
    )
  }

  // Admin Verified: Render full Sanity Studio
  return <NextStudio config={config} />
}
