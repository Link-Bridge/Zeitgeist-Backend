/**
 * @brief This class is used to define the structure of the Employee entity
 *
 * @param id: string - Unique identifier of the employee
 * @param firstName: string - First name of the employee
 * @param lastName: string - Last name of the employee
 * @param email: string - Email of the employee
 * @param imageUrl?: string - Image URL of the employee (optional)
 * @param createdAt: Date - Date when the employee was created
 * @param updatedAt?: Date - Date when the employee was updated (optional)
 * @param idDepartment?: string - ID of the department where the employee belongs (optional)
 * @param idRole: string - ID of the role of the employee
 * @param deviceToken?: string - Device token of the employee (optional)
 *
 * @return void
 *
 * @description The structure contains the schema data of an Employee.
 */

export interface EmployeeEntity {
  /**
   * @param id string: The id of the employee.
   */
  id: string;

  /**
   * @param firstName string: The first name of the employee.
   */
  firstName: string;

  /**
   * @param lastName string: The last name of the employee.
   */
  lastName: string;

  /**
   * @param email string: The email of the employee.
   */
  email: string;

  /**
   * @param imageUrl string: The image url of the employee.
   */
  imageUrl?: string;

  /**
   * @param createdAt Date: The date when the employee was created.
   */
  createdAt: Date;

  /**
   * @param updatedAt Date: The date when the employee was updated.
   */
  updatedAt?: Date;

  /**
   * @param idDepartment string: The id of the department where the employee belongs.
   */
  idDepartment?: string;

  /**
   * @param idRole string: The id of the role of the employee.
   */
  idRole: string;

  /**
   * @param deviceToken string: The device token of the employee.
   */
  deviceToken?: string;
}
