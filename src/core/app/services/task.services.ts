import { Task } from "../interfaces/project-report.interface";
import { TaskRepository } from "../../infra/repositories/tasks.repository";

/**
 * Creates a new task using the repository. 
 * 
 * @param new_task: Task - New task to be created.
 * @returns {Promise<Task | null>} - Created task or null if it already exists.
 */
async function createTask(new_task: Task): Promise<Task | null>  {
  try { 
    const existingTask = await TaskRepository.findTaskById(new_task.id);

    if (existingTask) return null;

    const newTask = await TaskRepository.createTask(new_task);
    return newTask;
  }
  catch (error: unknown) { 
    console.error(`The role could not be created at service level: ${error}`);
    throw new Error("Error creating task");
  }
}

export const TaskService = { createTask };