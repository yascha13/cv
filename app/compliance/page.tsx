import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

export default function CompliancePage() {
  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-4xl py-6">
        <h1 className="text-3xl font-bold">Compliance & Data Sources</h1>
        <Card className="mt-4 space-y-3 text-sm text-slate-700">
          <p><strong>Allowed sources:</strong> SEC EDGAR, IRS 990 public datasets, government business registries, licensed vendor APIs.</p>
          <p><strong>Disallowed:</strong> scraping random pages for personal data, unverified rumors, and acquisition speculation without verified filings.</p>
          <p><strong>Data minimization:</strong> if public records include person names, store minimally (title-level whenever possible).</p>
          <p><strong>Retention policy:</strong> users can soft-delete organization data from workspace; audit logs retain event metadata for compliance review.</p>
          <p><strong>Robots/rate limits:</strong> connectors enforce rate limits and include robots compliance checks before fetching public pages.</p>
          <p><strong>User responsibility:</strong> advisors must follow SEC/FINRA, privacy, and client communication rules for every outreach action.</p>
        </Card>
      </main>
    </div>
  );
}
