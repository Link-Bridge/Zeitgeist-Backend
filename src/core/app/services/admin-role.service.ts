import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';

// Async function to update the role of a user
async function updateUserRole(userId: string, roleId: string): Promise<EmployeeEntity> {
  try {
    return await EmployeeRepository.updateRoleById(userId, roleId);
  } catch (error: any) {
    throw new Error('An unexpected error occurred');
  }
}

/**
 * @description Get all roles
 * @return Role
 */
async function getAllRoles(): Promise<RoleEntity[]> {
  try {
    return await RoleRepository.findAll();
  } catch (error: any) {
    throw new Error('An unexpected error occurred');
  }
}

export { getAllRoles, updateUserRole };
