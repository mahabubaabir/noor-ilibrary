"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

interface LikeButtonProps {
  targetType: string
  targetId: string
  label?: string
  className?: string
  iconClassName?: string
  /** Controlled value (parent already knows the state). */
  liked?: boolean
  /** Notifies the parent after a successful toggle. */
  onChange?: (liked: boolean) => void
}

/**
 * Auth-gated "love" button.
 * - Anonymous visitors are redirected to sign in (and returned to this page).
 * - Signed-in users get the like persisted in Neon via /api/library/likes.
 */
export function LikeButton({
  targetType,
  targetId,
  label,
  className,
  iconClassName,
  liked: controlledLiked,
  onChange,
}: LikeButtonProps) {
  const router = useRouter()
  const isControlled = typeof controlledLiked === "boolean"
  const [internalLiked, setInternalLiked] = useState(false)
  const [signedIn, setSignedIn] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const liked = isControlled ? controlledLiked : internalLiked

  const setLiked = (value: boolean) => {
    if (!isControlled) setInternalLiked(value)
    onChange?.(value)
  }

  useEffect(() => {
    let cancelled = false

    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        const user = d?.user ?? null
        setSignedIn(Boolean(user))
        if (!user || isControlled) return
        return fetch(
          `/api/library/likes?targetType=${encodeURIComponent(targetType)}&targetId=${encodeURIComponent(targetId)}`,
        )
          .then((r) => (r.ok ? r.json() : null))
          .then((l) => {
            if (!cancelled && l) setInternalLiked(Boolean(l.liked))
          })
      })
      .catch(() => {
        if (!cancelled) setSignedIn(false)
      })

    return () => {
      cancelled = true
    }
  }, [targetType, targetId, isControlled])

  const goToLogin = () => {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search)
    router.push(`/login?redirect=${redirect}&intent=bookmark`)
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (busy) return

    if (signedIn !== true) {
      goToLogin()
      return
    }

    const next = !liked
    setLiked(next)
    setBusy(true)
    try {
      const url = `/api/library/likes?targetType=${encodeURIComponent(targetType)}&targetId=${encodeURIComponent(targetId)}`
      const r = next
        ? await fetch("/api/library/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetType, targetId }),
          })
        : await fetch(url, { method: "DELETE" })

      if (r.status === 401) {
        setLiked(!next)
        setSignedIn(false)
        goToLogin()
      } else if (!r.ok) {
        setLiked(!next)
      }
    } catch {
      setLiked(!next)
    }
    setBusy(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={label ?? (liked ? "Unlike" : "Like")}
      title={signedIn === false ? "সাইন ইন করে সংরক্ষণ করুন" : liked ? "পছন্দ সরান" : "পছন্দ করুন"}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-neutral-600 transition-all hover:border-neutral-400 hover:text-neutral-900 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
      }
    >
      <Heart
        className={`${iconClassName ?? "h-3.5 w-3.5"} ${liked ? "fill-current" : ""}`}
      />
      {label && <span>{label}</span>}
    </button>
  )
}
