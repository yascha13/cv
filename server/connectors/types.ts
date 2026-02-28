import { OrganizationRecord, SignalRecord } from '@/server/domain/types';

export type ConnectorFetchResult = {
  source: string;
  organizations: OrganizationRecord[];
  signals: SignalRecord[];
};

export interface WealthSignalConnector {
  name: string;
  fetch(): Promise<ConnectorFetchResult>;
}
