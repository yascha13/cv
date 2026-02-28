# WealthSignal MVP

WealthSignal is a compliant lead-intelligence SaaS MVP for financial advisors focused on organization-level opportunities and signals.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS + shadcn-style UI components
- Auth.js / NextAuth
- Prisma + PostgreSQL
- Zod validation
- Vitest + Playwright

## Project Structure

- `app/` routes and pages only
- `components/` UI components only
- `server/domain/` business logic
- `server/connectors/` external adapters
- `server/repositories/` Prisma data access
- `lib/` shared utilities, auth, db, validation
- `prisma/` schema, migrations, seed

## Environment Variables

Copy `.env.example` to `.env`.

- `DATABASE_URL` - PostgreSQL connection URL
- `NEXTAUTH_URL` - app URL (e.g. `http://localhost:3000`)
- `NEXTAUTH_SECRET` - Auth.js secret
- `DEMO_MODE` - `true` uses built-in fixture data and avoids external API requirements
- `VENDOR_API_KEY` - optional licensed vendor key

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Demo Mode

When `DEMO_MODE=true`:

- `/leads` and `/leads/[id]` render fixture data from `server/domain/fixtures.ts`
- `/api/leads` works without external APIs
- mock ingestion endpoint `/api/cron/ingest` uses connector fixtures

## API

### `GET /api/leads`

Supports:

- `query` (name search)
- `state`
- `industry`
- `signalType`
- `page` (default 1)
- `pageSize` (default 10)

## Seed Data

`prisma/seed.ts` creates:

- 30 organizations across multiple states and industries
- 2-8 signals per organization
- computed lead scores persisted to `LeadScore`
- demo user + saved search

## Smoke Test

```bash
npm run test:e2e
```

Playwright smoke covers `/dashboard` and `/leads` and verifies at least one lead row renders.
