import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

export default function AlertsPage() {
  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Alerts Inbox</h1>
        <div className="mt-4 grid gap-3">
          <Card>
            <p className="font-medium">New Form D filed</p>
            <p className="text-sm text-slate-600">Summit Industrial Components • SEC EDGAR • confidence 0.93</p>
          </Card>
          <Card>
            <p className="font-medium">IRS 990 posted</p>
            <p className="text-sm text-slate-600">Prairie Community Foundation • IRS dataset • confidence 0.95</p>
          </Card>
          <Card>
            <p className="font-medium">Executive transition</p>
            <p className="text-sm text-slate-600">Verified via business registry filing update.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
