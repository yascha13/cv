import Link from 'next/link';
import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Admin / Settings</h1>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-semibold">Profile + Consent</h2>
            <textarea className="mt-2 w-full rounded border p-2" rows={4} defaultValue="Advisor attests to compliant use and retention controls." />
          </Card>
          <Card>
            <h2 className="font-semibold">Data source toggles</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li><input type="checkbox" defaultChecked /> SEC EDGAR Connector</li>
              <li><input type="checkbox" defaultChecked /> IRS 990 Connector</li>
              <li><input type="checkbox" defaultChecked /> Business Registry Connector</li>
              <li><input type="checkbox" /> Vendor Enrichment Connector</li>
            </ul>
          </Card>
          <Card>
            <h2 className="font-semibold">API Keys</h2>
            <input className="mt-2 w-full rounded border p-2" placeholder="Vendor API Key" />
          </Card>
          <Card>
            <h2 className="font-semibold">Audit log preview</h2>
            <ul className="mt-2 text-sm text-slate-700">
              <li>2026-02-20 • USER_LOGIN • User demo-user</li>
              <li>2026-02-20 • VIEW_ORGANIZATION • org-1</li>
              <li>2026-02-20 • CREATE_TASK • org-1</li>
            </ul>
          </Card>
        </div>
        <p className="mt-4 text-sm text-slate-600">Need legal guidance? Review the <Link className="text-brand" href="/compliance">compliance & data source policy</Link>.</p>
      </main>
    </div>
  );
}
