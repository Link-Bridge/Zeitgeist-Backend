import { ProjectRepository } from '../../infra/repositories/project.repository';

/**
 * Gets all projects from a single company
 * @returns {Promise<ProjectEntity[]>} a promise that resolves to an array of company entities
 * @throws {Error} if an unexpected error occurs
 */

async function findProjectsClient(clientId: string) {
  try {
    const clientProjects = await ProjectRepository.findProjetsByClientId(clientId);
    return clientProjects;
  } catch (error) {
    throw new Error('An unexpected error occurred');
  }
}

export const ProjectService = { findProjectsClient };
