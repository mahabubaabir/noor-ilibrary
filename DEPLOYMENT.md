# Deployment Guide

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up database (SQLite - already configured)
cd apps/web
npx prisma db push
npx prisma generate

# 3. Start dev server
cd ../..
npm run dev
```

Open `http://127.0.0.1:3000`

---

## Deploy to Vercel (Production)

### Step 1: Set Up PostgreSQL Database

Choose one of these free PostgreSQL providers:

**Option A: Vercel Postgres (Recommended)**
1. Go to https://vercel.com/dashboard
2. Create a new project
3. Go to Storage tab → Create Database → Postgres
4. Copy the `DATABASE_URL` connection string

**Option B: Neon (Free tier)**
1. Go to https://neon.tech
2. Create an account and new project
3. Copy the connection string from the dashboard

**Option C: Supabase (Free tier)**
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database → Connection string
4. Copy the URI (replace `[YOUR-PASSWORD]` with your password)

### Step 2: Update Schema for PostgreSQL

Edit `apps/web/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite" to "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 3: Push Schema to PostgreSQL

```bash
cd apps/web
npx prisma db push
npx prisma generate
```

### Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `AUTH_COOKIE_SECURE`: `true`
5. Deploy

### Step 5: Verify

1. Open your Vercel URL
2. Register an account
3. Test bookmarks and hadith saving

---

## Environment Variables

| Variable | Local | Production | Description |
|----------|-------|------------|-------------|
| `DATABASE_URL` | `file:./dev.db` | `postgresql://...` | Database connection |
| `AUTH_COOKIE_SECURE` | `false` | `true` | Secure cookies (HTTPS) |

---

## Features

### Working Locally
- ✅ Login/Register with SQLite
- ✅ Quran bookmarks (ayahs)
- ✅ Hadith bookmarks (favorites)
- ✅ Reading progress
- ✅ Bangla hadith translation (machine)
- ✅ 4 study themes with 12 lessons

### In Production
- All of the above, plus:
- ✅ Persistent data (PostgreSQL)
- ✅ Secure authentication (HTTPS cookies)
- ✅ Global CDN (Vercel edge network)

---

## Troubleshooting

### "Database URL is invalid"
- Make sure `DATABASE_URL` starts with `postgresql://` in production
- For local dev, use `file:./dev.db` for SQLite

### "Prisma Client not generated"
```bash
cd apps/web
npx prisma generate
```

### "DLL permission error"
```bash
# Kill any running node processes
taskkill /F /IM node.exe

# Then regenerate
npx prisma generate
```

### Blank page on localhost
- Use `http://127.0.0.1:3000` instead of `http://localhost:3000`
- Or double-click `start-app.bat`
