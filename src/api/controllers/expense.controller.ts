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
<<<<<<< HEAD
 * A function to delete an expense report
 * @param req HTTP Request
 * @param res Server response
 *
 */

async function deleteExpenseReport(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const expenseReport = await ExpenseService.deleteExpenseReport(id);
    res.status(200).json({ data: expenseReport });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error occurred' });
  }
}

export const ExpenseController = { getExpenses, getReportById, deleteExpenseReport };
=======
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

export const ExpenseController = { getExpenses, getReportById, updateStatusById, updatePaymentFileUrlById };
>>>>>>> 912f138368676a8d3ea39b65681953d1d5587851
