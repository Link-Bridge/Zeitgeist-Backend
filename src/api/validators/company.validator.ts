import { z } from 'zod';
import { zodValidEmail, zodValidPhoneNumber, zodValidRfc, zodValidString, zodValidUuid } from './zod.validator';

const companySchema = z.object({
  name: z.string().min(3, { message: 'Name cannot be empty' }),
  email: zodValidEmail.optional().nullable(),
  phone_number: z
    .string()
    .min(10, { message: 'Phone number must be between 10 and 15 digits long' })
    .max(15, { message: 'Phone number must be between 10 and 15 digits long' })
    .optional()
    .nullable(),
  landline_phone: z
    .string()
    .min(10, { message: 'Landlinephone number must be between 10 and 15 digits long' })
    .max(15, { message: 'Landlinephone number must be between 10 and 15 digits long' })
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
  phoneNumber: zodValidPhoneNumber.optional().nullable(),
  landlinePhone: zodValidPhoneNumber.optional().nullable(),
  archived: z.boolean().optional(),
  constitutionDate: z.coerce.date().nullable(),
  rfc: zodValidRfc.optional().nullable(),
  taxResidence: z.string().optional().nullable(),
});

export { companySchema };
