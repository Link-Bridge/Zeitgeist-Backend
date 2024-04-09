import { Decimal } from "@prisma/client/runtime/library";

interface Project {
    id: string;
    name: string;
    matter?: string;
    description?: string;
    status: string;
    category?: string;
    start_date: Date;
    end_date?: Date;
    total_hours?: Number;
    periodicity?: string;
    is_chargeable?: boolean;
    company: string;

}

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    waiting_for?: string;
    start_date: Date;
    end_date?: Date;
    worked_hours?: Number;
    employee_first_name: string;
    employee_last_name: string;
    
}


export interface Report {
    project: Project;
    tasks?: Task[];
}