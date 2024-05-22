import { NotFoundError } from '../../errors/not-found.error';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';
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
    const employee = await EmployeeRepository.findById(idEmployee);
    if (!employee) throw new NotFoundError('Employee');

    const role = await RoleRepository.findById(employee.idRole);
    const projects = await ProjectRepository.findAllByRole(role.title);
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

    return homeInfo;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
}

export const HomeService = { getMyInfo };
