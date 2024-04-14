import { EmployeeEntity } from "../../domain/entities/employee.entity";
import { EmployeeRepository } from "../../infra/repositories/employee.repository";

async function deleteEmployeeById(id: string): Promise<EmployeeEntity> {
    try {
        const employee = await EmployeeRepository.findEmployeeById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }

        return await EmployeeRepository.deleteEmployeeById(id);
    } catch (error: unknown) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export const EmployeeService = { deleteEmployeeById };