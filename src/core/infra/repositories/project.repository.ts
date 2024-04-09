import { Prisma } from '../../..';
import { Project } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';

async function getStatus(id: string) {
    const is_accepted = await Prisma.project.findUnique({
        where: {
            id:id,
        },
        select: {
            status: true,
        },
    });

    if (!is_accepted) {
        throw new NotFoundError('Report');
    }

    return is_accepted;
}

async function findOneAccepted (id: string) : Promise<Project> {
    let raw_project = await Prisma.project.findUnique({
        where: {
            id:id,
        },
        select: {
            id: true,
            name: true,
            matter: true,
            status: true,
            category: true,
            is_chargeable: true,
            total_hours: true,
            start_date: true,
            end_date: true,
            
            company: {
                select: {
                    name: true,
                }
            },

        },
        
    });
    
    if (!raw_project){
        throw new NotFoundError('Project');
    }
    
    return {...raw_project, total_hours: Number(raw_project.total_hours), company: raw_project.company.name};
}

async function findOneInQuotation (id: string) : Promise<Project> {
    let raw_project = await Prisma.project.findUnique({
        where: {
            id:id,
        },
        select: {
            id: true,
            name: true,
            status: true,
            total_hours: true,
            start_date: true,

            company: {
                select: {
                    name: true,
                }
            },

        },
        
    });
    
    if (!raw_project){
        throw new NotFoundError('Project');
    }
    
    return {...raw_project, total_hours: Number(raw_project.total_hours), company: raw_project.company.name};
}

export const ProjectRepository = { getStatus, findOneAccepted, findOneInQuotation };
