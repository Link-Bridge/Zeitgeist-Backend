import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';

async function updateUserRole(userId: string, roleId: string): Promise<EmployeeEntity> {
  try {
    // Update User role
    return await EmployeeRepository.updateRoleById(userId, roleId);
  } catch (error: any) {
    console.error('Error: ', error);
    throw new Error('An unexpected error occurred');
  }
}

export { updateUserRole };
