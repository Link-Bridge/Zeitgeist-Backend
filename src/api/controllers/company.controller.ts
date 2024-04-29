import { Request, Response } from 'express';
import { z } from 'zod';
import { CompanyService } from '../../core/app/services/company.service';

const reportSchema = z.object({
  id: z.string().uuid().min(1, { message: 'clientId cannot be empty' }),
});

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Promise<void>}
 *
 * @throws {Error}
 */

async function getUnique(req: Request, res: Response) {
  try {
    const { id } = reportSchema.parse({ id: req.params.id });

    const data = await CompanyService.findById(id);
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await CompanyService.findAll();
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * A function that calls the company service to get a company given its id.
 * @param req an HTTP Request containing the id in its params
 * @param res an HTTP response
 */
async function getById(req: Request, res: Response) {
  try {
    const id = z.string().uuid({ message: 'Invalid UUID' }).parse(req.params.id);
    const data = await CompanyService.findById(id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const CompanyController = { getAll, getById, getUnique };
