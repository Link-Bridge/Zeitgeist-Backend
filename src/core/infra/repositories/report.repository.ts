import { Prisma } from '../../..';
import { Report, Statistics } from '../../domain/entities/report.entity';
import { TaskRepository } from './tasks.repository';
import { ProjectRepository } from './project.repository';

function initilizeStatistics(): Statistics {
    return {
        total: 0,
        done: 0,
        in_progress: 0,
        under_revision: 0,
        delayed: 0,
        postponed: 0,
        not_started: 0,
        cancelled: 0,
    };
}

async function findReport (id: string) : Promise<Report> {
    let data: Report;
    
    const is_accepted = await ProjectRepository.getStatus(id);
    
    if (is_accepted.status === 'In quotation' || is_accepted.status === '-'){
        const project = await ProjectRepository.findOneAccepted(id);
        data = {project: project};
        
        
    } else {
        let project = await ProjectRepository.findOneInQuotation(id);

        const tasks = await TaskRepository.findTasks(id);

        let raw_statistics = await Prisma.task.groupBy({
            where: {
                id_project: id
            },
            by: ['status'],
            _count: {
                _all: true,
            },
        });
        
        let statistics: Statistics = initilizeStatistics();
        
        statistics.total = tasks.length;
        for(let i = 0; i < raw_statistics.length; i++){
            let key: string = raw_statistics[i].status.replace(' ', '_');
            statistics[key as keyof Statistics] = Number(raw_statistics[i]._count._all);
        }
        
        data = {project: project, tasks: tasks, statistics: statistics};
    }

    return data;
}

export const ReportRepository = { findReport };