import { Request, Response } from 'express';
import { EmployeeService } from '../../core/app/services/employee.service';

async function createUser(req: Request, res: Response) {
  try {
    if (!req.employee || !req.employee.email) {
      return res.status(401).json({ message: 'User is not authorize' });
    }
    req.body = req.employee;
    const employee = await EmployeeService.create(req.body);

    res.status(201).json({ data: employee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const EmployeeController = { createUser };
