# WealthSignal (MVP)

WealthSignal is a compliant lead intelligence SaaS MVP for financial advisors.

## What it includes

- Next.js App Router + TypeScript + Tailwind UI
- shadcn-style reusable UI components (`components/ui`)
- Auth scaffolding with Auth.js credentials provider
- Prisma schema for users, organizations, signals, saved searches, lists, notes, tasks, tags, and audit logs
- Explorer + lead detail + dashboard + alerts + settings + compliance pages
- Pluggable ingestion connectors (SEC EDGAR, IRS 990, business registry, vendor enrichment mock)
- LeadScore computation with transparent score breakdown
- Soft delete endpoint for organization data removal from workspace
- Unit tests (Vitest) and Playwright smoke tests

## Compliance posture

- Data source policy is documented at `/compliance`.
- Uses only approved source categories: public structured datasets and licensed APIs.
- Avoids scraping random personal pages.
- Public-record person data is minimized and treated with retention controls.
- Connectors include robots/rate-limit guardrails (API-first approach).

## Quick start

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client
   ```bash
   npm run prisma:generate
   ```
4. (Optional) Migrate + seed a local Postgres DB
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```
5. Run dev server
   ```bash
   npm run dev
   ```

## Environment variables

- `DATABASE_URL`: Postgres connection string
- `NEXTAUTH_URL`: app URL
- `NEXTAUTH_SECRET`: auth secret
- `DEMO_MODE=true`: use fixture-like behavior and skip hard DB dependencies in workflows
- `VENDOR_API_KEY`: enables mock vendor enrichment connector path

## Connector configuration

Connectors live in `lib/connectors` and share a simple interface (`SignalConnector`).

- `sec-edgar.ts`: Form D metadata ingestion (mock default)
- `irs-990.ts`: IRS 990 org-level signal ingestion (mock default)
- `business-registry.ts`: registration date/jurisdiction/status (mock default)
- `vendor-enrichment.ts`: licensed enrichment pattern (mock)

Swap mocks with real adapters by updating each connector's `run()` implementation.

## Jobs

- Cron endpoint: `GET /api/cron/ingest`
- Runs all connector jobs and returns ingest summaries.

## Testing

```bash
npm test
npm run test:e2e
```

## Security / observability notes

- Input validation with Zod in filter parsing and auth credential handling.
- Add production middleware for strict auth route rate limiting (MVP currently demonstrates connector-level throttle and policy hook).
- Audit log model is included and used by data deletion endpoint.
