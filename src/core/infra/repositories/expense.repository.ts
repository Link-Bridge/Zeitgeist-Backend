import { Prisma } from '../../..';
import { ExpenseEntity, ExpenseReport } from '../../domain/entities/expense.entity';
import { NotFoundError } from '../../errors/not-found.error';
import {
  mapExpenseEntityFromDbModel,
  mapExpenseReportEntityFromDbModel,
} from '../mappers/expense-entity-from-db-model.mapper';

const RESOURCE_NAME = 'Expense report';

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
 * Finds expenses by report id
 * @version 1.0.0
 * @returns {Promise<ExpenseEntity[]>} a promise that resolves in a list of expense entities.
 */
async function findExpensesByReportId(reportId: string): Promise<ExpenseEntity[]> {
  try {
    const data = await Prisma.expense.findMany({
      where: {
        id_report: reportId,
      },
    });

    return data.map(mapExpenseEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

export const ExpenseRepository = { findById, findExpensesByReportId };
