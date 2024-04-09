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

async function findById(id: string): Promise<EmployeeEntity> {
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
    throw new Error('Employee repository error');
  }
}

async function findByEmail(email: string): Promise<EmployeeEntity> {
  try {
    const data = await Prisma.employee.findUnique({
      where: {
        email: email,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapEmployeeEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error('Employee repository error');
  }
}

async function create(entity: EmployeeEntity): Promise<EmployeeEntity> {
  try {
    const createData = await Prisma.employee.create({
      data: {
        id: entity.id,
        first_name: entity.firstName,
        last_name: entity.lastName,
        email: entity.email,
        phone_number: entity.phoneNumber,
        image_url: entity.imageUrl,
        created_at: entity.createdAt,
        updated_at: entity.updatedAt,
        id_department: entity.idDepartment,
        id_role: entity.idRole,
      },
    });

    if (!createData) {
      throw new Error('Failed to create employee');
    }

    return entity; // TODO: Check if we need to map this
  } catch (error: unknown) {
    throw new Error('Failed to create employee');
  }
}

export { create, findAll, findByEmail, findById };
