import { z } from 'zod';
import { zodValidMatter, zodValidString, zodValidUuid } from './zod.validator';

export const updateProjectSchema = z.object({
  id: zodValidUuid,
  name: zodValidString,
  description: zodValidString,
  matter: zodValidMatter,
  start_date: z.coerce.date().nullable(),
  end_date: z.coerce.date().nullable(),
});
