import { randomUUID } from 'crypto';
import { BareboneTask, Task } from '../../domain/entities/task.entity';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';

/**
 * Creates a new task using the repository.
 *
 * @param newTask: Task - New task to be created.
 * @returns {Promise<Task | null>} - Created task or null if it already exists.
 *
 * @throws {Error} - If an error occurs when creating the task.
 */
async function createTask(newTask: BareboneTask): Promise<Task | null> {
  try {
    if ((await ProjectRepository.findById(newTask.idProject)) === null) {
      throw new Error('Project ID is not valid');
    }

    const task: Task = {
      id: randomUUID(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      waitingFor: newTask.waitingFor,
      startDate: newTask.startDate,
      endDate: newTask.dueDate ?? undefined,
      workedHours: newTask.workedHours ?? undefined,
      createdAt: new Date(),
      idProject: newTask.idProject,
    };

    return await TaskRepository.createTask(task);
  } catch (error: unknown) {
    throw new Error('Error creating task');
  }
}

/**
 * Gets a task using the repository.
 *
 * @param id: Task - Task to be searched.
 * @returns {Promise<Task>} - Info of the task.
 *
 * @throws {Error} - If an error occurs when looking for the task.
 */
async function getTaskById(id: string): Promise<Task> {
  try {
    return await TaskRepository.findTaskById(id);
  } catch (error: unknown) {
    throw new Error('An unexpected error occurred');
  }
}

export const TaskService = { createTask, getTaskById };
