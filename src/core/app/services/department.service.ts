import { DepartmentEntity } from '../../domain/entities/department.entity';
import { DepartmentRepository } from '../../infra/repositories/department.repository';

/**
 * Gets all the departments from the database
 *
 * @returns
 */
async function getAllDepartments(): Promise<DepartmentEntity[]> {
  try {
    const departments = await DepartmentRepository.findAll();
    return departments;
  } catch (error: unknown) {
    throw new Error(`Department service error: ${error}`);
  }
}

async function updateDepartmentByEmployeeId(employeeId: string, departmentId: string): Promise<DepartmentEntity> {
  try {
    const department = await DepartmentRepository.updateDepartmentByEmployeeId(employeeId, departmentId);
    return department;
  } catch (error: unknown) {
    throw new Error(`Department service error: ${error}`);
  }
}

export const DepartmentService = { getAllDepartments, updateDepartmentByEmployeeId };
