import { randomUUID } from 'crypto';
import { SupportedRoles } from '../../../utils/enums';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';
import { UpdateCompanyBody } from '../interfaces/company.interface';
/**
 * Gets all data from a unique company
 * @returns {Promise<CompanyEntity>} a promise that resolves a unique company entity
 * @throws {Error} if an unexpected error occurs
 */

async function findById(id: string): Promise<CompanyEntity> {
  try {
    const companyRecord = await CompanyRepository.findById(id);
    return companyRecord;
  } catch (error: any) {
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Creates a new company
 * @param {CompanyEntity} company data
 * @returns {String} id from created company
 * @returns {null} if an error occured
 * @throws {Error} if an unexpected error occurs
 */

async function create(company: CompanyEntity): Promise<CompanyEntity | null> {
  try {
    const uuid = randomUUID();
    const date = new Date();
    const res = await CompanyRepository.create(company, uuid, date);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Gets all data from all companies
 * @returns {Promise<CompanyEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findAll(): Promise<CompanyEntity[]> {
  try {
    const companyRecords = await CompanyRepository.findAll();
    return companyRecords;
  } catch (error: any) {
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Update company entity based on id
 * @param {CompanyEntity} company
 * @returns {Promise<CompanyEntity>} a promise that resolves to the updated company entity
 */
async function update(body: UpdateCompanyBody): Promise<CompanyEntity> {
  const company = await CompanyRepository.findById(body.id);

  if (!company) throw new NotFoundError('Company not found');

  return await CompanyRepository.update({
    id: company.id,
    name: body.name ?? company.name,
    email: body.email,
    phoneNumber: body.phoneNumber,
    landlinePhone: body.landlinePhone,
    archived: body.archived,
    constitutionDate: body.constitutionDate,
    rfc: body.rfc,
    taxResidence: body.taxResidence,
    idCompanyDirectContact: company.idCompanyDirectContact,
    idForm: company.idForm,
    createdAt: company.createdAt,
    updatedAt: new Date(),
  });
}

/**
 * @brief Archive a client
 *
 * @param id
 * @returns {Promise<CompanyEntity>}
 */
async function archiveClient(id: string): Promise<CompanyEntity> {
  try {
    const status = await CompanyRepository.getArchivedStatus(id);
    if (status === undefined) {
      throw new Error('Status not found');
    }
    const company = await CompanyRepository.archiveClient(id, status);
    if (!company) {
      throw new Error('Company not found');
    }
    return await CompanyRepository.archiveClient(id, status);
  } catch (error: unknown) {
    throw new Error('An unexpected error occurred');
  }
}

/**
 * @brief Delete a client
 *
 * @param id
 * @param email
 * @returns {Promise<CompanyEntity>}
 */
async function deleteCompanyById(id: string, email: string): Promise<CompanyEntity> {
  try {
    const role = await RoleRepository.findByEmail(email);
    if (!role) {
      throw new Error('Employee not found');
    }

    if (role.title.toUpperCase() !== SupportedRoles.ADMIN.toUpperCase()) {
      throw new Error('Unauthorized Employee');
    } else {
      return await CompanyRepository.deleteCompanyById(id);
    }
  } catch (error: any) {
    if (error.message === 'Employee not found') {
      throw new Error('Employee not found');
    } else if (error.message === 'Company not found') {
      throw new Error('Company not found');
    } else if (error.message === 'Unauthorized Employee') {
      throw new Error('Unauthorized Employee');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export const CompanyService = { findAll, findById, update, create, archiveClient, deleteCompanyById };
