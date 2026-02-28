import Link from 'next/link';
import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Advisor Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Monitor opportunity flow, saved filters, and compliance activity.</p>
        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <Card><p className="text-xs text-slate-500">Tracked organizations</p><p className="text-2xl font-bold">128</p></Card>
          <Card><p className="text-xs text-slate-500">New verified signals (7d)</p><p className="text-2xl font-bold">24</p></Card>
          <Card><p className="text-xs text-slate-500">Saved searches</p><p className="text-2xl font-bold">9</p></Card>
          <Card><p className="text-xs text-slate-500">Compliance events</p><p className="text-2xl font-bold">4</p></Card>
        </section>
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-semibold">Saved searches</h2>
            <ul className="mt-2 list-disc pl-6 text-sm text-slate-700">
              <li>TX manufacturing succession likelihood &gt; 65</li>
              <li>CA healthcare with SEC Form D in last 30 days</li>
            </ul>
            <Link href="/saved-searches" className="mt-3 inline-block text-sm text-brand">Manage saved searches →</Link>
          </Card>
          <Card>
            <h2 className="font-semibold">Recent signals</h2>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <li>SEC Form D filed: Summit Industrial Components (confidence 0.93)</li>
              <li>IRS 990 posted: Prairie Community Foundation (confidence 0.95)</li>
            </ul>
            <Link href="/alerts" className="mt-3 inline-block text-sm text-brand">Open alerts inbox →</Link>
          </Card>
        </section>
      </main>
    </div>
  );
}
