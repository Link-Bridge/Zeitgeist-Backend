import { Decimal } from '@prisma/client/runtime/library';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
/**
 * Gets all data from all companies
 * @returns {Promise<CompanyEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function getAll(): Promise<CompanyEntity[]> {
  try {
    const companyRecords = await CompanyRepository.findAll();
    const projectRecords = await ProjectRepository.findAll()
    
    companyRecords.map((company) => {
      projectRecords.forEach((project) => {
        
        if (project.idCompany == company.id) 
          company.totalProjects = company.totalProjects ? company.totalProjects + 1 : 1
        
        if (project.idCompany == company.id && project.isChargeable) {
          if (project.area == "Legal" && project.totalHours) {

            const projectHours = parseFloat(project.totalHours?.toString() || "0");
            const companyHours = new Decimal(company.legalHours?.toString() || "0");
            const chargeableHours = new Decimal(company.chargeableHours?.toString() || "0");

            // Perform addition if both values are valid numbers
            if (!isNaN(projectHours) && !isNaN(companyHours.toNumber()) && !isNaN(chargeableHours.toNumber())) {
              company.legalHours = companyHours.add(projectHours);
              company.chargeableHours = chargeableHours.add(projectHours)
            }
          }

          if (project.area == "Accounting" && project.totalHours) {

            const projectHours = parseFloat(project.totalHours?.toString() || "0");
            const companyHours = new Decimal(company.accountingHours?.toString() || "0");
            const chargeableHours = new Decimal(company.chargeableHours?.toString() || "0");

            // Perform addition if both values are valid numbers
            if (!isNaN(projectHours) && !isNaN(companyHours.toNumber()) && !isNaN(chargeableHours.toNumber())) {
              company.accountingHours = companyHours.add(projectHours);
              company.chargeableHours = chargeableHours.add(projectHours)
            }
          }

        }
      })
    })

    console.log(companyRecords)

    return companyRecords;
  } catch (error: any) {
    console.log(error)
    throw new Error('an unexpected error occurred');
  }
}

export const CompanyService = { getAll };
