"use client"

import { ChevronDown } from "lucide-react"
import type { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  ref?: React.Ref<HTMLSelectElement>
}

function Select({ className = "", children, ref, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`flex h-10 w-full appearance-none rounded-xl border border-neutral-300 bg-white pl-3 pr-8 py-2 text-sm text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900/30 focus:border-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-white/30 dark:focus:border-white ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    </div>
  )
}

export { Select }
