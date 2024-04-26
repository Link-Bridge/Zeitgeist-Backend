import { TaskStatus } from '../../../utils/enums/index';

export interface TaskDetail {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor?: string;
  startDate: Date;
  endDate?: Date;
  workedHours?: number;
  createdAt: Date;
  updatedAt?: Date;
  idProject: string;
  projectName: string;
}
