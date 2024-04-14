export interface CreateEmployee {
  /**
   * Employee name from request body
   */
  firstName: string;

  /**
   *  Employee last name from request body
   */
  lastName: string;

  /**
   * Employee email from request body
   */
  email: string;

  /**
   * Employee picture from request body
   */
  imageUrl: string;
}
