import { ProjectStatus } from '../../../utils/enums/index';

/**
 * @brief Esta clase establece la estructura de la entidad Project
 *
 * @param id: string
 * @param name: string
 * @param matter: string
 * @param description: string
 * @param status: ProjectStatus
 * @param category: string
 * @param startDate: Date
 * @param endDate: Date
 * @param totalHours: Number
 * @param periodicity: string
 * @param isChargeable: Boolean
 * @param area: string
 * @param createdAt: Date
 * @param updatedAt: Date
 * @param idCompany: string
 *
 * @return void
 *
 * @description La estructura contiene los datos del esquema de Project,
 * pero se identifican como atributos opcionales aquellos que no
 * son requeridos por un proyecto.
 * 
 */

export interface Project {
  /**
   * @param id: string - Identificador único del proyecto
   */
    id: string;

  /**
   * @param name: string - Nombre del proyecto
   */
    name: string;
    
  /**
   * @param matter: string - Nombre del proyecto
   */
    matter?: string | null;
    
  /**
   * @param description: string - Descripción del proyecto
   */
    description?: string | null;

  /**
   * @param status: ProjectStatus - Estatus del proyecto
   */
    status: ProjectStatus;

  /**
   * @param category: string - Categoría del proyecto
   */
    category?: string | null;

  /**
   * @param startDate: Date - Fecha de inicio del proyecto
   */
    startDate: Date;

  /**
   * @param endDate: Date - Fecha de fin del proyecto
   */
    endDate?: Date | null;

  /**
   * @param totalHours: Number - Total de horas trabajadas en el proyecto
   */
    totalHours?: Number | null;

  /**
   * @param periodicity: string - Periodcidad del proyecto
   */
    periodicity?: string | null;

  /**
   * @param isChargeable: boolean - Indica si el proyecto es cobrable
   */
    isChargeable?: boolean | null;

  /**
   * @param area: string - Area asociada al proyecto
   */
    area?: string;

  /**
   * @param createdAt: Date - Fecha de registro de la tarea
   */
    createdAt: Date;

    /**
     * @param updatedAt: Date - Última fecha de modificación
     */
  
    updatedAt?: Date;
      
    /**
     * @param idCompany: string - Identificador único de la compañia asociada al proyecto
     */
    idCompany: string;
}