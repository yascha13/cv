import { BusinessRegistryConnector } from '@/server/connectors/business-registry';
import { Irs990Connector } from '@/server/connectors/irs-990';
import { SecEdgarConnector } from '@/server/connectors/sec-edgar';

export async function runIngestionJobs() {
  const connectors = [new SecEdgarConnector(), new Irs990Connector(), new BusinessRegistryConnector()];

  const summaries = [];
  for (const connector of connectors) {
    const result = await connector.fetch();
    summaries.push({
      connector: connector.name,
      organizations: result.organizations.length,
      signals: result.signals.length
    });
  }

  return summaries;
}
