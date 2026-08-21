import { cn } from '@/lib/utils'
import type { SelectHTMLAttributes } from 'react'

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}