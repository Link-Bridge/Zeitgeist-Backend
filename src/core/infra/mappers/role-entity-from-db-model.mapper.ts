import { role } from '@prisma/client';
import { SupportedRoles } from '../../../utils/enums';
import { RoleEntity } from '../../domain/entities/role.entity';

function supportedRoleFromString(maybeRole: string): SupportedRoles {
  if (maybeRole.toUpperCase() === SupportedRoles.WITHOUT_ROLE.toUpperCase()) {
    return SupportedRoles.WITHOUT_ROLE;
  }

  if (maybeRole.toUpperCase() === SupportedRoles.ADMIN.toUpperCase()) {
    return SupportedRoles.ADMIN;
  }

  if (maybeRole.toUpperCase() === SupportedRoles.LEGAL.toUpperCase()) {
    return SupportedRoles.LEGAL;
  }

  if (maybeRole.toUpperCase() === SupportedRoles.ACCOUNTING.toUpperCase()) {
    return SupportedRoles.ACCOUNTING;
  }

  throw new Error(`Unsupported role: ${maybeRole}`);
}

export function mapRoleEntityFromDbModelToDbModel(role: role): RoleEntity {
  return {
    id: role.id,
    title: supportedRoleFromString(role.title),
    createdAt: role.created_at,
    updatedAt: role.updated_at,
  };
}
