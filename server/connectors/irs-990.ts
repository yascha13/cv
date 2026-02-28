import { demoOrganizations, demoSignals } from '@/server/domain/fixtures';
import { WealthSignalConnector } from './types';

export class Irs990Connector implements WealthSignalConnector {
  name = 'IRS 990';

  async fetch() {
    return {
      source: this.name,
      organizations: [demoOrganizations[2]],
      signals: demoSignals.filter((signal) => signal.type === 'IRS_990_POSTED')
    };
  }
}
