import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../infra/repositories/company.repository';
/**
 * Gets all data from all companies
 * @returns {Promise<CompanyEntity[]>} a promise taht resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function getAll(): Promise<CompanyEntity[]> {
  try {
    const companyRecords = await CompanyRepository.findAll();
    return companyRecords;
  } catch (error: any) {
    console.log(error)
    throw new Error('an unexpected error occurred');
  }
}

export const CompanyService = { getAll };
