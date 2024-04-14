/**
 * @brief Esta clase establece la estructura de la entidad EmployeeNotification
 *
 * @param id: string
 * @param createdAt: Date
 * @param updatedAt: Date
 * @param idEmployee: string
 * @param idNotification: string
 *
 * @return void
 *
 * @description La estructura contiene los datos del esquema EmployeeNotification
 * 
 */

export interface EmployeeNotification {
    /**
     * @param id: string - Identificador único de la relación
     */
    id: string;

    /**
     * @param createdAt: Date - Fecha de registro de la relación
     */
    createdAt: Date;

    /**
     * @param updatedAt: Date - Última fecha de modificación
     */
    updatedAt?: Date;
    
    /**
     * @param idEmployee: string - Identificador único del empleado asociado
     */
    idEmployee: string;

    /**
     * @param idNotification: string - Identificador único de la notificación asociada
     */
    idNotification: string;
  }