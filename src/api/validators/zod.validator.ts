import { z } from 'zod';

export const zodValidUuid = z.string().uuid({ message: 'Provided UUID is not valid' });
export const zodValidEmail = z
  .union([
    z
      .string()
      .email({ message: 'Provided email is not valid.' })
      .max(70, { message: 'Email must be at most 70 characters long.' }),
    z.string().length(0),
  ])
  .optional();
export const zodValidString = z
  .string()
  .min(1, { message: 'Provided string must not be empty' })
  .max(255, { message: 'Provided string must be less than 256 characters' });
export const zodValidCreatedAtDate = z.date();
export const zodValidUpdatedAtDate = z.date().nullable();
export const zodValidPhoneNumber = z
  .string()
  .min(10, { message: 'Phone number must have at least 10 characters' })
  .max(15, { message: 'Phone number must have at most 15 characters' });

export const zodValidRfc = z
  .union([
    z.string().regex(/^[a-zA-Z]{3,4}[0-9]{6}[a-zA-Z0-9]{3}$/, {
      message: 'Provided RFC is not valid',
    }),
    z.string().length(0),
  ])
  .optional();
