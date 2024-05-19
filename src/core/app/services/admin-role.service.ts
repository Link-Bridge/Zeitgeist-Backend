import { SupportedDepartments, SupportedRoles } from '../../../utils/enums';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { DepartmentRepository } from '../../infra/repositories/department.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';

/**
 * Updates the role of an employee with the given user ID
 *
 * @param userId: string - The ID of the user to update
 * @param roleId: string - The ID of the role to update
 * @param departmentId: string - The ID of the department to update
 *
 * @returns EmployeeEntity - The updated employee
 *
 * @throws Error - If the department is not found
 */
async function updateUserRole(userId: string, roleId: string): Promise<EmployeeEntity> {
  try {
    const role = await RoleRepository.findById(roleId);
    let departmentId = '';

    switch (role.title) {
      case SupportedRoles.ADMIN:
        departmentId = (await DepartmentRepository.findByTitle(SupportedDepartments.WITHOUT_DEPARTMENT))?.id;
        break;
      case SupportedRoles.LEGAL:
        departmentId = (await DepartmentRepository.findByTitle(SupportedDepartments.LEGAL))?.id;
        break;
      case SupportedRoles.ACCOUNTING:
        departmentId = (await DepartmentRepository.findByTitle(SupportedDepartments.ACCOUNTING))?.id;
        break;
      default:
        departmentId = (await DepartmentRepository.findByTitle(SupportedDepartments.WITHOUT_DEPARTMENT))?.id;
    }

    const data = await EmployeeRepository.updateRoleById(userId, roleId);
    const department = await DepartmentRepository.updateDepartmentByEmployeeId(userId, departmentId);

    if (!department) {
      throw new NotFoundError('Department');
    }

    return data;
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

export const AdminRoleService = { getAllRoles, updateUserRole };
