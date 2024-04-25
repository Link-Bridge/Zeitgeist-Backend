import { z } from 'zod';

export const zodValidUuid = z.string().uuid({ message: 'Provided UUID is not valid' });
export const zodValidEmail = z.string().email({ message: 'Provided email is not valid' });
export const zodValidString = z
  .string()
  .min(1, { message: 'Provided string must not be null' })
  .max(255, { message: 'Provided string must be less than 256 characters' });
export const zodValidCreatedAtDate = z.date({ message: 'Provided CreatedAt date is not valid' });
export const zodValidUpdatedAtDate = z.date({ message: 'Provided UpdatedAt date is not valid' }).nullable();
export const zodValidPhoneNumber = z
  .string()
  .startsWith('+', { message: `Phone number must start with '+'` })
  .min(8, { message: 'Phone number must have 8 characters' })
  .max(15, { message: 'Phone number must have 15 characters' })
  .nullable();
