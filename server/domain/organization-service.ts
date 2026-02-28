import { z } from 'zod';
import { createAuditLog } from '@/server/repositories/audit-repository';
import { softDeleteOrganization } from '@/server/repositories/organization-admin-repository';

const orgIdSchema = z.string().min(3);

export async function requestOrganizationDeletion(orgId: string) {
  const id = orgIdSchema.parse(orgId);
  await softDeleteOrganization(id);
  await createAuditLog({
    action: 'SOFT_DELETE_ORG',
    entityType: 'Organization',
    entityId: id,
    metadata: { reason: 'User requested data deletion from workspace' }
  });
}
