import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '../../..';
import { ProjectEntity } from '../../domain/entities/project.entity';
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

async function findById(id: string): Promise<ProjectEntity> {
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
async function findAll(): Promise<ProjectEntity[]> {
  const data = await Prisma.project.findMany();
  return data.map(mapProjectEntityFromDbModel);
}

async function createProject(entity: ProjectEntity): Promise<ProjectEntity> {
  const createData = await Prisma.project.create({
    data: {
      id: entity.id,
      name: entity.name,
      matter: entity.matter,
      description: entity.description,
      status: entity.status,
      category: entity.category,
      start_date: entity.startDate,
      end_date: entity.endDate,
      total_hours: entity.totalHours !== undefined ? new Decimal(entity.totalHours.toString()) : null,
      periodicity: entity.periodicity,
      is_chargeable: entity.isChargeable,
      area: entity.area,
      created_at: entity.createdAt,
      id_company: entity.idCompany,
    },
  });

  return mapProjectEntityFromDbModel(createData);
}

export const ProjectRepository = { findProjectStatusById, findById, findAll, createProject };
