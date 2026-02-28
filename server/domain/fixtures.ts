import { OrganizationRecord, SignalRecord, SignalType } from './types';

const states = [
  { state: 'TX', metro: 'Dallas-Fort Worth' },
  { state: 'CA', metro: 'San Diego' },
  { state: 'IL', metro: 'Chicago' },
  { state: 'NY', metro: 'New York' },
  { state: 'FL', metro: 'Miami' },
  { state: 'WA', metro: 'Seattle' }
];

const industries = [
  { industry: 'Manufacturing', naics: '332710' },
  { industry: 'Healthcare', naics: '621511' },
  { industry: 'Nonprofit', naics: '813219' },
  { industry: 'Technology', naics: '541512' },
  { industry: 'Construction', naics: '236220' }
];

const signalTypes: SignalType[] = [
  'SEC_FORM_D',
  'IRS_990_POSTED',
  'BUSINESS_REGISTRY_UPDATE',
  'OWNERSHIP_CHANGE',
  'EXECUTIVE_TRANSITION',
  'SUCCESSION_INDICATOR'
];

function signalSource(type: SignalType): string {
  switch (type) {
    case 'SEC_FORM_D':
      return 'SEC EDGAR';
    case 'IRS_990_POSTED':
      return 'IRS 990';
    case 'BUSINESS_REGISTRY_UPDATE':
      return 'Business Registry';
    case 'OWNERSHIP_CHANGE':
      return 'State Filing Feed';
    case 'EXECUTIVE_TRANSITION':
      return 'Registration Update';
    case 'SUCCESSION_INDICATOR':
      return 'WealthSignal Heuristic';
  }
}

export const demoOrganizations: OrganizationRecord[] = Array.from({ length: 30 }, (_, i) => {
  const idx = i + 1;
  const loc = states[i % states.length];
  const sector = industries[i % industries.length];

  return {
    id: `org-${idx}`,
    name: `WealthSignal Demo Organization ${idx}`,
    industry: sector.industry,
    naics: sector.naics,
    state: loc.state,
    metro: loc.metro,
    revenueBand: idx % 3 === 0 ? '$25M-$50M' : '$10M-$25M',
    employeeBand: idx % 2 === 0 ? '50-99' : '100-249',
    registrationYear: 1988 + (idx % 30),
    founderLed: idx % 2 === 1,
    privateCompany: idx % 4 !== 0
  };
});

export const demoSignals: SignalRecord[] = demoOrganizations.flatMap((organization, orgIndex) => {
  const count = 2 + (orgIndex % 7); // 2-8 signals

  return Array.from({ length: count }, (_, signalIndex) => {
    const type = signalTypes[(orgIndex + signalIndex) % signalTypes.length];
    const day = 1 + ((orgIndex * 3 + signalIndex) % 27);

    return {
      id: `sig-${organization.id}-${signalIndex + 1}`,
      organizationId: organization.id,
      type,
      source: signalSource(type),
      eventDate: `2026-01-${String(day).padStart(2, '0')}`,
      confidenceScore: Number((0.55 + ((orgIndex + signalIndex) % 5) * 0.1).toFixed(2)),
      payload: {
        summary: `${type} detected for ${organization.name}`,
        sourceRecordId: `${organization.id}-${signalIndex + 1}`
      }
    };
  });
});
