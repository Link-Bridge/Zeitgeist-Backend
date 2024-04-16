import { TaskRepository } from '../../infra/repositories/tasks.repository';
import { Task } from '../interfaces/project-report.interface';

/**
 * Creates a new task using the repository.
 *
 * @param newTask: Task - New task to be created.
 * @returns {Promise<Task | null>} - Created task or null if it already exists.
 *
 * @throws {Error} - If an error occurs when creating the task.
 */
async function createTask(newTask: Task): Promise<Task | null> {
  try {
    const existingTask = await TaskRepository.findTaskById(newTask.id);

    if (existingTask) return null;
    return await TaskRepository.createTask(newTask);
  } catch (error: unknown) {
    console.error(`The role could not be created at service level: ${error}`);
    throw new Error('Error creating task');
  }
}

export const TaskService = { createTask };
