import { Prisma } from '../../..';
import { ExpenseReportStatus } from '../../../utils/enums';
import { ExpenseReport } from '../../domain/entities/expense.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapExpenseReportEntityFromDbModel } from '../mappers/expense-entity-from-db-model.mapper';

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
 * Deletes a expense report
 * @version 1.0.0
 * @returns {Promise<ExpenseReport>}
 */

async function deleteExpenseReport(reportId: string): Promise<ExpenseReport> {
  try {
    const data = await Prisma.expense_report.delete({
      where: {
        id: reportId,
      },
      include: { expense: true, employee: true },
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
 * Updates a expense's status
 * @version 1.0.0
 * @returns {Promise<ExpenseReport>} a promise that resolves in a expense
 */
async function updateStatusById(id: string, status: ExpenseReportStatus): Promise<ExpenseReport> {
  try {
    const data = await Prisma.expense_report.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapExpenseReportEntityFromDbModel(data);
  } catch (error: any) {
    if (error.code == 'P2025' && error.meta.cause == 'Record to update not found.')
      throw new Error('Expense not found');
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Updates a expense's payment url (url_voucher)
 * @version 1.0.0
 * @returns {Promise<ExpenseReport>} a promise that resolves in a expense
 */
async function updatePaymentFileUrlById(id: string, urlVoucher: string): Promise<ExpenseReport> {
  try {
    const data = await Prisma.expense_report.update({
      where: {
        id: id,
      },
      data: {
        url_voucher: urlVoucher,
      },
    });
    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return mapExpenseReportEntityFromDbModel(data);
  } catch (error: any) {
    if (error.code == 'P2025' && error.meta.cause == 'Record to update not found.')
      throw new Error('Expense not found');
    throw new Error('An unexpected error occurred');
  }
}

export const ExpenseRepository = {
  findAll,
  findById,
  findByEmployeeId,
  deleteExpenseReport,
  updateStatusById,
  updatePaymentFileUrlById,
};
