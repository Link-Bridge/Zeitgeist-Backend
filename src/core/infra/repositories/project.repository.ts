import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '../../..';
import { ProjectStatus, SupportedRoles } from '../../../utils/enums';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapProjectEntityFromDbModel } from '../mappers/project-entity-from-db-model-mapper';

const RESOURCE_NAME = 'Project info';

/**
 * Finds all company entities in the database
 * @version 2.0.0
 * @returns {Promise<ProjectEntity[]>} a promise taht resolves to an array of company entities ordered by status
 */

async function findAll(): Promise<ProjectEntity[]> {
  try {
    const data: Array<any> = await Prisma.$queryRaw`
    SELECT * FROM project
    ORDER BY case when status = 'Not started' then 1
      when status = 'In progress' then 2
      when status = 'In quotation' then 3
      when status = 'Under revision' then 4
      when status = 'Delayed' then 5
      when status = 'Postponed' then 6
      when status = 'Cancelled' then 7
      when status = 'Accepted' then 8
      when status = 'Done' then 9
      else 10
    end asc
    `;
    if (!data) throw new NotFoundError(`${RESOURCE_NAME} error`);

    return data.map(mapProjectEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Retrieves all projects from a certain role, done projects appear last
 * @param role The role from the requester
 * @returns All the projects from the role's department
 */
async function findAllByRole(role: SupportedRoles): Promise<ProjectEntity[]> {
  try {
    type PrismaProjectsRes = ReturnType<typeof Prisma.project.findMany>;
    let projects: PrismaProjectsRes;
    let doneProjects: PrismaProjectsRes;
    let res: Awaited<PrismaProjectsRes>;
    if (role === SupportedRoles.ADMIN) {
      projects = Prisma.project.findMany({ where: { NOT: { status: ProjectStatus.DONE } } });
      doneProjects = Prisma.project.findMany({ where: { status: ProjectStatus.DONE } });
      res = (await Promise.all([projects, doneProjects])).flat();
    } else {
      projects = Prisma.project.findMany({ where: { area: role, NOT: { status: ProjectStatus.DONE } } });
      doneProjects = Prisma.project.findMany({ where: { status: ProjectStatus.DONE, area: role } });
      res = (await Promise.all([projects, doneProjects])).flat();
    }
    if (!res) throw new NotFoundError(`${RESOURCE_NAME} error`);

    return res.map(mapProjectEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}
/**
 * Finds a project status by id
 * @version 1.0.0
 * @returns {Promise<ProjectEntity>} a promise that resolves in a string with the project status
 */
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

/**
 * Finds a project by id
 * @version 1.0.0
 * @returns {Promise<ProjectEntity>} a promise that resolves in a project entity.
 */
async function findById(id: string): Promise<ProjectEntity> {
  try {
    const data = await Prisma.project.findUnique({
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
 * Finds all projects in the database form a unique company
 * @version 1.1.0
 * @returns {Promise<ProjectEntity[]>} a promise that resolves an array of project entities ordering the projects with status done at the end.
 */

async function findProjetsByClientId(clientId: string): Promise<ProjectEntity[]> {
  try {
    const data = await Prisma.project.findMany({
      where: {
        id_company: clientId,
      },
    });

    if (!data) {
      throw new Error(`${RESOURCE_NAME} repository error`);
    }
    return data.map(mapProjectEntityFromDbModel);
  } catch (error: any) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * A function that calls the Prisma interface to create a project
 * @param entity A backend defined project entity, mapped from the db
 * @returns The created entity mapped from the db response
 */
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
      total_hours: entity.totalHours ? new Decimal(entity.totalHours.toString()) : null,
      periodicity: entity.periodicity,
      is_chargeable: entity.isChargeable,
      area: entity.area,
      created_at: entity.createdAt,
      id_company: entity.idCompany,
    },
  });

  return mapProjectEntityFromDbModel(createData);
}

/**
 * A function that calls the Prisma interface to update a project
 * @param {ProjectEntity} project data to update
 * @returns {Promise<ProjectEntity>} project updated
 * @throws {Error}
 */
async function updateProject(project: ProjectEntity): Promise<ProjectEntity> {
  try {
    const updatedProject = await Prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
        id_company: project.idCompany,
        category: project.category,
        matter: project.matter,
        description: project.description,
        start_date: project.startDate,
        end_date: project.endDate,
        periodicity: project.periodicity,
        area: project.area,
        is_chargeable: project.isChargeable,
        status: project.status,
        created_at: project.createdAt,
        payed: project.payed,
      },
    });
    return mapProjectEntityFromDbModel(updatedProject);
  } catch (error: any) {
    throw new Error(`${RESOURCE_NAME} repository error: ${error.message}`);
  }
}

/**
 * A function that updates the project status into data base
 * @param projectId ID of the project status to update
 * @param newStatus New project status
 * @returns {Promise<ProjectStatus>} the status updated
 */
async function updateProjectStatus(projectId: string, newStatus: ProjectStatus): Promise<ProjectStatus> {
  try {
    await Prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });
    return newStatus;
  } catch (error) {
    throw new Error('Error updating project status');
  }
}

export const ProjectRepository = {
  findAll,
  findProjectStatusById,
  findById,
  findProjetsByClientId,
  createProject,
  updateProject,
  updateProjectStatus,
  findAllByRole,
};
