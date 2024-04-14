import { Request, Response } from 'express';
import { EmployeeService } from '../../core/app/services/employee.service';

/**
 * Creates a new employee
 * @param req 
 * @param res 
 * @returns Employee entity
 */
async function createUser(req: Request, res: Response) {
  try {
    if (!req.body || !req.body.email) {
      return res.status(401).json({ message: 'Invalid User input' });
    }

    const employee = await EmployeeService.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl,
    });

    res.status(201).json({ data: employee });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error ' + error.message });
  }
}

export const EmployeeController = { createUser };
