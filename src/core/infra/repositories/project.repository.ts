import { Prisma } from '../../..';
import { Project } from '../../domain/entities/project.entity';
import { mapProjectEntityFromDbModel } from '../mappers/project-entity-from-db-model-mapper'
import { NotFoundError } from '../../errors/not-found.error';

const RESOURCE_NAME = 'Project';

async function findProjectStatusById(id: string) {
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
}

async function findById (id: string) : Promise<Project> {
    let data = await Prisma.project.findUnique({
        where: {
            id:id,
        },
        
    });
    
    if (!data){
        throw new NotFoundError(RESOURCE_NAME);
    }
    
    return mapProjectEntityFromDbModel(data);
}

export const ProjectRepository = { findProjectStatusById, findById };
