import { z } from 'zod';

export const searchSchema = z.object({
  keyword: z.string().optional(),
  sources: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
