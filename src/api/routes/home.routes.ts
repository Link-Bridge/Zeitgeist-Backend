import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { HomeController } from '../controllers/home.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/:idEmployee',
  checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.LEGAL, SupportedRoles.ACCOUNTING]),
  HomeController.getHome
);

export { router as HomeRouter };
