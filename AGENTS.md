# Noor Islamic Library — Agent Guidelines & Repository Rules

## 1. Automatic Git Push & Vercel Deployment Rule
- **Mandatory Auto-Push:** After implementing, updating, or fixing any feature or bug requested by the user:
  1. Validate the changes with `npm.cmd run typecheck` and `npm.cmd run build` to ensure 0 errors.
  2. Stage all modifications with `git add -A`.
  3. Commit with a meaningful, professional commit message: `git commit -m "..."`.
  4. Automatically push to the remote repository: `git push origin main` to immediately trigger Vercel CI/CD automated deployment.
  5. Verify that the push succeeded cleanly.

## 2. Build & Code Quality Standard
- All TypeScript types must be strictly checked (`noEmit`).
- No dangling promises or unhandled exceptions in API routes.
- Sanity Studio must remain standalone and isolated from the main website layouts.
- Transactional emails must use Resend with safe fallback to server console logs in local development.

## 3. Database & Neon Connection Standard
- Prisma client must be reused globally via `lib/db.ts` to prevent connection exhaustion in serverless environments.
- All new database tables must have migrations/indexes in `prisma/schema.prisma` and sync handlers in `/api/setup`.
