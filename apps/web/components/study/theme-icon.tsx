import type { StudyThemeIcon } from '@noor/types'
import { EyeIcon, HeartIcon, SparklesIcon, StarIcon } from '@/components/icons'

const ICONS: Record<StudyThemeIcon, (props: { className?: string }) => React.ReactNode> = {
  star: StarIcon,
  sparkles: SparklesIcon,
  eye: EyeIcon,
  heart: HeartIcon,
}

export function ThemeIcon({ icon, className }: { icon: StudyThemeIcon; className?: string }) {
  const Icon = ICONS[icon]
  return <Icon className={className} />
}