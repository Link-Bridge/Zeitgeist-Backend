import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { CompanyController } from '../controllers/company.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/',
  checkAuthToken,
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.getAll
);

router.post(
  '/new',
  checkAuthToken,
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.create
);

export { router as CompanyRouter };
