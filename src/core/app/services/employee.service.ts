import { randomUUID } from 'crypto';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { CreateEmployee, EmployeeExistsByEmail } from '../interfaces/employee.interface';

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
      idRole: '1d3a37f2-14de-4d3e-bc98-3b8a028599a1', // Deprecated role ID
      idDepartment: '42ac048a-8bb0-4984-8145-be37312cbc35', // Deprecated department ID
      createdAt: new Date(),
    });

    return employee;
  } catch (error: unknown) {
    throw new Error('Employee service error');
  }
}

export const EmployeeService = { create, employeeExists };
