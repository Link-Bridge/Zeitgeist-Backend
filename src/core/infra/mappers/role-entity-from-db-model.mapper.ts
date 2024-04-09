import { role } from '@prisma/client';
import { RoleEntity } from '../../domain/entities/role.entity';

export function mapRoleEntityFromDbModel(model: role): RoleEntity {
    return {
        id: model.id,
        title: model.title,
        createdAt: model.created_at,
        updateAt: model.updated_at ? model.updated_at : undefined
    };
}