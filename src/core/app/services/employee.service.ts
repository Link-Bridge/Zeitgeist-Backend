import { randomUUID } from 'crypto';
import { EmployeeRequestBody } from '../../../api/controllers/body/auth.body';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';

async function create(body: EmployeeRequestBody): Promise<EmployeeEntity> {
  try {
    const idDepartment = '42ac048a-8bb0-4984-8145-be37312cbc35';
    const idRole = '1d3a37f2-14de-4d3e-bc98-3b8a028599a1';
    // Necesitamos Id Rol Y Id Departamento
    const employee = await EmployeeRepository.create({
      id: randomUUID(),
      name: body.name,
      email: body.email,
      imageUrl: body.picture,
      idRole: idRole,
      idDepartment: idDepartment,
      createdAt: new Date(),
    });
    return employee;
  } catch (error: unknown) {
    throw new Error('Employee service error');
  }
}

export const EmployeeService = { create };
