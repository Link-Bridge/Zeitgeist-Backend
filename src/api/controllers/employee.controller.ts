import { Request, Response } from "express";
import { EmployeeService } from "../../core/app/services/employee.services";

async function deleteEmployee(req: Request, res: Response) {
    try {
        const employee = await EmployeeService.deleteEmployeeById(req.params.id);
        res.status(200).json({ data: employee });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const EmployeeController = { deleteEmployee };