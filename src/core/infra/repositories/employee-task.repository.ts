import { Prisma } from '../../..';
import { EmployeeTask } from '../../domain/entities/employee-task.entity';
import { mapEmployeeTaskEntityFromDbModel } from '../mappers/employee-task-entity-from-db-model-mapper'
import { NotFoundError } from '../../errors/not-found.error';

async function findAll(): Promise<EmployeeTask[]> {
    let data = await Prisma.employee_task.findMany({});

    if(!data) {
        throw new NotFoundError('EmployeeTask');
    }

    return data.map(mapEmployeeTaskEntityFromDbModel);
}

export const CompanyRepository = { findAll };