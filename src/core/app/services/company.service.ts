import { Decimal } from '@prisma/client/runtime/library';
import { SupportedDepartments } from '../../../utils/enums';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';

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
 * Gets all data from all companies
 * @returns {Promise<CompanyEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findAll(): Promise<CompanyEntity[]> {
  try {
    const companyRecords = await CompanyRepository.findAll();
    const projectRecords = await ProjectRepository.findAll();

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
    throw new Error('an unexpected error occurred');
  }
}

export const CompanyService = { findById, findAll };
