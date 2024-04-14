import { Prisma } from '../../..';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapEmployeeEntityFromDbModel } from '../mappers/employee-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Employee';

async function findAll(): Promise<EmployeeEntity[]> {
  try {
    const data = await Prisma.employee.findMany();

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapEmployeeEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

async function findEmployeeById(id: string): Promise<EmployeeEntity> {
  try {
    const data = await Prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapEmployeeEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

async function deleteEmployeeById(id: string): Promise<EmployeeEntity> {
  try {
    const data = await Prisma.employee.delete({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapEmployeeEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

export const EmployeeRepository = { findAll, findEmployeeById, deleteEmployeeById };
