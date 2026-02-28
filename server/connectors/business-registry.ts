import { demoOrganizations, demoSignals } from '@/server/domain/fixtures';
import { WealthSignalConnector } from './types';

export class BusinessRegistryConnector implements WealthSignalConnector {
  name = 'Business Registry';

  async fetch() {
    return {
      source: this.name,
      organizations: demoOrganizations,
      signals: demoSignals.filter((signal) => signal.type === 'SUCCESSION_INDICATOR')
    };
  }
}
