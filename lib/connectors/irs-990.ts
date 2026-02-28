import { SignalConnector } from './types';

export class Irs990Connector implements SignalConnector {
  name = 'IRS 990 Connector';

  async run() {
    return {
      connector: this.name,
      recordsIngested: 1,
      notes: 'Mocked IRS 990 records ingested with org-level metrics and minimal officer title data.'
    };
  }
}
