import { randomUUID } from 'crypto';
import { BareboneTask, Task } from '../../domain/entities/task.entity';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';

/**
 * Gets all tasks from a unique project using the repository.
 *
 * @param projectId: string - projectId to which the tasks are related.
 * @returns {Promise<Task[]>} - Array of tasks from a unique project.
 *
 * @throws {Error} - If an error occurs when creating the task.
 */

async function getTasksFromProject(projectId: string): Promise<Task[]> {
  try {
    const taskRecords = await TaskRepository.findTasksByProjectId(projectId);
    return taskRecords;
  } catch (error: unknown) {
    throw new Error('Error fetching array of tasks from project');
  }
}

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

export const TaskService = { getTasksFromProject, createTask };
