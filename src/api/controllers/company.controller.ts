import { Request, Response } from 'express';
import { z } from 'zod';
import { CompanyService } from '../../core/app/services/company.service';

const reportSchema = z.object({
  id: z.string().min(1, { message: 'clientId cannot be empty' }),
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

export const CompanyController = { getUnique, getAll };
