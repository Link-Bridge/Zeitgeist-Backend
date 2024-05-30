import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { SupportedRoles } from '../../../utils/enums';
import { ExpenseReportStatus } from '../../../utils/enums/index';
import { ExpenseReport, NewExpenseReport } from '../../domain/entities/expense.entity';
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
 * Function that handles the request to create a new expense report
 *
 * @param {object} body - The request body
 * @returns {Promise<ExpenseReport>} - The created expense report
 * @throws {Error} - If an unexpected error occurs
 *
 */

async function createExpenseReport(userEmail: string, data: NewExpenseReport): Promise<ExpenseReport> {
  try {
    const employee = await EmployeeRepository.findByEmail(userEmail);
    if (!employee) {
      throw new Error('Employee not found');
    }
    const idEmployee = employee.id;

    const expenseReport = await ExpenseRepository.createExpenseReport({
      id: randomUUID(),
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      status: ExpenseReportStatus.PENDING,
      idEmployee: idEmployee,
    });

    // Create an expense for each item in data.expenses
    const promiseExpenses = data.expenses.map(expense =>
      ExpenseRepository.createExpense({
        id: randomUUID(),
        title: expense.title,
        justification: expense.justification,
        supplier: expense.supplier,
        totalAmount: expense.totalAmount,
        status: ExpenseReportStatus.PAYED,
        category: 'viatico',
        date: expense.date,
        createdAt: new Date(),
        idReport: expenseReport.id,
        urlFile: expense.urlFile,
      })
    );

    // Wait for all expenses to be created
    const expenses = await Promise.all(promiseExpenses);

    const createdExpenseReport = {
      ...expenseReport,
      expenses,
    };

    return createdExpenseReport;
  } catch (error: any) {
    //console.log(error)
    throw new Error('An unexpected error occurred');
  }
}

export const ExpenseService = { getExpenses, getReportById, createExpenseReport };
