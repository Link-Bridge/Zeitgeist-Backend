import { Prisma } from '../../..';
import { Project } from '../../domain/entities/project.entity';
import { mapProjectEntityFromDbModel } from '../mappers/project-entity-from-db-model-mapper'
import { NotFoundError } from '../../errors/not-found.error';

const RESOURCE_NAME = 'Project';

async function findProjectStatusById(id: string) {
    try {
        const data = await Prisma.project.findUnique({
            where: {
                id:id,
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

async function findById (id: string) : Promise<Project> {
    try {
        let data = await Prisma.project.findUnique({
            where: {
                id:id,
            },
            
        });
        
        if (!data){
            throw new NotFoundError(RESOURCE_NAME);
        }
        
        return mapProjectEntityFromDbModel(data);
        
    } catch (error: unknown) {
        throw new Error(`${RESOURCE_NAME} repository error`);
    }

}

export const ProjectRepository = { findProjectStatusById, findById };