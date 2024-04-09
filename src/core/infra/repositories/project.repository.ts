import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { Report } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';

async function findReport (id: string) : Promise<Report> {
    const is_accepted = await Prisma.project.findUnique({
        where: {
            id:id,
        },
        select: {
            status: true,
        },
    });

    if (is_accepted === null || is_accepted === undefined) {
        throw new NotFoundError('Report');
    }

    let data: Report;

    if (is_accepted.status === 'In quotation'){
        let raw = await Prisma.project.findUnique({
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
        
        if (raw){
            const project = {...raw, total_hours: Number(raw.total_hours), company: raw.company.name};
            data = {project : project};
        } else {
            throw new NotFoundError('Report');
        }
        
    } else {
        let raw = await Prisma.project.findUnique({
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
        
        if (raw){
            const project = {...raw, total_hours: Number(raw.total_hours), company: raw.company.name};
            data = {project : project};
        } else {
            throw new NotFoundError('Report');
        }
    }

    return data;

}

export { findReport }
