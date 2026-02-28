import { describe, expect, it } from 'vitest';
import { parseExplorerFilters } from '@/lib/filters';

describe('parseExplorerFilters', () => {
  it('parses valid payload', () => {
    const parsed = parseExplorerFilters({ state: 'TX', minScore: '50' });
    expect(parsed.state).toBe('TX');
    expect(parsed.minScore).toBe(50);
  });

  it('throws on invalid score', () => {
    expect(() => parseExplorerFilters({ minScore: 200 })).toThrow();
  });
});
