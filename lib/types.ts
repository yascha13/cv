export type SignalType =
  | 'SEC_FORM_D'
  | 'IRS_990_POSTED'
  | 'BUSINESS_REGISTRY_UPDATE'
  | 'OWNERSHIP_CHANGE'
  | 'EXECUTIVE_TRANSITION'
  | 'SUCCESSION_INDICATOR';

export type OrganizationRecord = {
  id: string;
  name: string;
  industry: string;
  naics: string;
  state: string;
  metro: string;
  revenueBand?: string;
  employeeBand?: string;
  registrationYear?: number;
  founderLed?: boolean;
  privateCompany?: boolean;
  isDeleted?: boolean;
};

export type SignalRecord = {
  id: string;
  organizationId: string;
  type: SignalType;
  source: string;
  eventDate: string;
  confidenceScore: number;
  payload: Record<string, unknown>;
};
