import { Request, Response } from 'express';
import { z } from 'zod';
import { CompanyService } from '../../core/app/services/company.service';
import {
  zodValidCreatedAtDate,
  zodValidEmail,
  zodValidPhoneNumber,
  zodValidString,
  zodValidUpdatedAtDate,
  zodValidUuid,
} from '../validators/zod.validators';

/**
 * @param {Request} req
 * @param {Response} res
 *
 * @returns {Promise<void>}
 *
 * @throws {Error}
 */

async function getAll(res: Response) {
  try {
    const data = await CompanyService.findAll();
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

const updateCompanySchema = z.object({
  company: z.object({
    id: zodValidUuid,
    name: zodValidString,
    email: zodValidEmail,
    phoneNumber: zodValidPhoneNumber,
    landlinePhone: zodValidPhoneNumber,
    archived: z.boolean(),
    idCompanyDirectContact: zodValidUuid.nullable(),
    idForm: zodValidUuid.nullable(),
    createdAt: zodValidCreatedAtDate,
    updatedAt: zodValidUpdatedAtDate,
  }),
});

/**
 * Receives a request to update a client and validates de data before sending it to the service
 * @param req
 * @param res
 */
export function updateClient(req: Request, res: Response) {
  try {
    const { company } = updateCompanySchema.parse(req.body);
    const updatedCompany = CompanyService.update(company);

    res.status(200).json({ data: updatedCompany });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const CompanyController = { getAll, updateClient };
