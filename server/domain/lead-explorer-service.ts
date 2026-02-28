import { ExplorerFilters } from '@/lib/filters';
import { listOrganizationsWithSignals } from '@/server/repositories/organization-repository';
import { scoreLead } from '@/server/domain/lead-scoring';

export type LeadQuery = ExplorerFilters & { page?: number; pageSize?: number };

export async function queryLeads(filters: LeadQuery, advisorState = 'TX') {
  const { organizations, signals } = await listOrganizationsWithSignals();

  const filtered = organizations
    .map((organization) => {
      const score = scoreLead(organization, signals, advisorState);
      const orgSignals = signals.filter((signal) => signal.organizationId === organization.id);
      return {
        ...organization,
        signalTypes: [...new Set(orgSignals.map((signal) => signal.type))],
        score
      };
    })
    .filter((row) => {
      if (filters.query && !row.name.toLowerCase().includes(filters.query.toLowerCase())) return false;
      if (filters.state && row.state !== filters.state) return false;
      if (filters.metro && row.metro !== filters.metro) return false;
      if (filters.industry && row.industry !== filters.industry) return false;
      if (filters.signalType && !row.signalTypes.includes(filters.signalType as never)) return false;
      if (filters.minScore && row.score.score < filters.minScore) return false;
      return true;
    });

  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 10));
  const total = filtered.length;
  const start = (page - 1) * pageSize;

  return {
    rows: filtered.slice(start, start + pageSize),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize))
    }
  };
}

export async function getLeadDetail(id: string, advisorState = 'TX') {
  const { organizations, signals } = await listOrganizationsWithSignals();
  const organization = organizations.find((org) => org.id === id) ?? organizations[0];
  const organizationSignals = signals.filter((signal) => signal.organizationId === organization.id);
  const score = scoreLead(organization, signals, advisorState);

  return { organization, organizationSignals, score };
}
