import { Decimal } from '@prisma/client/runtime/library';

export interface UpdateProjectBody {
  id: string;
  name?: string;
  idCompany?: string;
  category?: string;
  matter?: string | null;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  periodicity?: string | null;
  area?: string | null;
  isChargeable?: boolean | null;
  isArchived?: boolean | null;
  status: string;
  totalHours?: Decimal | null;
  payed?: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface CreateProjectData {
  name: string;
  matter: string | null;
  description: string | null;
  area: string;
  status: string;
  category: string;
  endDate: Date | null;
  idCompany: string;
  isChargeable: boolean;
  periodicity: string | null;
  startDate: Date;
}
