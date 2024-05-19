import { z } from 'zod';
import { zodValidEmail, zodValidString, zodValidUrl } from './zod.validator';

export const authSchema = z.object({
  auth: z.object({
    name: zodValidString,
    email: zodValidEmail,
    picture: zodValidUrl,
  }),
});
