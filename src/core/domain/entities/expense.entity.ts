import { employee, expense } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ExpenseReportStatus } from '../../../utils/enums/index';

/**
 * @brief This class is used to define the structure of the Expense entity
 *
 * @param id: string - Unique identifier of the expense
 * @param title: string - Expense title
 ~ @param supplier: string - Expense supplier
 * @param totalAmount: Decimal - Expense amount
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
   * @param supplier: string - Expense supplier
   */
  supplier: string | null;
  /**
   * @param totalAmount: Decimal - Expense amount
   */
  totalAmount: Decimal;
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
 * @param startDate: Date - Expense Report start date
 * @param endDate?: Date - Expense Report end date (optional)
 + @param status?: ExpenseReportStatus - Expense Report status (optional)
 * @param createdAt?: Date - Expense Report creation date (optional)
 * @param updatedAt?: Date - Expense Report update date (optional)
 * @param url_voucher?: string - URL of the voucher associated with the expense report (optional)
 * @param idEmployee: string - Unique identifier of the employee associated
 * @param employeeFirstName?: string - Employee first name (optional)
 * @param employeeLastName?: string - Employee last name (optional)
 * @param expenses?: ExpenseEntity[] - Array of expenses associated with the report (optional)
 * @param totalAmount?: Decimal - Total amount of the expenses associated with the report (optional)
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
   * @param startDate: Date - Expense report start date
   */
  startDate: Date;
  /**
   * @param endDate: Date - Expense report end date
   */
  endDate?: Date | null;
  /**
   * @param status: ExpenseReportStatus - Expense report status
   */
  status?: ExpenseReportStatus | null;
  /**
   * @param createdAt: Date - Expense report creation date
   */
  createdAt?: Date | null;
  /**
   * @param updatedAt: Date - Expense report update date
   */
  updatedAt?: Date | null;
  /**
   * @param urlVoucher: string - URL of the voucher associated with the expense report
   */
  urlVoucher?: string | null;
  /**
   * @param idEmployee: string - Employee id
   */
  idEmployee: string;
  /**
   * @param employeeFirstName: string - Employee first name
   */
  employeeFirstName?: string;
  /**
   * @param employeeLastName: string - Employee last name
   */
  employeeLastName?: string;
  /**
   * @param expenses: ExpenseEntity[] - Array of expenses associated with the report
   */
  expenses?: ExpenseEntity[];

  /**
   * @param totalAmount: Decimal - Total amount of the expenses associated with the report
   */
  totalAmount?: Decimal;
}

/**
 * @brief This class is used to define the structure of the Expense Report Raw Data from the db.
 *
 * @param id: string - Unique identifier of the expense report
 * @param title: string - Expense Report title
 * @param description: string - Expense Report description
 * @param start_date: Date - Expense Report start date
 * @param end_date?: Date - Expense Report end date (optional)
 + @param status?: string - Expense Report status (optional)
 * @param createdAt: Date - Expense Report creation date
 * @param updatedAt?: Date - Expense Report update date (optional)
 * @param url_voucher?: string - URL of the voucher associated with the expense report (optional)
 * @param id_employee: string - Unique identifier of the employee associated
 * @param employee?: employee - Employee information associated with the report (optional)
 * @param expense?: expense[] - Array of expenses associated with the report (optional)
 * @param totalAmount?: Decimal - Total amount of the expenses associated with the report (optional)
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */

export interface RawExpenseReport {
  /**
   * @param id: string - Expense report id
   */
  id: string;
  /**
   * @param title: string - Expense report title
   */
  title: string;
  /**
   * @param startDate: Date - Expense report start date
   */
  start_date: Date;
  /**
   * @param endDate: Date - Expense report end date
   */
  end_date?: Date | null;
  /**
   * @param status: string - Expense report status
   */
  status?: string | null;
  /**
   * @param createdAt: Date - Expense report creation date
   */
  createdAt?: Date | null;
  /**
   * @param updatedAt: Date - Expense report update date
   */
  updatedAt?: Date | null;
  /**
   * @param url_voucher: string - URL of the voucher associated with the expense report
   */
  url_voucher?: string | null;
  /**
   * @param idEmployee: string - Employee id
   */
  id_employee: string;
  /**
   * @param employee: employee - Employee information associated with the report
   */
  employee?: employee | null;
  /**
   * @param expense: expense[] - Array of expenses associated with the report
   */
  expense?: expense[] | null;
}

/**
 * @brief This class is used to define the structure of the New Expense entity
 *
 * @param title: string - Expense title
 * @param supplier: string - Expense supplier
 * @param totalAmount: Decimal - Expense amount
 * @param date: Date - Expense date
 * @param urlFile: string - URL of the file associated with the expense
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */

export interface NewExpenseEntity {
  title: string;
  supplier: string | null;
  totalAmount: Decimal;
  date: Date;
  urlFile: string | null;
}

/**
 * @brief This class is used to define the structure of the New Expense Report entity
 *
 * @param title: string - Expense Report title
 * @param status: ExpenseReportStatus - Expense Report status
 * @param startDate: Date - Expense Report start date
 * @param expenses: NewExpenseEntity[] - Array of expenses associated with the report
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
 */
export interface NewExpenseReport {
  title: string;
  status: ExpenseReportStatus;
  startDate: Date;
  expenses: NewExpenseEntity[];
}
