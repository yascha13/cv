'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AppNav } from '@/components/layout/nav';
import { Card } from '@/components/ui/card';

type LeadRow = {
  id: string;
  name: string;
  state: string;
  metro: string;
  industry: string;
  score: { score: number };
};

type LeadsResponse = {
  ok: boolean;
  rows: LeadRow[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

export default function LeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0, totalPages: 1 });
  const [filters, setFilters] = useState({ query: '', state: '', industry: '', signalType: '' });

  const search = useMemo(() => new URLSearchParams({
    page: String(pagination.page),
    pageSize: String(pagination.pageSize),
    ...(filters.query ? { query: filters.query } : {}),
    ...(filters.state ? { state: filters.state } : {}),
    ...(filters.industry ? { industry: filters.industry } : {}),
    ...(filters.signalType ? { signalType: filters.signalType } : {})
  }), [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/leads?${search.toString()}`);
      const json: LeadsResponse = await response.json();
      setRows(json.rows);
      setPagination(json.pagination);
    }

    load();
  }, [search]);

  return (
    <div>
      <AppNav />
      <main className="mx-auto w-[95%] max-w-6xl py-6">
        <h1 className="text-3xl font-bold">Lead Explorer</h1>

        <Card className="mt-4">
          <h2 className="font-semibold">Filters</h2>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <input className="rounded border p-2" value={filters.query} onChange={(e) => setFilters((v) => ({ ...v, query: e.target.value }))} placeholder="Search organization" />
            <input className="rounded border p-2" value={filters.state} onChange={(e) => setFilters((v) => ({ ...v, state: e.target.value.toUpperCase() }))} placeholder="State" />
            <input className="rounded border p-2" value={filters.industry} onChange={(e) => setFilters((v) => ({ ...v, industry: e.target.value }))} placeholder="Industry" />
            <input className="rounded border p-2" value={filters.signalType} onChange={(e) => setFilters((v) => ({ ...v, signalType: e.target.value }))} placeholder="Signal type" />
          </div>
        </Card>

        <Card className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-slate-500">
                <th className="table-cell">Organization</th>
                <th className="table-cell">State/Metro</th>
                <th className="table-cell">Industry</th>
                <th className="table-cell">Score</th>
                <th className="table-cell" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="border-b" key={row.id}>
                  <td className="table-cell">{row.name}</td>
                  <td className="table-cell">{row.state} • {row.metro}</td>
                  <td className="table-cell">{row.industry}</td>
                  <td className="table-cell font-semibold">{row.score.score}</td>
                  <td className="table-cell"><Link className="text-brand" href={`/leads/${row.id}`}>View detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p>Page {pagination.page} of {pagination.totalPages} ({pagination.total} results)</p>
            <div className="flex gap-2">
              <button className="rounded border px-3 py-1 disabled:opacity-50" disabled={pagination.page <= 1} onClick={() => setPagination((v) => ({ ...v, page: v.page - 1 }))}>Previous</button>
              <button className="rounded border px-3 py-1 disabled:opacity-50" disabled={pagination.page >= pagination.totalPages} onClick={() => setPagination((v) => ({ ...v, page: v.page + 1 }))}>Next</button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
