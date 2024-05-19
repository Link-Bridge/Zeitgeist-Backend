import { z } from 'zod';
import { zodValidEmail } from './zod.validator';

/**
 * @brief Schema for the user device token
 *
 * @param email: string - Email of the employee
 * @param deviceToken: string - Token of the device
 *
 * @return {z.ZodObject} - The schema for the user device token
 */
export const userToken = z.object({
  email: zodValidEmail,
  deviceToken: z.string(),
});
