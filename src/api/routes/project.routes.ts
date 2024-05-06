import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { ProjectController } from '../controllers/project.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get(
  '/report/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getReportData
);

router.get('/:id', ProjectController.getProjectById);

// router.get(
//   '/:clientId',
//   // checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
//   ProjectController.getProjectsClient
// );

router.get(
  '/:clientId',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getProjectsClient
);
router.post(
  '/create',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.createProject
);
router.get(
  '/',
  // checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getAllProjects
);
router.get(
  '/details/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.getProjectById
);
router.put(
  '/:id',
  // checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  ProjectController.update
);

export { router as ProjectRouter };
