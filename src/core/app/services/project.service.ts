import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../infra/repositories/project.repository';

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

export const ProjectService = { findProjectsClient, getProjectById };
