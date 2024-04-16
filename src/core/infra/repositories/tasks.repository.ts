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
  const task = await Prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    console.error(`Task with id ${id}`);
    throw new NotFoundError(`Task with id ${id}`);
  }

  return mapTaskEntityFromDbModel(task);
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
    let createdTask = await Prisma.task.create({
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

    if (!createdTask) {
      throw new Error(`Failed to create task with the following payload: ${createdTask}`);
    }
    return mapTaskEntityFromDbModel(createdTask);
  } catch (error: unknown) {
    console.error('Error creating task: ', error);
    throw new Error(`Failed to create task on ${RESOURCE_NAME}`);
  }
}

async function findTasksByProjectId(idProject: string): Promise<Task[]> {
  try {
    let data = await Prisma.task.findMany({
      where: {
        id_project: idProject,
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
