import { department } from '@prisma/client';
import { SupportedDepartments } from '../../../utils/enums';
import { DepartmentEntity } from '../../domain/entities/department.entity';

export function mapDepartmentEntityFromDbModelToDbModel(department: department): DepartmentEntity {
  return {
    id: department.id,
    title: department.title as SupportedDepartments,
    createdAt: department.created_at,
    updatedAt: department.updated_at,
  };
}
