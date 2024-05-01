import { randomUUID } from 'crypto';
import { EmployeeTask } from '../../domain/entities/employee-task.entity';
import { BareboneTask, Task } from '../../domain/entities/task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';
import { TaskDetail } from '../interfaces/task.interface';

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

/**
 * Gets a task using the repository.
 *
 * @param id: Task - Task to be searched.
 * @returns {Promise<TaskDetail>} - Info of the task.
 *
 * @throws {Error} - If an error occurs when looking for the task.
 */
async function findUnique(id: string): Promise<TaskDetail> {
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

/**
 * Finds all the assigned tasks to an employee
 *
 * @param employeeId: string - Employee id.
 * @returns {Promise<TaskDetail[]>} - Array of tasks assigned to the employee.
 *
 * @throws {Error} - If an error occurs when finding the tasks.
 * @throws {NotFoundError} - If the employee is not found.
 * @throws {NotFoundError} - If the task is not found.
 * @throws {Error} - If an error occurs when looking for the task.
 */
async function getTasksAssignedToEmployee(employeeId: string): Promise<Task[]> {
  try {
    if ((await EmployeeRepository.findById(employeeId)) === null) {
      throw new NotFoundError('Employee');
    }

    const employeeTasks = await EmployeeTaskRepository.findByEmployeeId(employeeId);

    if (!employeeTasks) {
      throw new NotFoundError('Task assigned to employee');
    }

    const tasksId = employeeTasks.map(task => task.idTask);
    const tasks = await TaskRepository.findTasksById(tasksId);

    return tasks;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const TaskService = { createTask, findUnique, getTasksFromProject, getTasksAssignedToEmployee };
