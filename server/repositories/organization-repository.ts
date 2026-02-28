import { prisma } from '@/lib/db';
import { demoOrganizations, demoSignals } from '@/server/domain/fixtures';
import { OrganizationRecord, SignalRecord } from '@/server/domain/types';

const isDemo = process.env.DEMO_MODE === 'true' || !process.env.DATABASE_URL;

export async function listOrganizationsWithSignals() {
  if (isDemo) {
    return { organizations: demoOrganizations, signals: demoSignals };
  }

  const organizations = await prisma.organization.findMany({
    where: { deletedAt: null },
    include: { location: true, signals: true }
  });

  const normalizedOrganizations: OrganizationRecord[] = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    industry: org.industry ?? 'Unknown',
    naics: org.naics ?? 'N/A',
    state: org.location?.state ?? 'N/A',
    metro: org.location?.metro ?? 'N/A',
    revenueBand: org.revenueBand ?? undefined,
    employeeBand: org.employeeBand ?? undefined,
    registrationYear: org.registrationDate?.getUTCFullYear(),
    founderLed: org.founderLed ?? undefined,
    privateCompany: org.privateCompany ?? undefined
  }));

  const normalizedSignals: SignalRecord[] = organizations.flatMap((org) =>
    org.signals.map((signal) => ({
      id: signal.id,
      organizationId: signal.organizationId,
      type: signal.type as SignalRecord['type'],
      source: signal.source,
      eventDate: signal.eventDate.toISOString(),
      confidenceScore: signal.confidenceScore,
      payload: signal.payloadJson as Record<string, unknown>
    }))
  );

  return { organizations: normalizedOrganizations, signals: normalizedSignals };
}
