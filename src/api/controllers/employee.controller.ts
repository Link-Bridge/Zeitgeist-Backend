import { Request, Response } from 'express';
import { z } from 'zod';
import { EmployeeService } from '../../core/app/services/employee.service';

const createEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: 'First name cannot be empty' }),
  lastName: z.string().min(1, { message: 'Last name cannot be empty' }),
  email: z.string().email({ message: 'Invalid email format' }),
  imageUrl: z.string().url().optional(),
});

/**
 * Creates a new employee
 * @param req
 * @param res
 * @returns Employee entity
 */
async function createUser(req: Request, res: Response) {
  try {
    const parsedBody = createEmployeeSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: 'Validation error', errros: parsedBody.error.issues });
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
