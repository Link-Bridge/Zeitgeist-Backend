import { Decimal } from '@prisma/client/runtime/library';
import { ProjectStatus } from '../../../utils/enums';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';
import { Home } from '../interfaces/home.interface';

/**
 * @brief This function returns homepage info of a user
 *
 * @param idEmployee: string - id of the current user
 *
 * @description Gets a user's projects and clients
 *
 */
async function getMyInfo(idEmployee: string): Promise<Home> {
  try {
    const statusValue = new Map<string, number>([
      [ProjectStatus.CANCELLED, 10],
      [ProjectStatus.DEFAULT, 1],
      [ProjectStatus.DELAYED, 7],
      [ProjectStatus.DONE, 9],
      [ProjectStatus.IN_PROGRESS, 5],
      [ProjectStatus.NOT_STARTED, 2],
      [ProjectStatus.POSTPONED, 8],
      [ProjectStatus.UNDER_REVISION, 6],
      [ProjectStatus.ACCEPTED, 3],
      [ProjectStatus.IN_QUOTATION, 4],
    ]);

    const projects = await ProjectRepository.findAll();
    const employeeTask = await EmployeeTaskRepository.findByEmployeeId(idEmployee);
    const tasks = await TaskRepository.findAll();
    const companies = await CompanyRepository.findAll();

    const projectsIds: string[] = [];
    const companiesIds: string[] = [];
    const homeInfo: Home = { projects: [], companies: [] };

    for (let i = 0; i < tasks.length; i++) {
      const targetTask = employeeTask.find(record => {
        if (record.idTask === tasks[i].id) return record;
      });

      if (targetTask) {
        projectsIds.push(tasks[i].idProject);
      }
    }

    for (let i = 0; i < projects.length; i++) {
      if (projectsIds.includes(projects[i].id)) {
        homeInfo.projects.push(projects[i]);
        companiesIds.push(projects[i].idCompany);
      }
    }

    for (let i = 0; i < companies.length; i++) {
      if (companiesIds.includes(companies[i].id)) {
        homeInfo.companies.push(companies[i]);
      }
    }

    homeInfo.companies.map(company => {
      company.chargeableHours = new Decimal(0);

      homeInfo.projects.forEach(project => {
        if (project.idCompany == company.id && project.isChargeable && project.totalHours) {
          company.chargeableHours = company.chargeableHours!.add(new Decimal(project.totalHours.toString()));
        }
      });
    });

    homeInfo.projects.sort((a, b) =>
      (statusValue.get(a.status) || 10) < (statusValue.get(b.status) || 10)
        ? -1
        : (statusValue.get(a.status) || 10) > (statusValue.get(b.status) || 10)
          ? 1
          : 0
    );
    return homeInfo;
  } catch (error: unknown) {
    throw new Error('An unexpected error occurred');
  }
}

export const HomeService = { getMyInfo };
