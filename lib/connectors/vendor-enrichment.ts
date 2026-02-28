import { SignalConnector } from './types';

export class VendorEnrichmentConnector implements SignalConnector {
  name = 'Vendor Enrichment Connector';

  constructor(private apiKey?: string) {}

  async run() {
    if (!this.apiKey) {
      return {
        connector: this.name,
        recordsIngested: 0,
        notes: 'Skipped: add licensed vendor API key in settings.'
      };
    }

    return {
      connector: this.name,
      recordsIngested: 2,
      notes: 'Mock enrichment returned employee range and estimated revenue bands.'
    };
  }
}
