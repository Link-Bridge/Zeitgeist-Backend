import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { Report } from '../../domain/entities/project.entity';
import { NotFoundError } from '../../errors/not-found.error';

async function findReport (id: string) : Promise<any> { //<Report> {
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

    let data: any //Report;

    if (is_accepted.status === 'In quotation'){
        data = await Prisma.project.findUnique({
            where: {
                id:id,
            },
            select: {
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

    } else {
        data = undefined;
    }

    return data;

}

export { findReport }
