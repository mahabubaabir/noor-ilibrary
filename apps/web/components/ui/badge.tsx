import { cn } from '@/lib/utils'

export function Badge({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300',
        className,
      )}
    >
      {children}
    </span>
  )
}