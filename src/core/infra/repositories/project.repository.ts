import { Prisma } from "../../..";
import { ProjectEntity } from "../../domain/entities/project.entity";

const RESOURCE_NAME = 'Project info'

/** 
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<ProjectEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
*/

async function findAll(): Promise<ProjectEntity[]> {
    return await Prisma.project.findMany()
}

export const ProjectRepository = {findAll}