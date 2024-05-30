import { Request, Response } from 'express';
import { z } from 'zod';
import { ExpenseService } from '../../core/app/services/expense.service';

const idSchema = z.object({
  id: z.string().uuid(),
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
 * A function that handles the request to create a new expense report
 *
 * @param req HTTP Request
 * @param res Server response
 *
 * @returns {Promise<void>}
 */

async function createExpenseReport(req: Request, res: Response) {
  try {
    const data = await ExpenseService.createExpenseReport(req.body.auth.email, req.body);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const ExpenseController = { getExpenses, getReportById, createExpenseReport };
