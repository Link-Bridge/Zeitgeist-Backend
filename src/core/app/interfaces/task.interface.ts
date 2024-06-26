import { TaskStatus } from '../../../utils/enums/index';

export interface TaskDetail {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor?: string;
  startDate: Date;
  endDate?: Date | null;
  workedHours?: number;
  createdAt: Date;
  updatedAt?: Date;
  idProject: string;
  projectName: string;
  employeeId?: string;
  employeeFirstName?: string;
  employeeLastName?: string;
}
