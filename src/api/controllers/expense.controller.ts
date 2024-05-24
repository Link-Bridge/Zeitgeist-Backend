import { Request, Response } from 'express';
import { z } from 'zod';
import { ExpenseService } from '../../core/app/services/expense.service';

const idSchema = z.object({
  id: z.string().uuid(),
});

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

export const ExpenseController = { getReportById };
