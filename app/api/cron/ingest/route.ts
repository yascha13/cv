import { runIngestionJobs } from '@/lib/jobs/ingest';
import { NextResponse } from 'next/server';

export async function GET() {
  const results = await runIngestionJobs();
  return NextResponse.json({ ok: true, results, note: 'Cron endpoint intended for scheduled execution.' });
}
