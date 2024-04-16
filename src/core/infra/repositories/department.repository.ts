import { Prisma } from '../../..';
import { DepartmentEntity } from '../../domain/entities/department.entity';
import { mapDepartmentEntityFromDbModelToDbModel } from '../mappers/department-entity-from-db-model.mapper';

async function findById(id: string): Promise<DepartmentEntity> {
  try {
    const department = await Prisma.department.findUniqueOrThrow({
      where: { id: id },
    });

    if (!department) throw new Error('Department not found');

    return mapDepartmentEntityFromDbModelToDbModel(department);
  } catch (error: any) {
    throw new Error(`Department repository error: ${error.message}`);
  }
}

async function findByTitle(title: string): Promise<DepartmentEntity> {
  try {
    const department = await Prisma.department.findFirstOrThrow({
      where: { title: title },
    });

    if (!department) throw new Error('Department not found');

    return mapDepartmentEntityFromDbModelToDbModel(department);
  } catch (error: any) {
    throw new Error(`Department repository error: ${error.message}`);
  }
}

async function findAll(): Promise<DepartmentEntity[]> {
  try {
    const departments = await Prisma.department.findMany();

    return departments.map(mapDepartmentEntityFromDbModelToDbModel);
  } catch (error: any) {
    throw new Error(`Department repository error: ${error.message}`);
  }
}

export const DepartmentRepository = { findById, findByTitle, findAll };
