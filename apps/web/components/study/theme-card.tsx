import Link from 'next/link'
import type { StudyTheme } from '@noor/types'
import { Badge } from '@/components/ui/badge'
import { Card, CardBody } from '@/components/ui/card'
import { countAyahRefs } from '@/lib/study/themes'
import { themeAccents } from '@/lib/study/accents'
import { ThemeIcon } from './theme-icon'

export function ThemeCard({ theme }: { theme: StudyTheme }) {
  const accent = themeAccents[theme.icon]
  const lessons = theme.lessons.length
  const passages = countAyahRefs(theme)

  return (
    <Link href={`/study/${theme.id}`} className="group">
      <Card className={`h-full transition-colors ${accent.hoverBorder}`}>
        <CardBody>
          <div className="flex items-start gap-4">
            <span
              className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${accent.chip}`}
            >
              <ThemeIcon icon={theme.icon} className="size-6" />
            </span>
            <div>
              <p className="font-arabic text-sm text-stone-400 dark:text-stone-500">
                {theme.arabicTitle}
              </p>
              <h3 className="mt-0.5 font-semibold">{theme.title}</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">{theme.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className={accent.badge}>{theme.difficulty}</Badge>
            <Badge>{theme.duration}</Badge>
            <Badge>
              {lessons} lesson{lessons === 1 ? '' : 's'}
            </Badge>
            <Badge>{passages} passages</Badge>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}