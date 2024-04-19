import { ProjectRepository } from '../../infra/repositories/project.repository';

async function findProjectsClient(clientId: string) {
  try {
    const clientProjects = await ProjectRepository.findClientById(clientId);
    return clientProjects;
  } catch (error) {
    throw new Error('An unexpected error occurred');
  }
}

export const ProjectService = { findProjectsClient };
