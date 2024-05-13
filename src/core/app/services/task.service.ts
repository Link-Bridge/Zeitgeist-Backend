import { randomUUID } from 'crypto';
import { TaskStatus } from '../../../utils/enums';
import { EmployeeTask } from '../../domain/entities/employee-task.entity';
import { BareboneTask, Task, UpdatedTask } from '../../domain/entities/task.entity';
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
      endDate: newTask.endDate ?? undefined,
      workedHours: newTask.workedHours ?? undefined,
      createdAt: new Date(),
      idProject: newTask.idProject,
    };

    const createdTask = await TaskRepository.createTask(task);
    if (!createdTask) {
      throw new Error('Task already exists');
    }

    if (newTask.idEmployee) {
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

/**
 * Deletes a task using the repository.
 *
 * @param id: string - Task id.
 *
 * @throws {Error} - If an error occurs when deleting the task.
 * @throws {NotFoundError} - If the task is not found.
 */

async function deleteTask(id: string): Promise<void> {
  try {
    if ((await TaskRepository.findTaskById(id)) === null) {
      throw new NotFoundError('Task');
    }

    await EmployeeTaskRepository.deleteByTaskId(id);
    await TaskRepository.deleteTaskById(id);
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * @brief Updates a task using the repository.
 *
 * @param id: string - Task to be updated.
 * @param task: UpdatedTask - Task to be updated.
 *
 * @returns {Promise<Boolean>} - True if the task was updated.
 *
 * @throws {Error} - If an error occurs when updating the task.
 */
async function updateTask(idTask: string, task: UpdatedTask): Promise<boolean> {
  try {
    if ((await TaskRepository.findTaskById(idTask)) === null) {
      throw new Error('Task ID is not valid');
    }

    const status = task.status;
    if (status === TaskStatus.DONE) {
      task.endDate = new Date();
    }

    if (task.idEmployee !== '') {
      const employee = await EmployeeRepository.findById(task.idEmployee);
      if (!employee) {
        throw new NotFoundError('Employee');
      }
      const newEmployeeTask: EmployeeTask = {
        id: randomUUID(),
        createdAt: new Date(),
        idEmployee: task.idEmployee,
        idTask: idTask,
      };
      const taskIsAssignedAlready = await EmployeeTaskRepository.validateEmployeeTask(idTask);
      if (!taskIsAssignedAlready) {
        const assignedTask = await EmployeeTaskRepository.create(newEmployeeTask);
        if (!assignedTask) {
          throw new Error('Error assigning a task to an employee');
        }
      } else if (taskIsAssignedAlready) {
        await EmployeeTaskRepository.deleteByTaskId(idTask);
        await EmployeeTaskRepository.create(newEmployeeTask);
      }
    }

    const updatedTask = await TaskRepository.updateTask(idTask, task);
    return updatedTask;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * @brief Updates the status of a task using the repository.
 *
 * @param id: string - Task to be updated.
 * @param status: TaskStatus - Status to be updated.
 *
 * @returns {Promise<Boolean>} - True if the task status was updated.
 *
 * @throws {Error} - If an error occurs when updating the task.
 */
async function updateTaskStatus(idTask: string, status: TaskStatus): Promise<boolean> {
  try {
    if (status === TaskStatus.DONE) {
      await TaskRepository.updateTaskEndDate(idTask, new Date());
    }

    await TaskRepository.updateTaskStatus(idTask, status);
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const TaskService = {
  createTask,
  findUnique,
  getTasksFromProject,
  getTasksAssignedToEmployee,
  deleteTask,
  updateTask,
  updateTaskStatus,
};
