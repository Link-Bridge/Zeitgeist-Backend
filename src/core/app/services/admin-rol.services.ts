import { EmployeeRepository } from "../../infra/repositories/employee.repository";

async function updateUserRol(userId: string, roleId: string): Promise<void> {
    try {
        // Update User role
        await EmployeeRepository.updateRoleById(userId, roleId);

    } catch (error: any) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export { updateUserRol };