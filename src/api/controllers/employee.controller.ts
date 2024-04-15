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
      firstName: parsedBody.data.firstName,
      lastName: parsedBody.data.lastName,
      email: parsedBody.data.email,
      imageUrl: parsedBody.data.imageUrl || '',
    });

    res.status(201).json({ data: employee });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error ' + error.message });
  }
}

const userExistsSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

const userExists = async (req: Request, res: Response) => {
  try {
    const parsedParams = userExistsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({ message: 'Validation error', errors: parsedParams.error.issues });
    }

    const exists = await EmployeeService.employeeExists({email: parsedParams.data.email});

    res.status(200).json({ data: exists });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error ' + error.message });
  }
};

export const EmployeeController = { createUser, userExists };
