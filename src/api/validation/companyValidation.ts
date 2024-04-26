import { z } from 'zod';

const companySchema = z.object({
  name: z.string().min(3, { message: 'Name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email' }).optional().nullable(),
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
  archived: z.boolean({ message: 'Archived must be a boolean value' }).optional().nullable(),
  constitutionDate: z.string().optional().nullable(),
  rfc: z
    .string()
    .min(12, { message: 'RFC muste be at least 12 characters long' })
    .max(13, { message: 'RFC muste be maximum 13 characters long' })
    .optional()
    .nullable(),
  taxResidence: z.string().nullable().optional(),
  id_company_direct_contact: z.string().uuid().optional().nullable(),
  id_form: z.string().uuid().optional().nullable(),
  updated_at: z.string().datetime().optional().nullable(),
});

export { companySchema };
