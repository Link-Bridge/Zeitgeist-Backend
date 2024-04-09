import { Prisma } from '../../..';
import { Task } from '../../domain/entities/project.entity';

async function findTasks (id_project: string) : Promise<Task[]> {
    let tasks: Task[] = [];
    
    let raw_tasks = await Prisma.employee_task.findMany({
        where: {
            task: {
                id_project: id_project
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

    for(let i = 0; i < raw_tasks.length; i++){
        const task : Task = {...raw_tasks[i].task, worked_hours: Number(raw_tasks[i].task.worked_hours), employee_first_name: raw_tasks[i].employee.first_name, employee_last_name: raw_tasks[i].employee.last_name}
        tasks.push(task);
    }

    return tasks;
}

export const TaskRepository = { findTasks };