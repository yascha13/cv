import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'advisor@wealthsignal.demo' },
    update: { name: 'Demo Advisor' },
    create: { email: 'advisor@wealthsignal.demo', name: 'Demo Advisor', consentNotes: 'Demo consent captured.' }
  });

  const organizations = [
    {
      name: 'Summit Industrial Components LLC',
      naics: '332710',
      industry: 'Manufacturing',
      revenueBand: '$25M-$50M',
      employeeBand: '100-249',
      founderLed: true,
      privateCompany: true,
      registrationDate: new Date('1998-05-14'),
      location: { create: { state: 'TX', metro: 'Dallas-Fort Worth', city: 'Dallas' } }
    },
    {
      name: 'Harborview Diagnostic Labs',
      naics: '621511',
      industry: 'Healthcare',
      revenueBand: '$10M-$25M',
      employeeBand: '50-99',
      founderLed: false,
      privateCompany: true,
      registrationDate: new Date('2007-11-23'),
      location: { create: { state: 'CA', metro: 'San Diego', city: 'San Diego' } }
    }
  ];

  for (const org of organizations) {
    await prisma.organization.create({ data: org });
  }

  await prisma.savedSearch.create({
    data: {
      userId: demoUser.id,
      name: 'TX manufacturing succession',
      filtersJson: { state: 'TX', industry: 'Manufacturing', minScore: 60 },
      emailAlerts: true
    }
  });
}

main().finally(async () => prisma.$disconnect());
