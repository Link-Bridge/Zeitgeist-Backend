/**
 * @brief This class is used to define the structure of the EmployeeTask entity
 *
 * @param id: string - Unique identifier of the relationship
 * @param createdAt: Date - Date when the relationship was created
 * @param updatedAt?: Date - Last modification date (optional)
 * @param idEmployee: string - Unique identifier of the associated employee
 * @param idTask: string - Unique identifier of the associated task
 *
 * @return void
 *
 * @description The structure contains the schema data of an EmployeeTask.
 */

export interface EmployeeTask {
  /**
   * @param id: string - Unique identifier of the relationship
   */
  id: string;

  /**
   * @param createdAt: Date - Date when the relationship was created
   */
  createdAt: Date;

  /**
   * @param updatedAt: Date - Last modification date (optional)
   */

  updatedAt?: Date;

  /**
   * @param idEmployee: string - Unique identifier of the associated employee
   */
  idEmployee: string;

  /**
   * @param idTask: string - Unique identifier of the associated task
   */
  idTask: string;
}
