import { BusinessRegistryConnector } from '@/lib/connectors/business-registry';
import { Irs990Connector } from '@/lib/connectors/irs-990';
import { SecEdgarConnector } from '@/lib/connectors/sec-edgar';
import { VendorEnrichmentConnector } from '@/lib/connectors/vendor-enrichment';

export async function runIngestionJobs() {
  const connectors = [
    new SecEdgarConnector(),
    new Irs990Connector(),
    new BusinessRegistryConnector(),
    new VendorEnrichmentConnector(process.env.VENDOR_API_KEY)
  ];

  const results = [];
  for (const connector of connectors) {
    results.push(await connector.run());
  }

  return results;
}
