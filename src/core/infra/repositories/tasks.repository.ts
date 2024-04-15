import { Prisma } from '../../..';
import { Task } from '../../domain/entities/task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapTaskEntityFromDbModel } from '../mappers/task-entity-from-db-model-mapper';

const RESOURCE_NAME = 'Task';

/**
 * Searches for a task by its id.
 *
 * @param id: string - The unique identifier of the task.
 * @return {Promise<Task>} - The task found.
 * 
 * @throws {NotFoundError} - If the task is not found.
 */
async function findTaskById(id: string): Promise<Task> {
  try {
    let data = await Prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) throw new NotFoundError(RESOURCE_NAME);
    return mapTaskEntityFromDbModel(data);
  } catch (error: unknown) {
    console.error('Error finding task by id: ', error);
    throw new NotFoundError(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Creates a new task in the database.
 *
 * @param new_task: Task - New task to be created.
 * @returns {Promise<Task>} - Created task.
 *
 * @throws {Error} - If an error occurs when creating the task.
 */
async function createTask(newTask: Task): Promise<Task> {
  try {
    let data = await Prisma.task.create({
      data: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        waiting_for: newTask.waitingFor,
        start_date: newTask.startDate,
        worked_hours: Number(newTask.workedHours),
        created_at: newTask.createdAt || new Date(),
        updated_at: new Date(),
        id_project: newTask.idProject,
      },
    });

    if (!data) throw new Error('Error creating task');
    return mapTaskEntityFromDbModel(data);
  } catch (error: unknown) {
    console.error('Error creating task: ', error);
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

async function findTasksByProjectId(id_project: string): Promise<Task[]> {
  try {
    let data = await Prisma.task.findMany({
      where: {
        id_project: id_project,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapTaskEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

export const TaskRepository = { createTask, findTaskById, findTasksByProjectId };
