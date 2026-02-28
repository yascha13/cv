import { z } from 'zod';

export const explorerFilterSchema = z.object({
  query: z.string().optional().default(''),
  state: z.string().optional(),
  metro: z.string().optional(),
  industry: z.string().optional(),
  signalType: z.string().optional(),
  minScore: z.coerce.number().min(0).max(100).optional()
});

export type ExplorerFilters = z.infer<typeof explorerFilterSchema>;

export function parseExplorerFilters(input: unknown): ExplorerFilters {
  return explorerFilterSchema.parse(input);
}
