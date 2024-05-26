import { randomUUID } from 'crypto';
import { ProjectStatus, SupportedRoles } from '../../../utils/enums';
import { isAuthorized } from '../../../utils/is-authorize-deparment';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { CompanyRepository } from '../../infra/repositories/company.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';
import { CreateProjectData, UpdateProjectBody } from '../interfaces/project.interface';
import { EmployeeService } from './employee.service';

/**
 * @description Validates that a start date should be before than an end date
 * @param {Date} start Start date
 * @param {Date} end End date
 * @returns {boolean} If dates are valid
 */
const areDatesValid = (start: Date, end: Date): boolean => {
  return new Date(start).getTime() <= new Date(end).getTime();
};

/**
 * A function that calls the repository to create a project in the database
 * @param data The data required to create a project in the database
 * @returns The entity created
 */
async function createProject(data: CreateProjectData): Promise<ProjectEntity | string> {
  try {
    const company = await CompanyRepository.findById(data.idCompany);
    if (company.archived) throw new Error('Cannot create projects for archived companies');
    if (data.endDate !== null && !areDatesValid(data.startDate, data.endDate)) {
      throw new Error('Start date must be before end date');
    }

    const newProject = await ProjectRepository.createProject({
      id: randomUUID(),
      name: data.name,
      matter: data.matter ? data.matter : undefined,
      description: data.description ? data.description : undefined,
      area: data.area,
      status: data.status,
      category: data.category,
      endDate: data.endDate,
      idCompany: data.idCompany,
      isChargeable: data.isChargeable,
      periodicity: data.periodicity,
      startDate: data.startDate,
      createdAt: new Date(),
    });

    return newProject;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Retrieves all project from a certain role given an email
 * @param email the email from the requester
 * @returns the projects only from a specific role
 */
async function getDepartmentProjects(email: string): Promise<ProjectEntity[]> {
  try {
    const role = await EmployeeService.findRoleByEmail(email);
    return await ProjectRepository.findAllByRole(role);
  } catch (error) {
    throw new Error('An unexpected error occured');
  }
}

/**
 * Gets all projects from a single company
 * @returns {Promise<ProjectEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findProjectsClient(clientId: string, email: string): Promise<ProjectEntity[]> {
  try {
    const projects = await ProjectRepository.findProjetsByClientId(clientId);
    const role = await RoleRepository.findByEmail(email);

    let sortedProjects = projects.sort((a, b) => {
      if (a.status === ProjectStatus.DONE && b.status !== ProjectStatus.DONE) return 1;
      if (a.status !== ProjectStatus.DONE && b.status === ProjectStatus.DONE) return -1;
      return 0;
    });
    if (role.title !== SupportedRoles.ADMIN) {
      sortedProjects = sortedProjects.filter(project => project.area === role.title);
    }

    return sortedProjects;
  } catch (error) {
    throw new Error('An unexpected error occured');
  }
}

/**
 *
 * @param projectId the id of the proyect we want the details
 * @param email the email of the user
 * @returns {Promise<ProjectEntity>} a promise that resolves the details of the project
 * @throws {Error} if an unexpected error occurs
 */

async function getProjectById(projectId: string, email: string): Promise<ProjectEntity> {
  try {
    const role = await RoleRepository.findByEmail(email);
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (!isAuthorized(role.title, project.area!)) {
      throw new Error('Unauthorized employee');
    }

    return project;
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      throw error;
    }
    throw new Error('An unexpected error occured');
  }
}

/**
 * Update project entity based on id
 * @param {ProjectEntity} project
 * @returns {Promise<ProjectEntity>} a promise that resolves to the updated project entity
 */
async function updateProject(body: UpdateProjectBody): Promise<ProjectEntity> {
  const project = await ProjectRepository.findById(body.id);

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  const startDate = body.startDate ?? project.startDate;
  const endDate = body.endDate ?? null;

  if (endDate !== null && !areDatesValid(startDate, endDate)) {
    throw new Error('Start date must be before end date');
  }

  return await ProjectRepository.updateProject({
    id: project.id,
    name: body.name ?? project.name,
    idCompany: body.idCompany ?? project.idCompany,
    category: body.category ?? project.category,
    matter: body.matter ?? null,
    description: body.description ?? null,
    startDate,
    endDate,
    periodicity: body.periodicity ?? project.periodicity,
    area: body.area ?? project.area,
    payed: body.payed,
    isChargeable: body.isChargeable ?? project.isChargeable,
    isArchived: body.isArchived ?? project.isArchived,
    status: body.status ?? project.status,
    createdAt: project.createdAt,
  });
}

/**
 *
 * @param projectId the id of the proyect to update its status
 * @param newStatus the new status we are expecting
 * @returns {Promise<ProjectStatus>} a promise that resolves the status update
 * @throws {Error} if an unexpected error occurs
 */
async function updateProjectStatus(projectId: string, newStatus: ProjectStatus): Promise<ProjectStatus> {
  try {
    await ProjectRepository.updateProjectStatus(projectId, newStatus);
    return newStatus;
  } catch (error) {
    throw new Error('An unexpected error occured');
  }
}

export const ProjectService = {
  createProject,
  findProjectsClient,
  getProjectById,
  updateProject,
  updateProjectStatus,
  getDepartmentProjects,
};
