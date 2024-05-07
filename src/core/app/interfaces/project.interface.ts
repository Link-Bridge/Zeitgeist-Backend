import { Decimal } from '@prisma/client/runtime/library';

export interface UpdateProjectBody {
  id: string;
  name: string;
  idCompany: string;
  category: string;
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
  createdAt: Date;
  updatedAt?: Date | null;
}
