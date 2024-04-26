import { z } from 'zod';

const companySchema = z.object({
  name: z.string().min(3),
  email: z.string().email().optional().nullable(),
  phone_number: z.string().min(10).max(13).optional().nullable(),
  landline_phone: z.string().min(10).max(13).optional().nullable(),
  archived: z.boolean().optional().nullable(),
  constitutionDate: z.date().optional().nullable(),
  rfc: z.string().min(12).max(13).optional().nullable(),
  taxResidence: z.string().nullable().optional(),
  id_company_direct_contact: z.string().uuid().optional().nullable(),
  id_form: z.string().uuid().optional().nullable(),
  updated_at: z.string().datetime().optional().nullable(),
});

export { companySchema };
