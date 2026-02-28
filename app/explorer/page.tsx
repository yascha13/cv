import Link from 'next/link';
import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';
import { demoOrganizations, demoSignals } from '@/lib/data';
import { computeLeadScore } from '@/lib/scoring';

export default function ExplorerPage() {
  const rows = demoOrganizations.map((org) => ({
    ...org,
    score: computeLeadScore(org, demoSignals, 'TX')
  }));

  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Lead Explorer</h1>
        <p className="mt-2 rounded border border-amber-200 bg-amber-50 p-2 text-sm text-amber-800">
          Compliance warning: results are organization-level intelligence from allowed sources. No unlicensed personal
          profiling.
        </p>

        <Card className="mt-4">
          <h2 className="font-semibold">Filters</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <input className="rounded border p-2" placeholder="Organization name" />
            <select className="rounded border p-2"><option>State</option><option>TX</option><option>CA</option></select>
            <select className="rounded border p-2"><option>Industry</option><option>Manufacturing</option></select>
            <select className="rounded border p-2"><option>Score range</option><option>60+</option></select>
          </div>
        </Card>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card>
            <h2 className="mb-2 font-semibold">Results table</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="table-cell">Organization</th>
                  <th className="table-cell">State/Metro</th>
                  <th className="table-cell">Industry</th>
                  <th className="table-cell">LeadScore</th>
                  <th className="table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr className="border-b" key={row.id}>
                    <td className="table-cell">{row.name}</td>
                    <td className="table-cell">{row.state} • {row.metro}</td>
                    <td className="table-cell">{row.industry}</td>
                    <td className="table-cell font-semibold">{row.score.score}</td>
                    <td className="table-cell"><Link className="text-brand" href={`/leads/${row.id}`}>View detail</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card>
            <h2 className="font-semibold">Map view (MVP)</h2>
            <p className="mt-2 text-sm text-slate-600">Geographic heat summary by state/metro.</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>TX / Dallas-Fort Worth: 42 opportunities</li>
              <li>CA / San Diego: 23 opportunities</li>
              <li>IL / Chicago: 17 opportunities</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
