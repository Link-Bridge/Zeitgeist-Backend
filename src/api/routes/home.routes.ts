import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';

const router = Router();

router.get(
  '/:idEmployee',
  //checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.LEGAL, SupportedRoles.ACCOUNTING]),
  HomeController.getHome
);

export { router as HomeRouter };
