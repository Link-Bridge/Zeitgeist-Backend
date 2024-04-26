import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ProjectController } from '../controllers/project.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/report/:id',
  checkAuthToken,
  checkAuthRole([SupportedRoles.CONTABLE, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getReportData
);
router.get(
  '/:clientId',
  checkAuthToken,
  checkAuthRole([SupportedRoles.CONTABLE, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getProjectsClient
);
router.post(
  '/create',
  checkAuthToken,
  checkAuthRole([SupportedRoles.CONTABLE, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.createProject
);
router.get('/', ProjectController.getAllProjects);

export { router as ProjectRouter };
