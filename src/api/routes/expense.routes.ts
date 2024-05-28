import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ExpenseController } from '../controllers/expense.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/',
  checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL]),
  ExpenseController.getExpenses
);

router.put(
  '/status/:id',
  checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING]),
  ExpenseController.updateStatusById
);

router.put(
  '/payment/:id',
  checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING]),
  ExpenseController.updatePaymentFileUrlById
);

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/report/:id', ExpenseController.getReportById);

export { router as ExpenseRouter };
