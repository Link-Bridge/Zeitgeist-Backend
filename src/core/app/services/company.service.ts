import { Decimal } from '@prisma/client/runtime/library';
import { SupportedDepartments } from '../../../utils/enums';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { UpdateCompanyBody } from '../interfaces/company.interface';
/**
 * Gets all data from all companies
 * @returns {Promise<CompanyEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findAll(): Promise<CompanyEntity[]> {
  try {
    const projectRecords = await ProjectRepository.findAll();
    const companyRecords = await CompanyRepository.findAll();

    if (!companyRecords || !projectRecords) throw new Error('No companies or projects found');

    companyRecords.map(company => {
      company.totalProjects ??= 0;
      company.accountingHours ??= new Decimal(0);
      company.legalHours ??= new Decimal(0);
      company.chargeableHours ??= new Decimal(0);

      projectRecords.forEach(project => {
        if (project.idCompany == company.id)
          // Add to total projects
          company.totalProjects! += 1;

        if (project.idCompany == company.id && project.isChargeable && project.totalHours) {
          // Add to legal hours
          if (project.area == SupportedDepartments.LEGAL)
            company.legalHours = company.legalHours!.add(new Decimal(project.totalHours.toString()));
          // Add to accounting hours
          if (project.area == SupportedDepartments.CONTABLE)
            company.accountingHours = company.accountingHours!.add(new Decimal(project.totalHours.toString()));
        }
      });

      // Add to chargeable hours
      company.chargeableHours = company.chargeableHours.add(company.legalHours).add(company.accountingHours);
    });

    return companyRecords;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

/**
 * Update company entity based on id
 * @param {CompanyEntity} company
 * @returns {Promise<CompanyEntity>} a promise that resolves to the updated company entity
 */
async function update(body: UpdateCompanyBody): Promise<CompanyEntity> {
  const company = await CompanyRepository.findById(body.id);

  if (!company) throw new Error('Company not found');

  return await CompanyRepository.update({
    id: company.id,
    name: body.name,
    email: body.email,
    phoneNumber: body.phoneNumber,
    landlinePhone: body.landlinePhone,
    archived: body.archived,
    idCompanyDirectContact: company.idCompanyDirectContact,
    idForm: company.idForm,
    createdAt: company.createdAt,
    updatedAt: new Date(),
  });
}

export const CompanyService = { findAll, update };
