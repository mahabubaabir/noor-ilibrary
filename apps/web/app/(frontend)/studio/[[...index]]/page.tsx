"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../../sanity.config"

export default function StudioPage() {
  return (
    <div className="relative w-full overflow-hidden rounded-t-3xl border-t border-stone-200/50 dark:border-stone-800/50" style={{ height: "calc(100vh - 64px)" }}>
      <NextStudio config={config} />
    </div>
  )
}
