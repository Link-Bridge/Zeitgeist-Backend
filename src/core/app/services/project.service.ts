import { randomUUID } from 'crypto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { UpdateProjectBody } from '../interfaces/project.interface';

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
 * Update project entity based on id
 * @param {ProjectEntity} project
 * @returns {Promise<ProjectEntity>} a promise that resolves to the updated project entity
 */
async function updateProject(body: UpdateProjectBody): Promise<ProjectEntity> {
  const project = await ProjectRepository.findById(body.id);

  if (!project) {
    throw new NotFoundError('Project not found');
  }

  return await ProjectRepository.updateProject({
    id: project.id,
    name: body.name ?? project.name,
    idCompany: body.idCompany ?? project.idCompany,
    category: body.category ?? project.category,
    matter: body.matter ?? project.matter,
    description: body.description ?? project.description,
    startDate: body.startDate ?? project.startDate,
    endDate: body.endDate ?? project.endDate,
    periodicity: body.periodicity ?? project.periodicity,
    area: body.area ?? project.area,
    isChargeable: body.isChargeable ?? project.isChargeable,
    status: body.status ?? project.status,
    createdAt: project.createdAt,
  });
}

export const ProjectService = { createProject, getAllProjects, findProjectsClient, getProjectById, updateProject };
