import { Prisma } from '../../..';
import { ExpenseEntity, ExpenseReport } from '../../domain/entities/expense.entity';
import { NotFoundError } from '../../errors/not-found.error';
import {
  mapExpenseEntityFromDbModel,
  mapExpenseReportEntityFromDbModel,
} from '../mappers/expense-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Expense report';

/**
 * Finds a expense report by employeeId
 * @version 1.0.0
 * @returns {Promise<ExpenseReport[]>} a promise that resolves in a expense report entity.
 */
async function findAll(): Promise<ExpenseReport[]> {
  try {
    const data = await Prisma.expense_report.findMany({
      include: {
        expense: true,
        employee: true,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapExpenseReportEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Finds a expense report by id
 * @version 1.0.0
 * @returns {Promise<ExpenseReport>} a promise that resolves in a expense report entity.
 */
async function findById(id: string): Promise<ExpenseReport> {
  try {
    const data = await Prisma.expense_report.findUnique({
      where: {
        id: id,
      },
      include: {
        expense: true,
        employee: true,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapExpenseReportEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Finds a expense report by employeeId
 * @version 1.0.0
 * @returns {Promise<ExpenseReport[]>} a promise that resolves in a expense report entity.
 */
async function findByEmployeeId(id: string): Promise<ExpenseReport[]> {
  try {
    const data = await Prisma.expense_report.findMany({
      where: {
        id_employee: id,
      },
      include: {
        expense: true,
        employee: true,
      },
    });

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapExpenseReportEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Creates a new expense report in the database
 * @version 1.0.0
 * @returns {Promise<ExpenseReport>} a promise that resolves in a expense report entity.
 */
async function createExpenseReport(data: ExpenseReport): Promise<ExpenseReport> {
  try {
    const expenseReport = await Prisma.expense_report.create({
      data: {
        id: data.id,
        title: data.title,
        status: data.status,
        start_date: data.startDate,
        id_employee: data.idEmployee,
      },
      include: {
        employee: true,
      },
    });

    return mapExpenseReportEntityFromDbModel(expenseReport);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * Creates a new expense in the database and associates it with an expense report
 * @version 1.0.0
 * @returns {Promise<ExpenseEntity>} a promise that resolves in a expense entity.
 */

async function createExpense(data: ExpenseEntity): Promise<ExpenseEntity> {
  try {
    const expense = await Prisma.expense.create({
      data: {
        id: data.id,
        title: data.title,
        supplier: data.supplier,
        total_amount: data.totalAmount,
        date: data.date,
        id_report: data.idReport,
        url_file: data.urlFile,
      },
    });

    return mapExpenseEntityFromDbModel(expense);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

export const ExpenseRepository = { findAll, findById, findByEmployeeId, createExpenseReport, createExpense };
