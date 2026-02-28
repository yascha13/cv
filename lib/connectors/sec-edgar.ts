import { SignalConnector } from './types';

export class SecEdgarConnector implements SignalConnector {
  name = 'SEC EDGAR Connector';

  async run() {
    return {
      connector: this.name,
      recordsIngested: 2,
      notes: 'Mocked Form D metadata ingested. Store filing metadata + links only.'
    };
  }
}
