import { Decimal } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { z } from 'zod';
import { ExpenseService } from '../../core/app/services/expense.service';
import { ExpenseReportStatus } from '../../utils/enums';

const idSchema = z.object({
  id: z.string().uuid(),
});

const createExpenseReportSchema = z.object({
  title: z.string().max(70).min(1),
  status: z.nativeEnum(ExpenseReportStatus),
  startDate: z.coerce.date(),
  expenses: z
    .array(
      z.object({
        title: z.string().max(70).min(1),
        supplier: z.string().max(70).min(1).nullable(),
        totalAmount: z.number().transform(value => new Decimal(value)),
        date: z.coerce.date(),
        urlFile: z.string().max(512).min(1).nullable(),
      })
    )
    .max(30),
});

/**
 * A function that handles the request to obtain expense reports
 * ADMIN && ACCOUNTING can see every report and their author
 * LEGAL can only see their reports
 *
 * @param req HTTP Request
 * @param res Server response
 */
async function getExpenses(req: Request, res: Response) {
  try {
    const data = await ExpenseService.getExpenses(req.body.auth.email);
    if (data) {
      res.status(200).json(data);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * A function that handles the request to obtain expense report details by its id
 * @param req HTTP Request
 * @param res Server response
 */
async function getReportById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const expenseDetails = await ExpenseService.getReportById(id, req.body.auth.email);
    if (expenseDetails) {
      res.status(200).json(expenseDetails);
    }
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * @description A function that updates the expense status
 * @param req HTTP Request
 * @param res Server response
 */
async function updateStatusById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const { status } = req.body;

    const updatedExpense = await ExpenseService.updateStatusById(id, status);
    res.status(200).json(updatedExpense);
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * @description A function that updates the expense payment file (url_voucher)
 * @param req HTTP Request
 * @param res Server response
 */
async function updatePaymentFileUrlById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse({ id: req.params.id });
    const { urlVoucher } = req.body;

    const updatedExpense = await ExpenseService.updatePaymentFileUrlById(id, urlVoucher);
    res.status(200).json(updatedExpense);
  } catch (error: any) {
    if (error.message === 'Unauthorized employee') {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * A function that handles the request to create a new expense report
 *
 * @param req HTTP Request
 * @param res Server response
 *
 * @returns {Promise<void>}
 */

async function createExpenseReport(req: Request, res: Response) {
  try {
    const parsedExpenseSchema = createExpenseReportSchema.parse(req.body);
    const data = await ExpenseService.createExpenseReport(req.body.auth.email, parsedExpenseSchema);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const ExpenseController = {
  getExpenses,
  getReportById,
  createExpenseReport,
  updateStatusById,
  updatePaymentFileUrlById,
};
