import { Prisma } from '../../..';
import { RoleEntity } from '../../domain/entities/role.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapRoleEntityFromDbModel } from '../mappers/role-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Role';

async function findById(id: string): Promise<RoleEntity> {
    try {
        const data = await Prisma.role.findUnique({
            where: {
                id: id,
            },
        });

        if (!data) {
            throw new NotFoundError(RESOURCE_NAME);
        }

        return mapRoleEntityFromDbModel(data);
    } catch (error: unknown) {
        throw new Error('Role repository error');
    }
}

export const RoleRepository = { findById };