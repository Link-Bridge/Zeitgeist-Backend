import { Prisma } from '../../..';
import { EmployeeTask } from '../../domain/entities/employee-task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapEmployeeTaskEntityFromDbModel } from '../mappers/employee-task-entity-from-db-model-mapper';

const RESOURCE_NAME = 'EmployeeTask';

async function findAll(): Promise<EmployeeTask[]> {
  try {
    const data = await Prisma.employee_task.findMany();

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapEmployeeTaskEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Creates a new employee task in the database.
 *
 * @param newEmployeeTask: EmployeeTask - New employee task to be created.
 * @returns {Promise<EmployeeTask>} - Created employee task.
 *
 * @throws {Error} - If an error occurs when creating the employee task.
 */
async function create(newEmployeeTask: EmployeeTask): Promise<EmployeeTask | null> {
  return await Prisma.$transaction(async (prisma: any) => {
    try {
      const createdEmployeeTask = await prisma.employee_task.create({
        data: {
          id: newEmployeeTask.id,
          created_at: newEmployeeTask.createdAt || new Date(),
          id_employee: newEmployeeTask.idEmployee,
          id_task: newEmployeeTask.idTask,
        },
      });

      return mapEmployeeTaskEntityFromDbModel(createdEmployeeTask);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create employee task on ${RESOURCE_NAME}`);
    }
  });
}

/**
 * Validates that a task is not already assigned to an employee.
 * 
 * @param employeeId: string - The employee ID.
 * @param taskId: string - The task ID.
 * 
 * @returns {Promise<boolean>} - True if the task is assigned to the employee, false otherwise.
 */
async function validateEmployeeTask(employeeId: string, taskId: string): Promise<boolean> {
  try {
    const data = await Prisma.employee_task.findFirst({
      where: {
        id_employee: employeeId,
        id_task: taskId,
      },
    });

    return !!data;
  } catch (error: unknown) {
    throw new Error(`Failed to validate employee task on ${RESOURCE_NAME}`);
  }
}

export const EmployeeTaskRepository = { findAll, create, validateEmployeeTask };
