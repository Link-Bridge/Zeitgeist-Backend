import { Report, Project, Task, ProjectStatistics } from '../interfaces/project-report.interface';
import { ProjectRepository } from '../../infra/repositories/project.repository';
import { EmployeeTaskRepository } from '../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { TaskRepository } from '../../infra/repositories/tasks.repository';
import { CompanyRepository } from '../../infra/repositories/company.repository';

function initilizeStatistics(total: Number): ProjectStatistics {
    const raw : ProjectStatistics = {
        total: total,
        done: 0,
        inprogress: 0,
        underrevision: 0,
        delayed: 0,
        postponed: 0,
        notstarted: 0,
        cancelled: 0,
    }
    return raw;
}

async function getReport(id: string): Promise<Report> {
    try {
        let report : Report;

        const status = await ProjectRepository.findProjectStatusById(id);
        const rawProject = await ProjectRepository.findById(id);
        const company = await CompanyRepository.findById(rawProject.idCompany);

        const project: Project = {...rawProject, companyName: company.name};
        report = {project: project};

       
        if (status.status !== 'In quotation' && status.status !== '-' && status.status !== 'Cancelled'){  // 'Accepted' 'Not started' 'In process' 'Under revision' 'Delayed' 'Postponed' 'Done'
            const rawTasks = await TaskRepository.findTasksByProjectId(id);
            const employeeTask = await EmployeeTaskRepository.findAll();
            const employees = await EmployeeRepository.findAll();

            const tasks: Task[] = [];
            const projectStatistics: ProjectStatistics = initilizeStatistics(rawTasks.length);
            
            for(let i = 0; i < rawTasks.length; i++){
                let task : Task = rawTasks[i];

                const rawEmployeeTask = employeeTask.find((record) => {
                    record.idTask === rawTasks[i].id;
                    return record;
                });
                
                if(rawEmployeeTask) {
                    const employee = employees.find((record) => {
                        (record.id === rawEmployeeTask.idEmployee && rawTasks[i].id === rawEmployeeTask.idTask);
                        return record;
                    });
                    
                    if (employee){ 
                        console.log('hoolal');
                        task = {...task, employeeFirstName: employee.firstName, employeeLastName: employee.lastName};
                    }

                    tasks.push(task);
                    
                }
                
                const key: string = rawTasks[i].status.replace(' ', '').toLocaleLowerCase().trim();
                projectStatistics[key as keyof ProjectStatistics] = Number(projectStatistics[key as keyof ProjectStatistics]) + 1;
            }
            
            report.tasks = tasks;
            report.statistics = projectStatistics;
        } 

        return report;
        
    } catch (error: unknown) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export const ProjectReportService = { getReport };