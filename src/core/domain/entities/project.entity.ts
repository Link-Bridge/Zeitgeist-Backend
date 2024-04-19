import { ProjectStatus } from '../../../utils/enums/index';

/**
 * @brief Esta clase es para establecer la estructura de la entidad proyecto
 *
 * @param id: string
 * @param name: string
 * @param matter: string
 * @param description: string
 * @param status: ProjectStatus
 * @param category: string
 * @param startDate: Date
 * @param endDate: Date
 * @param totalHours: Deciaml
 * @param perodicity: string
 * @param isChargeable: boolean
 * @param area: string
 * @param createdAt: Date
 * @param updatedAt: Date
 * @param idCompany: string
 *
 * @return void
 *
 * @description La estructura basicamente es lo que esta en el MER,
 * se tiene la idea usar tipos de datos personalizados, como UUID.
 */

import { Decimal } from "@prisma/client/runtime/library";

export interface ProjectEntity {
  id: string;
  name: string;
  matter?: string | null;
  description?: string | null;
  status: string;
  category: string;
  startDate: Date;
  endDate?: Date | null;
  totalHours?: Decimal | null;
  periodicity?: string | null;
  isChargeable?: boolean | null;
  area?: string;
  createdAt: Date;
  updatedAt?: Date | null;
  idCompany: string;
}
