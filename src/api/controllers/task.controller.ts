import { Request, Response } from 'express';
import { z } from 'zod';
import { TaskService } from '../../core/app/services/task.services';
import { TaskStatus } from '../../utils/enums';

const taskStatusSchema = z.enum([
  'NOT STARTED',
  'IN PROGRESS',
  'UNDER REVISSION',
  'DELAYED',
  'POSTPONED',
  'DONE',
  'CANCELLED',
]);

const taskSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(255),
  status: taskStatusSchema,
  waitingFor: z.string().min(1).max(70),
  startDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  workedHours: z.number().int().positive().optional(),
  idProject: z.string().uuid(),
});

/**
 * Sends a request to the service to create a new task with the given data.
 *
 * @param req: Request - The request object.
 * @param res: Response - The response object.
 * @returns res.status(201).json(createdTask) - The created task.
 * @returns res.status(409).json({ message }) - If the task already exists.
 * @returns res.status(500).json({ message }) - If an error occurs.
 *
 * @throws 500 - If an error occurs.
 */
async function createTask(req: Request, res: Response) {
  try {
    const bodyTask = taskSchema.parse(req.body);
    const status: TaskStatus = bodyTask.status as TaskStatus;
    const payloadTask = await TaskService.createTask({
      ...bodyTask,
      status,
      workedHours: bodyTask.workedHours || 0.0,
      dueDate: bodyTask.dueDate,
    });

    if (!payloadTask) {
      return res.status(409).json({ message: 'Task already exists' });
    }

    res.status(201).json(payloadTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const TaskController = { createTask };
