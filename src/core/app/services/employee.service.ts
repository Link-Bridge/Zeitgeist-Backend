import { randomUUID } from 'crypto';
import { SupportedDepartments, SupportedRoles } from '../../../utils/enums';
import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { DepartmentRepository } from '../../infra/repositories/department.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';
import { SignInUserResponse } from '../interfaces/employee.interface';

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
export interface SignIn {
  email: string;
  fullName: string;
  imageUrl: string;
}

/**
 * Function to create new Employee with Without Role and Without Department
 * 
 * @param email 
 * @param fullName 
 * @param imageUrl 
 * @returns {EmployeeEntity}
 */
async function createNewEmployee(email: string, fullName: string, imageUrl: string): Promise<EmployeeEntity> {
  const role = await RoleRepository.findByTitle(SupportedRoles.WITHOUT_ROLE);
  if (!role) {
    throw new NotFoundError(`Role '${SupportedRoles.WITHOUT_ROLE}' not found`);
  }
  const department = await DepartmentRepository.findByTitle(SupportedDepartments.WITHOUT_DEPARTMENT);
  if (!department) {
    throw new NotFoundError(`Department '${SupportedDepartments.WITHOUT_DEPARTMENT}' not found`);
  }

  const [firstName, lastName] = parseName(fullName);
  return await EmployeeRepository.create({
    id: randomUUID(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    imageUrl: imageUrl,
    idRole: role.id,
    idDepartment: department.id,
    createdAt: new Date(),
  });
}

/**
 * Function to handle sing in. If the user is not found, it will create a new one with the provided data.
 * If the user is found, it will return the user data.
 * 
 * @param body 
 * @returns {SignInUserResponse}
 */
async function signIn(body: SignIn): Promise<SignInUserResponse> {
  let employee = await EmployeeRepository.findByEmail(body.email);
  if (!employee) {
    employee = await createNewEmployee(body.email, body.fullName, body.imageUrl);
    const role = await RoleRepository.findById(employee.idRole);
    return { employee, role: role.title, department: SupportedDepartments.WITHOUT_DEPARTMENT };
  }

  const role = await RoleRepository.findById(employee.idRole);
  if (!role) {
    throw new NotFoundError(`Role not found for employee '${employee.id}'`);
  }

  const department = await DepartmentRepository.findById(employee.idDepartment ?? '');
  if (!department) {
    return { employee, role: role.title, department: SupportedDepartments.WITHOUT_DEPARTMENT };
  }

  if (!department) {
    throw new NotFoundError(`Department not found for employee '${employee.id}'`);
  }

  return { employee, role: role.title, department: department.title };
}

/**
 * Function to get all employees
 *
 * @returns Promise<EmployeeEntity[]>
 */
async function getAllEmployees(): Promise<EmployeeEntity[]> {
  return await EmployeeRepository.findAll();
}

export const EmployeeService = { signIn, getAllEmployees };
