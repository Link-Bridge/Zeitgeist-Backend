import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapCompanyEntityFromDbModel } from '../mappers/company-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Company';

/**
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<CompanyEntity[]>} a promise taht resolves to an array of company entities
 */

async function findAll(): Promise<CompanyEntity[]> {
  const data = await Prisma.company.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return data.map(mapCompanyEntityFromDbModel);
}

/**
 * Creates a new company in the database
 * @version 1.0.0
 * @param {CompanyEntity} company data
 * @returns {String} id from created company
 * @returns {null} if an error occured
 */

async function create(company: CompanyEntity): Promise<string | null> {
  const res = await Prisma.company.create({
    data: {
      id: randomUUID(),
      name: company.name,
      email: company.email,
      phone_number: company.phoneNumber,
      landline_phone: company.landlinePhone,
      archived: false,
      id_company_direct_contact: company.idCompanyDirectContact,
      id_form: company.idForm,
      created_at: new Date(),
      updated_at: null,
    },
  });
  return res.id
}

async function findById(id: string): Promise<CompanyEntity> {
  try {
    let data = await Prisma.company.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapCompanyEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

export const CompanyRepository = { create, findAll, findById };