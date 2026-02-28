import { describe, expect, it } from 'vitest';
import { scoreLead } from '@/server/domain/lead-scoring';
import { demoOrganizations, demoSignals } from '@/server/domain/fixtures';

describe('scoreLead', () => {
  it('returns bounded score and breakdown', () => {
    const result = scoreLead(demoOrganizations[0], demoSignals, 'TX');
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.breakdown.length).toBeGreaterThan(0);
  });
});
