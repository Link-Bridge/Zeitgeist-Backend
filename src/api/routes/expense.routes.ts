import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ExpenseController } from '../controllers/expense.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL]));
router.get('/', ExpenseController.getExpenses);
router.post('/create', ExpenseController.createExpenseReport);
router.get('/report/:id', ExpenseController.getReportById);
router.delete('/report/delete/:id', ExpenseController.deleteReport);

router.use(checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING]));
router.put('/report/status/:id', ExpenseController.updateStatusById);
router.put('/report/payment/:id', ExpenseController.updatePaymentFileUrlById);

export { router as ExpenseRouter };
