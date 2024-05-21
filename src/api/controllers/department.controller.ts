import { Request, Response } from 'express';
import { DepartmentService } from '../../core/app/services/department.service';
import { NotFoundError } from '../../core/errors/not-found.error';

/**
 * Finds a department by its title and returns the information
 *
 * @param req: Request - The request object
 * @param res: Response - The response object
 *
 * @returns res.status(200) - The department information
 * @returns res.status(404) - Department not found for the provided title
 * @returns res.status(500) - Internal server error occurred
 */
async function getAllDepartments(_: Request, res: Response) {
  try {
    const department = await DepartmentService.getAllDepartments();
    res.status(200).json({ data: department });
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: 'Department not found for the provided title.' });
    } else {
      res.status(500).json({ message: 'Internal server error occurred.' });
    }
  }
}

export const DeparmentController = { getAllDepartments };
