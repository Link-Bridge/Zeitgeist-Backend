import { EmployeeEntity } from '../../domain/entities/employee.entity';

export interface SignInUserResponse {
  employee: EmployeeEntity;
  role: string;
  department: string;
}
