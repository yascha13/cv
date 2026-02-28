import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { demoOrganizations, demoSignals } from '@/lib/data';
import { computeLeadScore } from '@/lib/scoring';

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const org = demoOrganizations.find((o) => o.id === params.id) ?? demoOrganizations[0];
  const signals = demoSignals.filter((s) => s.organizationId === org.id);
  const score = computeLeadScore(org, demoSignals, 'TX');

  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{org.name}</h1>
            <p className="text-sm text-slate-600">{org.industry} • NAICS {org.naics} • {org.state} / {org.metro}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Add to list</Button>
            <Button>Assign task</Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <h2 className="font-semibold">Signal timeline</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {signals.map((signal) => (
                <li key={signal.id} className="rounded border p-2">
                  <p className="font-medium">{signal.type}</p>
                  <p className="text-slate-600">Source: {signal.source}</p>
                  <p className="text-slate-600">Confidence: {signal.confidenceScore}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-semibold">LeadScore breakdown ({score.score})</h2>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {score.breakdown.map((item) => (
                <li key={item.label}>{item.label}: +{item.points}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-semibold">Notes</h2>
            <textarea className="mt-2 w-full rounded border p-2" rows={4} placeholder="Add compliant note" />
          </Card>
          <Card>
            <h2 className="font-semibold">Related entities</h2>
            <p className="mt-2 text-sm text-slate-600">Registry parent/affiliate relationships appear here.</p>
            <Button className="mt-3" variant="outline">Delete organization data from my workspace</Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
