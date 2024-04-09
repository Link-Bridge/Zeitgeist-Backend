import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { Report, Task } from '../../domain/entities/project.entity';
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

    if (is_accepted.status === 'In quotation' || is_accepted.status === '-'){
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

        let raw_tasks = await Prisma.employee_task.findMany({
            where: {
                task: {
                    id_project: id
                }
            },
            select: {
                id: true,
                task: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        waiting_for: true,
                        status: true,
                        start_date: true, 
                        end_date: true,
                        worked_hours: true,
                    }
                },
                employee: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                    }
                },
            },
        });

        if (raw_project){
            const project = {...raw_project, total_hours: Number(raw_project.total_hours), company: raw_project.company.name};
            let tasks: Task[] = [];

            for(let i = 0; i < raw_tasks.length; i++){
                const task : Task = {...raw_tasks[i].task, worked_hours: Number(raw_tasks[i].task.worked_hours), employee_first_name: raw_tasks[i].employee.first_name, employee_last_name: raw_tasks[i].employee.last_name}
                tasks.push(task);
                console.log(`TASK ${i}`, task);
            }
            
            data = {project: project, tasks: tasks};
            
        } else {
            throw new NotFoundError('Report');
        }

    }

    return data;

}

export { findReport }
