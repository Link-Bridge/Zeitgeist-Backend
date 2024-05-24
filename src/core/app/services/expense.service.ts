import { Decimal } from '@prisma/client/runtime/library';
import { SupportedRoles } from '../../../utils/enums';
import { ExpenseReport } from '../../domain/entities/expense.entity';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ExpenseRepository } from '../../infra/repositories/expense.repository';
import { RoleRepository } from '../../infra/repositories/role.repository';

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

    if (role.title.toUpperCase() != SupportedRoles.ADMIN.toUpperCase() && expenseReport.idEmployee != employee?.id) {
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
    throw new Error('An unexpected error occured');
  }
}

export const ExpenseService = { getReportById };
