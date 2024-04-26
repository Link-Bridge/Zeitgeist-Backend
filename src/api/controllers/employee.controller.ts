import { Request, Response } from 'express';
import * as z from 'zod';
import { EmployeeService } from '../../core/app/services/employee.service';
import { NotFoundError } from '../../core/errors/not-found.error';

const authSchema = z.object({
  auth: z.object({
    name: z
      .string()
      .min(1, { message: "Provided name can't be empty" })
      .max(255, { message: 'Provided name must be less than 256 characters' }),
    email: z.string().email({ message: 'Provided email is not valid' }),
    picture: z.string().url({ message: 'Provided picture URL is not valid' }),
  }),
});

/**
 * Function to call the signIn service method, which will create a new employee if not exists
 *
 * @param req
 * @param res
 */
async function signIn(req: Request, res: Response) {
  try {
    const parsed = authSchema.parse(req.body);

    const employee = await EmployeeService.signIn({
      fullName: parsed.auth.name,
      email: parsed.auth.email,
      imageUrl: parsed.auth.picture,
    });
    res.status(201).json({ data: employee });
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: 'Employee not found for the provided email.' });
    } else {
      res.status(500).json({ message: 'Internal server error occurred.' });
    }
  }
}

/**
 * Controller to get all employees
 *
 * @param req
 * @param res
 */
async function getAllEmployees(req: Request, res: Response) {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).json({ data: employees });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}

/**
 * Controller to find an employee by name
 *
 * @param req
 * @param res
 *
 * @returns res.status(200).json({ data: employee }) - The employee found.
 * @returns res.status(404).json({ message }) - If the employee is not found.
 * @returns res.status(500).json({ message }) - If an error occurs.
 */
async function findEmployeeByName(req: Request, res: Response) {
  try {
    const employee = await EmployeeService.findEmployeeByName(req.params.name);
    res.status(200).json({ data: employee });
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: 'Employee not found for the provided name.' });
    } else {
      res.status(500).json({ message: 'Internal server error occurred.' });
    }
  }
}

export const EmployeeController = { userExists: signIn, getAllEmployees, findEmployeeByName };
