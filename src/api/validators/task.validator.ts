import { z } from 'zod';
import { zodValidString, zodValidTaskStatus, zodValidUuid } from './zod.validator';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title must have at least 1 character',
    })
    .max(70, {
      message: 'Title must have at most 70 characters',
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description must have at least 1 character',
    })
    .max(255, {
      message: 'Description must have at most 255 characters',
    }),
  status: zodValidTaskStatus,
  startDate: z.coerce.date({ required_error: 'Start date is required' }),
  endDate: z.coerce.date().nullable(),
  workedHours: z.string().optional(),
  idEmployee: zodValidUuid.optional(),
  idProject: zodValidUuid,
});

export const idProjectSchema = z.object({
  idProject: zodValidUuid,
});

/**
 * Validates the data using zod schema
 *
 * @brief This is a zod schema that validates the data of an updated task
 */
export const updatedTaskSchema = z.object({
  id: zodValidUuid.optional(),
  title: z.string().min(1).max(70).optional(),
  description: zodValidString.optional(),
  status: zodValidTaskStatus.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  workedHours: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  idProject: zodValidUuid.optional(),
  idEmployee: zodValidUuid.optional(),
});
