import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { CompanyController } from '../controllers/company.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.getUnique
);

router.get(
  '/',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.getAll
);

router.put(
  '/:id',
  checkAuthToken,
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.updateClient
);

router.post(
  '/new',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  CompanyController.create
);

export { router as CompanyRouter };
