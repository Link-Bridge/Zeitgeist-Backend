import { Prisma } from '../../..';
import { RoleEntity } from '../../domain/entities/role.entity';
import { mapRoleEntityFromDbModelToDomainModel } from '../mappers/role-entity-from-db-model.mapper';

async function findById(id: string): Promise<RoleEntity> {
  try {
    const role = await Prisma.role.findUniqueOrThrow({
      where: { id: id },
    });

    if (!role) throw new Error('Role not found');

    return mapRoleEntityFromDbModelToDomainModel(role);
  } catch (error: any) {
    throw new Error(`Role repository error: ${error.message}`);
  }
}

async function findByTitle(title: string): Promise<RoleEntity> {
  try {
    const role = await Prisma.role.findFirstOrThrow({
      where: { title: title },
    });

    if (!role) throw new Error('Role not found');

    return mapRoleEntityFromDbModelToDomainModel(role);
  } catch (error: any) {
    throw new Error(`Role repository error: ${error.message}`);
  }
}

async function findAll(): Promise<RoleEntity[]> {
  try {
    const roles = await Prisma.role.findMany();

    return roles.map(role => mapRoleEntityFromDbModelToDomainModel(role));
  } catch (error: any) {
    throw new Error(`Role repository error: ${error.message}`);
  }
}

export const RoleRepository = { findById, findByTitle, findAll };
