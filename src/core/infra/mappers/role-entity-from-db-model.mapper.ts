import { role } from '@prisma/client';
import { SupportedRoles } from '../../../utils/enums';
import { RoleEntity } from '../../domain/entities/role.entity';

export function mapRoleEntityFromDbModelToDbModel(role: role): RoleEntity {
  return {
    id: role.id,
    title: role.title as SupportedRoles,
    createdAt: role.created_at,
    updatedAt: role.updated_at,
  };
}
