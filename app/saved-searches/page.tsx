import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

export default function SavedSearchesPage() {
  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Saved Searches</h1>
        <p className="text-sm text-slate-600">Manage filters and daily digest alert preferences.</p>
        <Card className="mt-4">
          <table className="w-full">
            <thead><tr className="text-left text-xs uppercase text-slate-500"><th className="table-cell">Name</th><th className="table-cell">Filters</th><th className="table-cell">Email alerts</th></tr></thead>
            <tbody>
              <tr className="border-t"><td className="table-cell">TX manufacturing succession</td><td className="table-cell">state=TX, industry=Manufacturing, score&gt;60</td><td className="table-cell">Daily digest enabled</td></tr>
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
