import { Prisma } from '../../..';
import { CompanyEntity } from '../../domain/entities/company.entity';

/**
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<CompanyEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
 */

async function findAll(): Promise<CompanyEntity[]> {
  return await Prisma.company.findMany();
}

export const CompanyRepository = { findAll };
