import { Request, Response } from 'express';
import { z } from 'zod';
import { TaskService } from '../../core/app/services/task.services';

const taskSchema = z.object({
  id: z.string().ulid(),
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(255),
  status: z.string().min(1).max(50),
  waitingFor: z.string().min(1).max(50).optional(),
  startDate: z.date(),
  workedHours: z.number().int().positive().optional(),
  createdAt: z.date(),
  idProject: z.string().ulid(),
});

/**
 * Sends a request to the service to create a new task with the given data.
 *
 * @param req: Request - The request object.
 * @param res: Response - The response object.
 * @returns res.status(201).json(createdTask) - The created task.
 * @returns res.status(409).json({ message }) - If the task already exists.
 *
 * @throws 500 - If an error occurs.
 */
async function createTask(req: Request, res: Response) {
  try {
    const { id, title, description, status, waitingFor, startDate, workedHours, createdAt, idProject } =
      taskSchema.parse(req.body);

    const newTask = {
      id,
      title,
      description,
      status,
      waitingFor,
      startDate,
      workedHours,
      createdAt,
      idProject,
    };

    const createdTask = await TaskService.createTask(newTask);
    if (!createdTask) {
      return res.status(409).json({ message: 'Task already exists' });
    }

    res.status(201).json(createdTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const TaskController = { createTask };
