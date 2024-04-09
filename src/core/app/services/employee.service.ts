import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';

async function create(entity: EmployeeEntity): Promise<EmployeeEntity> {
  try {
    const employee = await EmployeeRepository.create(entity);
    return employee;
  } catch (error: unknown) {
    throw new Error('Employee service error');
  }
}

export { create };