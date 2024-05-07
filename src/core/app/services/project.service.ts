import { randomUUID } from 'crypto';
import { ProjectStatus } from '../../../utils/enums';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../infra/repositories/project.repository';

export interface CreateProjectData {
  name: string;
  matter: string | null;
  description: string | null;
  area: string;
  status: string;
  category: string;
  endDate: Date | null;
  idCompany: string;
  isChargeable: boolean;
  periodicity: string | null;
  startDate: Date;
}
/**
 * A function that calls the repository to create a project in the database
 * @param data The data required to create a project in the database
 * @returns The entity created
 */
async function createProject(data: CreateProjectData): Promise<ProjectEntity> {
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
    isChargeable: data.isChargeable ? data.isChargeable : undefined,
    periodicity: data.periodicity,
    startDate: data.startDate,
    createdAt: new Date(),
  });

  return newProject;
}

/**
 * Gets all projects from the database
 *
 * @returns {Promise<ProjectEntity[]>} - An array of project entities
 */
async function getAllProjects(): Promise<ProjectEntity[]> {
  return await ProjectRepository.findAll();
}

/**
 * Gets all projects from a single company
 * @returns {Promise<ProjectEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findProjectsClient(clientId: string): Promise<ProjectEntity[]> {
  try {
    const projects = await ProjectRepository.findProjetsByClientId(clientId);
    const sortedProjects = projects.sort((a, b) => {
      if (a.status === 'Done' && b.status !== 'Done') return 1;
      if (a.status !== 'Done' && b.status === 'Done') return -1;
      return 0;
    });
    return sortedProjects;
  } catch (error) {
    throw new Error('An unexpected error occured');
  }
}

/**
 *
 * @param projectId the id of the proyect we want the details
 * @returns {Promise<ProjectEntity>} a promise that resolves the details of the project
 * @throws {Error} if an unexpected error occurs
 */

async function getProjectById(projectId: string): Promise<ProjectEntity> {
  try {
    const project = await ProjectRepository.findById(projectId);
    return project;
  } catch (error) {
    throw new Error('An unexpected error occured');
  }
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
  getAllProjects,
  findProjectsClient,
  getProjectById,
  updateProjectStatus,
};
