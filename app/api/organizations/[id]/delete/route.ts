import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ ok: true, mode: 'demo', message: `Soft deleted ${params.id} in demo mode.` });
  }

  await prisma.organization.update({ where: { id: params.id }, data: { deletedAt: new Date() } });
  await prisma.auditLog.create({
    data: {
      action: 'SOFT_DELETE_ORG',
      entityType: 'Organization',
      entityId: params.id,
      metadata: { reason: 'User requested data deletion from workspace' }
    }
  });

  return NextResponse.json({ ok: true });
}
