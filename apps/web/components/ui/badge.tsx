import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border border-neutral-200 bg-neutral-100 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
        primary: "border border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black",
        secondary: "border border-neutral-300 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
        destructive: "border border-neutral-800 bg-neutral-900 text-neutral-100 dark:border-neutral-200 dark:bg-white dark:text-black",
        outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badgeVariants({ variant, className })} {...props} />
}

export { Badge, badgeVariants }
