import { randomUUID } from 'crypto';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { CreateEmployee, EmployeeExistsByEmail } from '../interfaces/employee.interface';
import { RoleRepository } from '../../infra/repositories/role.repository';
import { SupportedRoles } from '../../../utils/enums';

async function employeeExists(body: EmployeeExistsByEmail): Promise<boolean> {
  try {
    const user = await EmployeeRepository.existByEmail(body.email);
    return !!user;
  } catch (error: unknown) {
    throw new Error('Employee service error');
  }
}

async function create(body: CreateEmployee): Promise<EmployeeEntity> {
  try {
    const role = await RoleRepository.findByTitle(SupportedRoles.SIN_ROL);

    const exists = await EmployeeRepository.findByEmail(body.email);
    if (exists) {
      return exists;
    }

    const employee = await EmployeeRepository.create({
      id: randomUUID(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      imageUrl: body.imageUrl,
      idRole: role.id,
      createdAt: new Date(),
    });

    return employee;
  } catch (error: unknown) {
    throw new Error('Employee service error');
  }
}

export const EmployeeService = { create, employeeExists };
