import { describe, expect, it } from 'vitest';
import { computeLeadScore } from '@/lib/scoring';
import { demoOrganizations, demoSignals } from '@/lib/data';

describe('computeLeadScore', () => {
  it('returns bounded score and breakdown', () => {
    const result = computeLeadScore(demoOrganizations[0], demoSignals, 'TX');
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.breakdown.length).toBeGreaterThan(0);
  });
});
