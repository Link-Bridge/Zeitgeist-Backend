import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ExpenseController } from '../controllers/expense.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/', ExpenseController.getExpenses);
router.get('/report/:id', ExpenseController.getReportById);
router.post('/create', ExpenseController.createExpenseReport);
router.put('/report/status/:id', ExpenseController.updateStatusById);
router.put('/report/payment/:id', ExpenseController.updatePaymentFileUrlById);

export { router as ExpenseRouter };
