/**
 * @brief Esta clase establece la estructura de la entidad Task
 *
 * @param id: string
 * @param title: string
 * @param description: string
 * @param status: string
 * @param waiting_for: string
 * @param castart_datetegory: Date
 * @param end_date: Date
 * @param worked_hours: Number
 * @param created_at: Date
 * @param updated_at: Date
 * @param id_project: string
 *
 * @return void
 *
 * @description La estructura básicamente es lo que esta en el MER,
 * pero se identifican como atributos opcionales aquellos que no
 * son requeridos por un reporte.
 * 
 */

export interface Task {
  /**
   * @param id: string - Identificador único de la tarea
   */
    id: string;

  /**
   * @param title: string - Titulo de la tarea
   */
    title: string;

  /**
   * @param description: string - Descripcion de la tarea
   */
    description: string;

  /**
   * @param status: string - Estatus de la tarea
   */
    status: string;

  /**
   * @param waiting_for: string - Empleado necesario para poder continuar con la tarea
   */
    waiting_for?: string;

  /**
   * @param start_date: Date - Fecha de inicio de la tarea
   */
    start_date: Date;

  /**
   * @param end_date: Date - Fecha de fin de la tarea
   */
    end_date?: Date;

  /**
   * @param worked_hours: Number - Horas trabajadas en la tarea
   */
    worked_hours?: Number;

  /**
   * @param created_at: Date - Fecha de registro de la tarea
   */
  created_at: Date;

  /**
   * @param updated_at: Date - Última fecha de modificación
   */

  updated_at?: Date;
    
  /**
   * @param id_project: string - Identificador único del proyecto asociado
   */
  id_project: string;
}