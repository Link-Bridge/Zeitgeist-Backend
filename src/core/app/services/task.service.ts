import { randomUUID } from 'crypto';
import { EmployeeTask } from '../../domain/entities/employee-task.entity';
import { BareboneTask, Task } from '../../domain/entities/task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';

/**
 * Creates a new task using the payload from the client.
 * The task is created only if the project ID is valid and the relationship
 * between task and employee is created.
 *
 * @param newTask: Task - New task to be created.
 * @returns {Promise<Task | null>} - Created task or null if it already exists.
 *
 * @throws {Error} - If an error occurs when creating the task.
 * @throws {NotFoundError} - If the project ID is not valid.
 * @throws {NotFoundError} - If the employee is not found.
 * @throws {Error} - If the task already exists.
 * @throws {Error} - If an error occurs when assigning the task to the employee.
 */
async function createTask(newTask: BareboneTask): Promise<Task | null> {
  try {
    if ((await ProjectRepository.findById(newTask.idProject)) === null) {
      throw new NotFoundError('Project ID ');
    }

    const task: Task = {
      id: randomUUID(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      startDate: newTask.startDate,
      endDate: newTask.dueDate ?? undefined,
      workedHours: newTask.workedHours ?? undefined,
      createdAt: new Date(),
      idProject: newTask.idProject,
    };

    const createdTask = await TaskRepository.createTask(task);
    if (!createdTask) {
      throw new Error('Task already exists');
    }

    const employee = await EmployeeRepository.findById(newTask.idEmployee);

    if (!employee) {
      throw new NotFoundError('Employee');
    }

    const newEmployeeTask: EmployeeTask = {
      id: randomUUID(),
      createdAt: new Date(),
      idEmployee: employee.id,
      idTask: createdTask.id as string,
    };

    const assignedTask = await EmployeeTaskRepository.create(newEmployeeTask);
    if (!assignedTask) {
      throw new Error('Error assigning a task to an employee');
    }

    return createdTask;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const TaskService = { createTask };
