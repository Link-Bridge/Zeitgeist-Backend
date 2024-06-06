import { Request, Response } from 'express';
import { z } from 'zod';
import { CompanyService } from '../../core/app/services/company.service';
import { CompanyEntity } from '../../core/domain/entities/company.entity';
import { companySchema, updateCompanySchema } from '../validators/company.validator';

const idSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Retrieves a unique company by its ID.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while retrieving the company.
 */

async function getUnique(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });

    const data = await CompanyService.findById(id);
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Updates a client with the provided data.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while updating the client.
 */

async function updateClient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const validSchema = updateCompanySchema.parse(req.body);
    const updatedCompany = await CompanyService.update({ ...validSchema, id });

    res.status(200).json(updatedCompany);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(500).json({ error: error.errors[0].message });
    } else res.status(500).json({ error: error.message });
  }
}

/**
 * Retrieves all companies from the database.
 *
 * @param _ - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while retrieving the companies.
 */

async function getAll(_: Request, res: Response) {
  try {
    const data = await CompanyService.findAll();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Creates a company in the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while creating the company.
 */

async function create(req: Request, res: Response) {
  try {
    const company: CompanyEntity = req.body;
    if (!company) throw new Error('Missing company data in body');

    companySchema.parse(company);

    const data = await CompanyService.create(company);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(500).json({ error: error.errors[0].message });
    } else res.status(500).json({ error: error.message });
  }
}

/**
 * Retrieves all companies that are not archived.
 *
 * @param _ - The request object.
 * @param res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs while retrieving the companies.
 */

async function getUnarchived(_: Request, res: Response) {
  try {
    const data = await CompanyService.findUnarchived();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


/**
 * Finds deleteCompany
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @throws {Error}
 */

async function deleteCompany(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    await CompanyService.deleteCompanyById(id);
    res.status(200).send();
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}
export const CompanyController = { getUnique, getAll, create, updateClient, getUnarchived, deleteCompany };
