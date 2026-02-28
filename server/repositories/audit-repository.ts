import { prisma } from '@/lib/db';

export async function createAuditLog(input: { action: string; entityType: string; entityId: string; metadata?: Record<string, unknown> }) {
  return prisma.auditLog.create({ data: input });
}
