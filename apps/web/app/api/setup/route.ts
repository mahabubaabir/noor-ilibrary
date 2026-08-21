import { NextResponse } from 'next/server'
import { execSync } from 'child_process'
import path from 'path'

export async function POST() {
  try {
    const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma')
    execSync(`npx prisma db push --schema="${schemaPath}" --accept-data-loss`, {
      encoding: 'utf-8',
      timeout: 30000,
    })
    return NextResponse.json({ ok: true, message: 'Database schema pushed successfully' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
