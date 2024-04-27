import { randomUUID } from 'crypto';
import { BareboneTask, Task } from '../../domain/entities/task.entity';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';
import { TaskDetail } from '../interfaces/task.interface';

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
 * @returns {Promise<TaskDetail>} - Info of the task.
 *
 * @throws {Error} - If an error occurs when looking for the task.
 */
async function getTaskById(id: string): Promise<TaskDetail> {
  try {
    const task = await TaskRepository.findTaskById(id);
    const project = await ProjectRepository.findById(task.idProject);
    const employeeTask = await EmployeeTaskRepository.findAll();

    const selectedEmployeeTask = employeeTask.find(record => {
      if (record.idTask === task.id) return record;
    });

    if (!selectedEmployeeTask) {
      return { ...task, projectName: project.name };
    }

   const employee = await EmployeeRepository.findById(selectedEmployeeTask.idEmployee);

    return {
      ...task,
      projectName: project.name,
      employeeFirstName: employee.firstName,
      employeeLastName: employee.lastName,
    };
  } catch (error: unknown) {
    throw new Error('An unexpected error occurred');
  }
}

export const TaskService = { createTask, getTaskById };
