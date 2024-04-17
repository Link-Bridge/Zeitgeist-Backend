import { Prisma } from '../../..';
import { CreateProjectData } from '../../app/services/project.services';
import { Project } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapProjectEntityFromDbModel } from '../mappers/project-entity-from-db-model-mapper';

const RESOURCE_NAME = 'Project';

async function findProjectStatusById(id: string) {
  try {
    const data = await Prisma.project.findUnique({
      where: {
        id: id,
      },
      select: {
        status: true,
      },
    });

    if (!data) {
      throw new NotFoundError(`${RESOURCE_NAME} status`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

async function findById(id: string): Promise<Project> {
  try {
    let data = await Prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapProjectEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}
/**
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<ProjectEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
 */
async function findAll(): Promise<Project[]> {
  const data = await Prisma.project.findMany();
  return data.map(mapProjectEntityFromDbModel);
}

async function createProject(data: CreateProjectData) {
  return await Prisma.project.create({ data: data });
}

export const ProjectRepository = { findProjectStatusById, findById, findAll, createProject };
