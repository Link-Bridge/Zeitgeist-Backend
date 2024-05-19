import { z } from 'zod';
import { ProjectCategory, ProjectPeriodicity, SupportedDepartments } from '../../utils/enums';
import { zodValidProjectStatus, zodValidUuid } from './zod.validator';

export const createProjectRequestSchema = z.object({
  name: z.string(),
  idCompany: zodValidUuid,
  category: z.nativeEnum(ProjectCategory),
  matter: z.string().optional(),
  description: z.string().optional(),
  status: zodValidProjectStatus,
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  periodicity: z.nativeEnum(ProjectPeriodicity),
  isChargeable: z.boolean(),
  area: z.nativeEnum(SupportedDepartments),
});
