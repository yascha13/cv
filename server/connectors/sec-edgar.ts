import { demoOrganizations, demoSignals } from '@/server/domain/fixtures';
import { WealthSignalConnector } from './types';

export class SecEdgarConnector implements WealthSignalConnector {
  name = 'SEC EDGAR';

  async fetch() {
    return {
      source: this.name,
      organizations: [demoOrganizations[0]],
      signals: demoSignals.filter((signal) => signal.type === 'SEC_FORM_D')
    };
  }
}
