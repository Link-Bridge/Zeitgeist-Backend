import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { TaskService } from '../../core/app/services/task.services';

const validateTask = [
  body('id').isUUID(),
  body('title').isString(),
  body('description').isString(),
  body('status').isString(),
  body('waitingFor').isString(),
  body('startDate').isDate(),
  body('workedHours').isNumeric(),
  body('createdAt').isDate(),
  body('idProject').isUUID(),
];

/**
 * Sends a request to the service to create a new task with the given data.
 *
 * @param req: Request - The request object.
 * @param res: Response - The response object.
 * @returns {res.status(200).json(createdTask)} - The created task.
 * @returns {res.status(400).json({ errors: errors.array() })} -
 *                                 The errors found in the request.
 * @returns {res.status(500).json({ message: error.message })} -
 *                                 The error message.
 */
async function createTask(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, description, status, waitingFor, startDate, workedHours, createdAt, idProject } = req.body;

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

export const TaskController = { createTask, validateTask };
