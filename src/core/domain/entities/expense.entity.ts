import { Decimal } from '@prisma/client/runtime/library';

/**
 * @brief This class is used to define the structure of the Expense entity
 *
 * @param id: string - Unique identifier of the expense
 * @param title: string - Expense title
 * @param justification: string - Expense justification
 * @param total_amount: Decimal - Expense amount
 + @param status?: string - Expense status (optional)
 * @param category?: string - Expense category (optional)
 * @param date: Date - Expense date
 * @param createdAt: Date - Expense creation date
 * @param updatedAt?: Date - Expense update date (optional)
 * @param idReport: string - Unique identifier of expense report associated
 * @param urlFile?: string - URL of the file associated with the expense (optional)
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */

export interface ExpenseEntity {
  /**
   * @param id: string - Expense id
   */
  id: string;
  /**
   * @param title: string - Expense title
   */
  title: string;
  /**
   * @param justification: string - Expense justification
   */
  justification: string;
  /**
   * @param total_amount: Decimal - Expense amount
   */
  total_amount: Decimal;
  /**
   * @param status: string - Expense status
   */
  status?: string | null;
  /**
   * @param category: string - Expense category (optional)
   */
  category?: string | null;
  /**
   * @param date: Date - Expense date
   */
  date: Date;
  /**
   * @param createdAt: Date - Expense creation date
   */
  createdAt: Date;
  /**
   * @param updatedAt: Date - Expense update date (optional)
   */
  updatedAt?: Date | null;
  /**
   * @param idReport: string - Expense report id
   */
  idReport: string;
  /**
   * @param urlFile: string - URL of the file associated with the expense (optional)
   */
  urlFile?: string | null;
}

/**
 * @brief This class is used to define the structure of the Expense Report entity
 *
 * @param id: string - Unique identifier of the expense report
 * @param title: string - Expense Report title
 * @param description: string - Expense Report description
 * @param startDate: Date - Expense Report start date
 * @param endDate?: Date - Expense Report end date (optional)
 + @param status?: string - Expense Report status (optional)
 * @param createdAt: Date - Expense Report creation date
 * @param updatedAt?: Date - Expense Report update date (optional)
 * @param idEmployee: string - Unique identifier of the employee associated
 * @param expenses?: ExpenseEntity[] - Array of expenses associated with the report (optional)
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */

export interface ExpenseReport {
  /**
   * @param id: string - Expense report id
   */
  id: string;
  /**
   * @param title: string - Expense report title
   */
  title: string;
  /**
   * @param description: string - Expense report description
   */
  description: string;
  /**
   * @param startDate: Date - Expense report start date
   */
  startDate: Date;
  /**
   * @param endDate: Date - Expense report end date
   */
  endDate?: Date | null;
  /**
   * @param status: string - Expense report status
   */
  status?: string | null;
  /**
   * @param createdAt: Date - Expense report creation date
   */
  createdAt: Date;
  /**
   * @param updatedAt: Date - Expense report update date
   */
  updatedAt?: Date | null;
  /**
   * @param idEmployee: string - Employee id
   */
  idEmployee: string;
  /**
   * @param expenses: ExpenseEntity[] - Array of expenses associated with the report
   */
  expenses?: ExpenseEntity[];
}
