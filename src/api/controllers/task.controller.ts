import { Request, Response } from 'express';
import { z } from 'zod';
import { TaskService } from '../../core/app/services/task.services';

const taskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(255),
  status: z.string().min(1).max(70),
  waitingFor: z.string().min(1).max(70),
  startDate: z.coerce.date(),
  workedHours: z.number().int().positive().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  idProject: z.string().min(1),
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
    const createdTask = await TaskService.createTask(bodyTask);

    if (!createTask) {
      return res.status(409).json({ message: 'Task already exists' });
    }

    res.status(201).json(createdTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const TaskController = { createTask };
