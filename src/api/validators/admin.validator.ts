import { z } from 'zod';
import { zodValidUuid } from './zod.validator';

export const updateUserRoleSchema = z.object({
  userId: zodValidUuid,
  roleId: zodValidUuid,
});

export const archiveClientIdSchema = z.object({
  id: z.string().uuid(),
});
