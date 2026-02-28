import { prisma } from '@/lib/db';

export async function softDeleteOrganization(id: string) {
  return prisma.organization.update({ where: { id }, data: { deletedAt: new Date() } });
}
