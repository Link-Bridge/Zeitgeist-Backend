/**
 * @brief Esta clase establece la estructura de la entidad Project
 *
 * @param id: string
 * @param name: string
 * @param matter: string
 * @param description: string
 * @param status: string
 * @param category: string
 * @param start_date: Date
 * @param end_date: Date
 * @param total_hours: Number
 * @param periodicity: string
 * @param is_chargeable: Boolean
 * @param company: string
 *
 * @return void
 *
 * @description La estructura básicamente es lo que esta en el MER,
 * pero se clasifican como atributos opcionales aquellos que varían 
 * entre los proyectos en cotización y los aceptados.
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
   * @param status: string - Estatus del proyecto
   */
    status: string;

  /**
   * @param category: string - Categoría del proyecto
   */
    category?: string | null;

  /**
   * @param start_date: Date - Fecha de inicio del proyecto
   */
    start_date: Date;

  /**
   * @param end_date: Date - Fecha de fin del proyecto
   */
    end_date?: Date | null;

  /**
   * @param total_hours: Number - Total de horas trabajadas en el proyecto
   */
    total_hours?: Number | null;

  /**
   * @param periodicity: string - Periodcidad del proyecto
   */
    periodicity?: string | null;

  /**
   * @param is_chargeable: boolean - Indica si el proyecto es cobrable
   */
    is_chargeable?: boolean | null;

  /**
   * @param company: string - Compañía asociada al proyecto
   */
    company: string;
}