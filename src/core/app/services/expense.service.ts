import { Decimal } from '@prisma/client/runtime/library';
import { ExpenseReportStatus, SupportedRoles } from '../../../utils/enums';
import { ExpenseReport } from '../../domain/entities/expense.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ExpenseRepository } from '../../infra/repositories/expense.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';

/**
 * @param email the email of the user
 * @returns {Promise<ExpenseReport[]>} a promise that resolves the expense records
 * @throws {Error} if an unexpected error occurs
 */

async function getExpenses(email: string): Promise<ExpenseReport[]> {
  try {
    const role = await RoleRepository.findByEmail(email);
    const employee = await EmployeeRepository.findByEmail(email);

    if (!role || !employee) {
      throw new Error('Employee not found');
    }

    let data;
    if (role.title.toUpperCase() === SupportedRoles.LEGAL.toUpperCase()) {
      data = await ExpenseRepository.findByEmployeeId(employee.id);
    } else if (
      role.title.toUpperCase() === SupportedRoles.ADMIN.toUpperCase() ||
      role.title.toUpperCase() === SupportedRoles.ACCOUNTING.toUpperCase()
    ) {
      data = await ExpenseRepository.findAll();
    }

    if (!data) {
      throw new Error('An unexpected error occurred');
    }

    for (let i = 0; i < data.length; i++) {
      let totalAmount = new Decimal(0);
      data[i].expenses?.forEach(record => {
        totalAmount = totalAmount.add(record.totalAmount);
      });
      data[i].totalAmount = totalAmount;
    }
    return data;
  } catch (error: any) {
    if (error.message === 'Employee not found') {
      throw new Error('Employee not found');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

/**
 *
 * @param getReportById the id of the expense report we want the details
 * @param email the email of the user
 * @returns {Promise<ExpenseReport>} a promise that resolves the details of the expense report
 * @throws {Error} if an unexpected error occurs
 */

async function getReportById(reportId: string, email: string): Promise<ExpenseReport> {
  try {
    const [employee, role, expenseReport] = await Promise.all([
      EmployeeRepository.findByEmail(email),
      RoleRepository.findByEmail(email),
      ExpenseRepository.findById(reportId),
    ]);

    if (
      role.title.toUpperCase() != SupportedRoles.ADMIN.toUpperCase() &&
      role.title.toUpperCase() != SupportedRoles.ACCOUNTING.toUpperCase() &&
      expenseReport.idEmployee != employee?.id
    ) {
      throw new Error('Unauthorized employee');
    }

    let totalAmount = new Decimal(0);
    if (expenseReport.expenses) {
      expenseReport.expenses.forEach(expense => {
        totalAmount = totalAmount.add(expense.totalAmount);
      });
    }
    expenseReport.totalAmount = totalAmount;

    return expenseReport;
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * @description Function to delete an expense by id
 * @param id
 * @param returns {ExpenseEntity} - Deleted expense
 * @throws {Error} - If the expense is not found
 * @throws {Error} - If an unexpected error occurs
 *
 */

async function deleteReport(reportId: string): Promise<ExpenseReport> {
  try {
    const expenseReport = await ExpenseRepository.findById(reportId);
    if (!expenseReport) {
      throw new Error('Expense report not found');
    }

    return await ExpenseRepository.deleteReport(reportId);
  } catch (error: unknown) {
    throw new Error('An unexpected error occurred');
  }
}

/**
 * @param id The id of the expense to be updated
 * @param status The new status
 * @returns {Promise<ExpenseReport>} a promise that resolves the details of the expense report
 * @throws {Error} if an unexpected error occurs
 *
 */

async function updateStatusById(id: string, status: ExpenseReportStatus): Promise<ExpenseReport> {
  try {
    const expenseReportStatus = Object.values(ExpenseReportStatus) as string[];
    if (!expenseReportStatus.includes(status)) throw new Error('Invalid status');

    const updatedExpense = await ExpenseRepository.updateStatusById(id, status);
    return updatedExpense;
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      throw error;
    }
    throw new Error(error.message);
  }
}

/**
 * @param id The id of the expense to be updated
 * @param urlVoucher The voucher url for the payment file
 * @returns {Promise<ExpenseReport>} a promise that resolves the details of the expense report
 * @throws {Error} if an unexpected error occurs
 */
async function updatePaymentFileUrlById(id: string, urlVoucher: string): Promise<ExpenseReport> {
  try {
    const updatedExpense = await ExpenseRepository.updatePaymentFileUrlById(id, urlVoucher);
    return updatedExpense;
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      throw error;
    }
    throw new Error(error.message);
  }
}

export const ExpenseService = {
  getExpenses,
  getReportById,
  deleteReport,
  updateStatusById,
  updatePaymentFileUrlById,
};
