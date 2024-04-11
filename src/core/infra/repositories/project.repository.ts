import { Prisma } from "../../..";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { NotFoundError } from "../../errors/not-found.error";
import { mapProjectEntityFromDbModel } from "../mappers/project-entity-from-db-model.mapper";

const RESOURCE_NAME = 'Project info'

/** 
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<ProjectEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
*/

async function findAll(): Promise<ProjectEntity[]> {
    try{
        const data = await Prisma.project.findMany()

        if(!data){
            throw new NotFoundError(RESOURCE_NAME)
        }
        
        return data.map(mapProjectEntityFromDbModel)
    }
    catch(error: any) {  
        console.log(error)
        throw new Error('an unexpected error occurred');
    }
}

export const ProjectRepository = {findAll}