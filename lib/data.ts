import { OrganizationRecord, SignalRecord } from './types';

export const demoOrganizations: OrganizationRecord[] = [
  {
    id: 'org-1',
    name: 'Summit Industrial Components LLC',
    industry: 'Manufacturing',
    naics: '332710',
    state: 'TX',
    metro: 'Dallas-Fort Worth',
    revenueBand: '$25M-$50M',
    employeeBand: '100-249',
    registrationYear: 1998,
    founderLed: true,
    privateCompany: true
  },
  {
    id: 'org-2',
    name: 'Harborview Diagnostic Labs',
    industry: 'Healthcare',
    naics: '621511',
    state: 'CA',
    metro: 'San Diego',
    revenueBand: '$10M-$25M',
    employeeBand: '50-99',
    registrationYear: 2007,
    founderLed: false,
    privateCompany: true
  },
  {
    id: 'org-3',
    name: 'Prairie Community Foundation',
    industry: 'Nonprofit',
    naics: '813219',
    state: 'IL',
    metro: 'Chicago',
    revenueBand: '$5M-$10M',
    employeeBand: '25-49',
    registrationYear: 1989,
    founderLed: false,
    privateCompany: false
  }
];

export const demoSignals: SignalRecord[] = [
  {
    id: 'sig-1',
    organizationId: 'org-1',
    type: 'SEC_FORM_D',
    source: 'SEC EDGAR API',
    eventDate: '2026-01-10',
    confidenceScore: 0.93,
    payload: { filingUrl: 'https://www.sec.gov/edgar/search' }
  },
  {
    id: 'sig-2',
    organizationId: 'org-1',
    type: 'SUCCESSION_INDICATOR',
    source: 'Computed heuristic',
    eventDate: '2026-01-02',
    confidenceScore: 0.82,
    payload: { yearsOperating: 28, reason: 'Founder-led + mature private company' }
  },
  {
    id: 'sig-3',
    organizationId: 'org-3',
    type: 'IRS_990_POSTED',
    source: 'IRS 990 dataset',
    eventDate: '2026-01-11',
    confidenceScore: 0.95,
    payload: { filingTaxYear: 2024 }
  }
];
