import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { TaskController } from '../controllers/task.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.post(
  '/create',
  checkAuthToken,
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.createTask
);

router.get(
  '/:id',
  checkAuthToken,
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.findTaskById
);

router.get('/:idProject', TaskController.getTasksFromProject);

export { router as TaskRouter };
