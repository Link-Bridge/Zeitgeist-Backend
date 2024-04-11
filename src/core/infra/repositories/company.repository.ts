import { Prisma } from '../../..';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { mapCompanyEntityFromDbModel } from '../mappers/company-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Company info';

/**
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<CompanyEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
 */

async function findAll(): Promise<CompanyEntity[]> {
  const data = await Prisma.company.findMany();
  return data.map(mapCompanyEntityFromDbModel);
}

export const CompanyRepository = { findAll };
