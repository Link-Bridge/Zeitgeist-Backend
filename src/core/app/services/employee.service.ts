import { randomUUID } from 'crypto';
import { SupportedRoles } from '../../../utils/enums';
import { NotFoundError } from '../../errors/not-found.error';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';

function parseName(displayName: string) {
  const nameParts = displayName.trim().split(/\s+/);
  let firstName, lastName;

  if (nameParts.length === 2) {
    [firstName, lastName] = nameParts;
  } else if (nameParts.length === 3) {
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(' ');
  } else if (nameParts.length >= 4) {
    firstName = nameParts.slice(0, 2).join(' ');
    lastName = nameParts.slice(2).join(' ');
  } else {
    firstName = displayName;
    lastName = '';
  }

  return [firstName, lastName];
}

interface SignIn {
  email: string;
  fullName: string;
  imageUrl: string;
}

async function signIn(body: SignIn) {
  const role = await RoleRepository.findByTitle(SupportedRoles.SIN_ROL);
  if (!role) {
    throw new NotFoundError(`Role '${SupportedRoles.SIN_ROL}' not found`);
  }

  const employee = await EmployeeRepository.findByEmail(body.email);
  if (!employee) {
    const [firstName, lastName] = parseName(body.fullName);
    const newEmployee = {
      id: randomUUID(),
      firstName: firstName,
      lastName: lastName,
      email: body.email,
      imageUrl: body.imageUrl,
      idRole: role.id,
      createdAt: new Date(),
    };

    const createdEmployee = await EmployeeRepository.create(newEmployee);
    return createdEmployee;
  }
  return employee;
}

export const EmployeeService = { signIn };
