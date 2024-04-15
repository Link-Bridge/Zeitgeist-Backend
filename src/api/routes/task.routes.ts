import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the task
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Task Title"
 *               description:
 *                 type: string
 *                 description: The description of the task
 *                 example: "Task description"
 *               status:
 *                 type: string
 *                 description: The status of the task
 *                 example: "In Progress"
 *               waitingFor:
 *                 type: string
 *                 description: Who the task is waiting for
 *                 example: "John Doe"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the task
 *                 example: "2024-04-15"
 *               workedHours:
 *                 type: number
 *                 description: The number of hours worked on the task
 *                 example: 10
 *               createdAt:
 *                 type: string
 *                 format: date
 *                 description: The creation date of the task
 *                 example: "2024-04-15"
 *               idProject:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the project the task belongs to
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: The ID of the created task
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 title:
 *                   type: string
 *                   description: The title of the created task
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   description: The description of the created task
 *                   example: "Task description"
 *                 status:
 *                   type: string
 *                   description: The status of the created task
 *                   example: "In Progress"
 *                 waitingFor:
 *                   type: string
 *                   description: Who the created task is waiting for
 *                   example: "John Doe"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: The start date of the created task
 *                   example: "2024-04-15"
 *                 workedHours:
 *                   type: number
 *                   description: The number of hours worked on the created task
 *                   example: 10
 *                 createdAt:
 *                   type: string
 *                   format: date
 *                   description: The creation date of the created task
 *                   example: "2024-04-15"
 *                 idProject:
 *                   type: string
 *                   format: uuid
 *                   description: The ID of the project the created task belongs to
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: The error message
 *                       param:
 *                         type: string
 *                         description: The parameter that caused the error
 *                       location:
 *                         type: string
 *                         description: The location of the error in the request
 *       409:
 *         description: Task already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */

router.post('/create', TaskController.createTask);

export { router as TaskRouter };
