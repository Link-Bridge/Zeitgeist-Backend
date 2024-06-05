import { z } from 'zod';
import { zodValidEmail, zodValidPhoneNumber, zodValidRfc, zodValidUuid } from './zod.validator';

const companySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty.' })
    .max(70, { message: 'Name must be at most 70 characters long.' }),
  email: zodValidEmail.optional().nullable(),
  phone_number: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters.' })
    .max(15, { message: 'Phone number cannot be longer than 15 characters.' })
    .optional()
    .nullable(),
  landline_phone: z
    .string()
    .min(10, { message: 'Landlinephone number must be between 10 and 15 digits long' })
    .max(15, { message: 'Landlinephone number must be between 10 and 15 digits long' })
    .optional()
    .nullable(),
  archived: z
    .boolean()
    .optional()
    .nullable()
    .refine(value => value === false, {
      message: 'Cannot create a project for an archived company.',
    }),
  constitutionDate: z.string().optional().nullable(),
  rfc: zodValidRfc.optional().nullable(),
  taxResidence: z
    .string()
    .max(150, { message: 'Tax residence cannot be longer than 150 characters.' })
    .nullable()
    .optional(),
  id_company_direct_contact: zodValidUuid.optional().nullable(),
  id_form: zodValidUuid.optional().nullable(),
  updated_at: z.string().datetime().optional().nullable(),
});

export const updateCompanySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty.' })
    .max(70, { message: 'Name must be at most 70 characters long.' }),
  email: zodValidEmail.optional().nullable(),
  phoneNumber: zodValidPhoneNumber.optional().nullable(),
  landline_phone: z
    .string()
    .min(10, { message: 'Landlinephone number must be between 10 and 15 digits long' })
    .max(15, { message: 'Landlinephone number must be between 10 and 15 digits long' })
    .optional()
    .nullable(),
  archived: z.boolean().optional(),
  constitutionDate: z.coerce.date().nullable(),
  rfc: zodValidRfc.optional().nullable(),
  taxResidence: z
    .string()
    .max(150, { message: 'Tax residence cannot be longer than 150 characters.' })
    .nullable()
    .optional(),
});

export { companySchema };
