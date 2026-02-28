import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getLeadDetail } from '@/server/domain/lead-explorer-service';

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const { organization, organizationSignals, score } = await getLeadDetail(params.id);

  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{organization.name}</h1>
            <p className="text-sm text-slate-600">{organization.industry} • NAICS {organization.naics} • {organization.state} / {organization.metro}</p>
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
              {organizationSignals.map((signal) => (
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
            <p className="mt-3 text-xs text-slate-500">Placeholder: advisor-specific weighting controls and explainability UI planned.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
