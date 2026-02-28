import { NextResponse } from 'next/server';
import { requestOrganizationDeletion } from '@/server/domain/organization-service';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ ok: true, mode: 'demo', message: `Soft deleted ${params.id} in demo mode.` });
  }

  await requestOrganizationDeletion(params.id);
  return NextResponse.json({ ok: true });
}
