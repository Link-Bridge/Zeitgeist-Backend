import { Decimal } from '@prisma/client/runtime/library';

/**
 * @brief This class is used to define the structure of the Project entity
 *
 * @param id: string - Unique identifier of the project
 * @param name: string - Project name
 * @param matter?: string - Project matter (optional)
 * @param description?: string - Project description (optional)
 * @param status: string - Project status
 * @param category: string - Project category
 * @param startDate: Date - Project start date
 * @param endDate?: Date - Project end date (optional)
 * @param totalHours?: Decimal - Project total hours (optional)
 * @param periodicity?: string - Project periodicity (optional)
 * @param isChargeable?: boolean - Determines whether the project is chargeable or not (optional)
 * @param area?: string - Project area (optional)
 * @param createdAt: Date - Project creation date
 * @param updatedAt?: Date - Project update date (optional)
 * @param idCompany: string - Id for project company
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */

export interface ProjectEntity {
  /**
   * @param id: string - Project id
   */
  id: string;
  /**
   * @param name: string - Project name
   */
  name: string;
  /**
   * @param matter: string - Project matter
   */
  matter?: string | null;
  /**
   * @param description: string - Project description
   */
  description?: string | null;
  /**
   * @param status: string - Project status
   */
  status: string;
  /**
   * @param category: string - Project category
   */
  category: string;
  /**
   * @param startDate: Date - Project start date
   */
  startDate: Date;
  /**
   * @param endDate: Date - Project end date
   */
  endDate?: Date | null;
  /**
   * @param totalHours: Decimal - Project total hours
   */
  totalHours?: Decimal | null;
  /**
   * @param periodicity: string - Project periodicity
   */
  periodicity?: string | null;
  /**
   * @param isChargeable: boolean - Determines whether the project is chargeable or not
   */
  isChargeable?: boolean | null;
  /**
   * @param area: string - Project area
   */
  area?: string;
  /**
   * @param createdAt: Date - Project creation date
   */
  createdAt: Date;
  /**
   * @param updatedAt: Date - Project update date
   */
  updatedAt?: Date | null;
  /**
   * @param idCompany: string - Id for project company
   */
  idCompany: string;
}
