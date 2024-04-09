import { EmployeeEntity } from '../../domain/entities/employee.entity';
import { RoleEntity } from '../../domain/entities/role.entity';
import {EmployeeRepository} from "../../infra/repositories/employee.repository";

async function updateUserRol(userId: string, roleId: string): Promise<void> {
    try {
        // Check if user exists
        const data: EmployeeEntity = await EmployeeRepository.findById(userId);
        
        // Check if role exists
        
        
        // Update User role

    } catch (error: any) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export { updateUserRol };