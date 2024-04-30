import { z } from 'zod';
import { zodValidEmail, zodValidPhoneNumber, zodValidRfc, zodValidString, zodValidUuid } from './zod.validator';

const companySchema = z.object({
  name: z.string().min(3, { message: 'Name cannot be empty' }),
  email: zodValidEmail.optional().nullable(),
  phone_number: z
    .string()
    .min(10, { message: 'Phone number must be between 10 and 13 digits long' })
    .max(13, { message: 'Phone number must be between 10 and 13 digits long' })
    .optional()
    .nullable(),
  landline_phone: z
    .string()
    .min(10, { message: 'Landlinephone number must be between 10 and 13 digits long' })
    .max(13, { message: 'Landlinephone number must be between 10 and 13 digits long' })
    .optional()
    .nullable(),
  archived: z.boolean().optional().nullable(),
  constitutionDate: z.string().optional().nullable(),
  rfc: zodValidRfc.optional().nullable(),
  taxResidence: z.string().nullable().optional(),
  id_company_direct_contact: zodValidUuid.optional().nullable(),
  id_form: zodValidUuid.optional().nullable(),
  updated_at: z.string().datetime().optional().nullable(),
});

export const updateCompanySchema = z.object({
  id: zodValidUuid,
  name: zodValidString,
  email: zodValidEmail.optional(),
  phoneNumber: zodValidPhoneNumber.optional(),
  landlinePhone: zodValidPhoneNumber.optional(),
  archived: z.boolean(),
  constitutionDate: z
    .string()
    .refine(data => data === null || !isNaN(Date.parse(data)), {
      message: 'Invalid date format, expected YYYY-MM-DD',
    })
    .transform(data => (data ? new Date(data) : null))
    .optional(),
  rfc: zodValidRfc.optional(),
  taxResidence: z.string().optional(),
});

export { companySchema };
