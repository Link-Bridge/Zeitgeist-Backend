import { Prisma } from '../../..';
import { Task } from '../../domain/entities/task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapTaskEntityFromDbModel } from '../mappers/task-entity-from-db-model-mapper';

const RESOURCE_NAME = 'Task';

/**
 * Finds a task by its id.
 *
 * @param id: string - Task id.
 * @returns {Promise<Task | null>} - Task found or null if not found.
 *
 * @throws {Error} - If an error occurs when finding the task.
 */
async function findTaskById(id: string): Promise<Task | null> {
  try {
    const existingTask = await Prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapTaskEntityFromDbModel(existingTask);
  } catch (error) {
    throw new Error(`Failed to find task on ${RESOURCE_NAME} with id ${id}`);
  }
}

/**
 * Creates a new task in the database.
 *
 * @param new_task: Task - New task to be created.
 * @returns {Promise<Task>} - Created task.
 * @returns {Promise<null>}    - If the task already exists.
 *
 * @throws {Error} - If an error occurs when creating the task.
 */
async function createTask(newTask: Task): Promise<Task | null> {
  return await Prisma.$transaction(async (prisma: any) => {
    try {
      const existingTask = await findTaskById(newTask.id);

      if (existingTask) {
        return null;
      }

      const createdTask = await prisma.task.create({
        data: {
          id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          status: newTask.status,
          start_date: newTask.startDate,
          end_date: newTask.endDate,
          worked_hours: Number(newTask.workedHours),
          created_at: newTask.createdAt || new Date(),
          updated_at: new Date(),
          id_project: newTask.idProject,
        },
      });

      return mapTaskEntityFromDbModel(createdTask);
    } catch (error: any) {
      console.error(error.message);
      throw new Error(`Failed to create task on ${RESOURCE_NAME}`);
    }
  });
}

async function findTasksByProjectId(idProject: string): Promise<Task[]> {
  try {
    const data = await Prisma.task.findMany({
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

export const TaskRepository = { createTask, findTasksByProjectId, findTaskById };
