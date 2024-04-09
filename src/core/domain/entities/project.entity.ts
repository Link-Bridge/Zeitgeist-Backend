export interface Project {
    id: string;
    name: string;
    matter?: string | null;
    description?: string | null;
    status: string;
    category?: string | null;
    start_date: Date;
    end_date?: Date | null;
    total_hours?: Number | null;
    periodicity?: string | null;
    is_chargeable?: boolean | null;
    company: string;

}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    waiting_for?: string | null;
    start_date: Date;
    end_date?: Date | null;
    worked_hours?: Number | null;
    employee_first_name: string;
    employee_last_name: string;
}

export interface Statistics {
    total: Number
    done: Number,
    in_progress: Number,
    under_revision: Number,
    delayed: Number,
    postponed: Number,
    not_started: Number,
    cancelled: Number
}

export interface Report {
    project: Project;
    tasks?: Task[] | null;
    statistics?: Statistics | null;
}