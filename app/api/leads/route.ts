import { NextRequest, NextResponse } from 'next/server';
import { parseExplorerFilters } from '@/lib/filters';
import { queryLeads } from '@/server/domain/lead-explorer-service';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const filters = parseExplorerFilters({
    query: params.get('query') ?? undefined,
    state: params.get('state') ?? undefined,
    metro: params.get('metro') ?? undefined,
    industry: params.get('industry') ?? undefined,
    signalType: params.get('signalType') ?? undefined,
    minScore: params.get('minScore') ?? undefined
  });

  const page = Number.parseInt(params.get('page') ?? '1', 10);
  const pageSize = Number.parseInt(params.get('pageSize') ?? '10', 10);

  const result = await queryLeads({ ...filters, page, pageSize });
  return NextResponse.json({ ok: true, ...result });
}
