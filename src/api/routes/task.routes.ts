import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { TaskController } from '../controllers/task.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.post(
  '/create',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.createTask
);

router.get(
  '/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.findTaskById
);

router.get(
  '/project/:idProject',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.getTasksFromProject
);

router.get(
  '/employee/:idEmployee',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.findTasksByEmployeeId
);

export { router as TaskRouter };
