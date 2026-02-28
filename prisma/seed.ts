import { PrismaClient } from '@prisma/client';
import { scoreLead } from '@/server/domain/lead-scoring';
import { OrganizationRecord, SignalRecord } from '@/server/domain/types';

const prisma = new PrismaClient();

const states = [
  { state: 'TX', metro: 'Dallas-Fort Worth', city: 'Dallas' },
  { state: 'CA', metro: 'San Diego', city: 'San Diego' },
  { state: 'IL', metro: 'Chicago', city: 'Chicago' },
  { state: 'NY', metro: 'New York', city: 'New York' },
  { state: 'FL', metro: 'Miami', city: 'Miami' },
  { state: 'WA', metro: 'Seattle', city: 'Seattle' }
];

const industries = [
  { industry: 'Manufacturing', naics: '332710' },
  { industry: 'Healthcare', naics: '621511' },
  { industry: 'Nonprofit', naics: '813219' },
  { industry: 'Technology', naics: '541512' },
  { industry: 'Construction', naics: '236220' }
];

const signalTypes: SignalRecord['type'][] = [
  'SEC_FORM_D',
  'IRS_990_POSTED',
  'BUSINESS_REGISTRY_UPDATE',
  'OWNERSHIP_CHANGE',
  'EXECUTIVE_TRANSITION',
  'SUCCESSION_INDICATOR'
];

function signalSource(type: SignalRecord['type']): string {
  if (type === 'SEC_FORM_D') return 'SEC EDGAR';
  if (type === 'IRS_990_POSTED') return 'IRS 990';
  if (type === 'BUSINESS_REGISTRY_UPDATE') return 'Business Registry';
  if (type === 'OWNERSHIP_CHANGE') return 'State Filing Feed';
  if (type === 'EXECUTIVE_TRANSITION') return 'Registration Update';
  return 'WealthSignal Heuristic';
}

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'advisor@wealthsignal.demo' },
    update: { name: 'Demo Advisor' },
    create: {
      email: 'advisor@wealthsignal.demo',
      name: 'Demo Advisor',
      consentNotes: 'Demo consent captured.'
    }
  });

  await prisma.organization.deleteMany();

  const orgRecords: OrganizationRecord[] = [];
  const signalRecords: SignalRecord[] = [];

  for (let i = 0; i < 30; i += 1) {
    const idx = i + 1;
    const loc = states[i % states.length];
    const sector = industries[i % industries.length];

    const created = await prisma.organization.create({
      data: {
        name: `WealthSignal Demo Organization ${idx}`,
        naics: sector.naics,
        industry: sector.industry,
        revenueBand: idx % 3 === 0 ? '$25M-$50M' : '$10M-$25M',
        employeeBand: idx % 2 === 0 ? '50-99' : '100-249',
        founderLed: idx % 2 === 1,
        privateCompany: idx % 4 !== 0,
        registrationDate: new Date(`${1988 + (idx % 30)}-06-15`),
        location: { create: loc }
      }
    });

    const orgRecord: OrganizationRecord = {
      id: created.id,
      name: created.name,
      naics: created.naics ?? 'N/A',
      industry: created.industry ?? 'Unknown',
      state: loc.state,
      metro: loc.metro,
      registrationYear: created.registrationDate?.getUTCFullYear(),
      revenueBand: created.revenueBand ?? undefined,
      employeeBand: created.employeeBand ?? undefined,
      founderLed: created.founderLed ?? undefined,
      privateCompany: created.privateCompany ?? undefined
    };
    orgRecords.push(orgRecord);

    const count = 2 + (i % 7);
    for (let j = 0; j < count; j += 1) {
      const type = signalTypes[(i + j) % signalTypes.length];
      const eventDate = new Date(`2026-01-${String(1 + ((i * 3 + j) % 27)).padStart(2, '0')}`);
      const confidenceScore = Number((0.55 + ((i + j) % 5) * 0.1).toFixed(2));

      const signal = await prisma.signal.create({
        data: {
          organizationId: created.id,
          type,
          source: signalSource(type),
          eventDate,
          confidenceScore,
          payloadJson: { summary: `${type} detected for ${created.name}`, sourceRecordId: `${created.id}-${j + 1}` }
        }
      });

      signalRecords.push({
        id: signal.id,
        organizationId: created.id,
        type: type as SignalRecord['type'],
        source: signal.source,
        eventDate: signal.eventDate.toISOString(),
        confidenceScore: signal.confidenceScore,
        payload: signal.payloadJson as Record<string, unknown>
      });
    }
  }

  for (const org of orgRecords) {
    const result = scoreLead(org, signalRecords, 'TX');
    await prisma.leadScore.create({
      data: {
        organizationId: org.id,
        score: result.score,
        breakdownJson: result.breakdown
      }
    });
  }

  await prisma.savedSearch.upsert({
    where: { id: 'seed-saved-search' },
    update: {
      userId: demoUser.id,
      name: 'TX manufacturing succession',
      filtersJson: { state: 'TX', industry: 'Manufacturing', signalType: 'SEC_FORM_D', minScore: 60 },
      emailAlerts: true
    },
    create: {
      id: 'seed-saved-search',
      userId: demoUser.id,
      name: 'TX manufacturing succession',
      filtersJson: { state: 'TX', industry: 'Manufacturing', signalType: 'SEC_FORM_D', minScore: 60 },
      emailAlerts: true
    }
  });
}

main().finally(async () => prisma.$disconnect());
