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
 * @param employee_first_name: string
 * @param employee_last_name: string
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
      waiting_for?: string | null;
  
    /**
     * @param start_date: Date - Fecha de inicio de la tarea
     */
      start_date: Date;
  
    /**
     * @param end_date: Date - Fecha de fin de la tarea
     */
      end_date?: Date | null;
  
    /**
     * @param worked_hours: Number - Horas trabajadas en la tarea
     */
      worked_hours?: Number | null;
  
    /**
     * @param employee_first_name: string - Nombre del empleado encargado de la tarea
     */
      employee_first_name: string;
  
    /**
     * @param employee_last_name: string - Apellido del empleado encargado de la tarea
     */
      employee_last_name: string;
}