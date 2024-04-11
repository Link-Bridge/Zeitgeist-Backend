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
    throw new Error('Employee repository error');
  }
}

export const EmployeeRepository = { findAll };