import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-[95%] max-w-6xl flex-col gap-10 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand">WealthSignal</h1>
        <div className="space-x-3">
          <Link href="/login" className="text-sm">Login</Link>
          <Link href="/signup" className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">Start free</Link>
        </div>
      </header>

      <section className="grid gap-6 rounded-xl border bg-white p-8 shadow-sm md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">Compliant lead intelligence</p>
          <h2 className="mt-2 text-4xl font-bold">Discover high-net-worth opportunities without privacy risk.</h2>
          <p className="mt-4 text-slate-600">
            WealthSignal helps advisors identify organization-level liquidity and succession indicators sourced from
            public records, licensed enrichment, and verified filings.
          </p>
          <p className="mt-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Compliance warning: Do not use this product for unlawful profiling. Avoid personal data collection beyond
            public records and licensed datasets.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            'SEC Form D and filing metadata ingestion',
            'IRS 990 organization signal extraction',
            'Audit logs, consent notes, and soft delete workflows',
            'Saved searches, alerts inbox, and task assignment'
          ].map((item) => (
            <Card key={item}>{item}</Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold">Data source transparency</h3>
          <p className="mt-2 text-sm text-slate-600">Every signal displays source, event date, and confidence score.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Workflow for advisory teams</h3>
          <p className="mt-2 text-sm text-slate-600">Use lists, tasks, and notes to move opportunities into action.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Controls and retention</h3>
          <p className="mt-2 text-sm text-slate-600">Workspace-level soft deletion + retention policy documentation.</p>
        </Card>
      </section>
    </main>
  );
}
