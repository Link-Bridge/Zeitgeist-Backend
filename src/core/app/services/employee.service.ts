import { randomUUID } from 'crypto';
import { SupportedRoles } from '../../../utils/enums';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';
import { CreateEmployee, EmployeeExistsByEmail } from '../interfaces/employee.interface';

async function employeeExists(body: EmployeeExistsByEmail): Promise<boolean> {
  const user = await EmployeeRepository.existByEmail(body.email);
  return !!user;
}

async function create(body: CreateEmployee): Promise<EmployeeEntity> {
  const role = await RoleRepository.findByTitle(SupportedRoles.SIN_ROL);
  if (!role) {
    throw new NotFoundError(`Role ${SupportedRoles.SIN_ROL} not found`);
  }

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
}

export const EmployeeService = { create, employeeExists };
