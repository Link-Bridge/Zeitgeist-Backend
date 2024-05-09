import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { TaskController } from '../controllers/task.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

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
router.get(
  '/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.findTaskById
);
router.post(
  '/create',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.createTask
);
router.put(
  '/update/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.updateTask
);
router.put(
  '/update/status/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.updateTaskStatus
);
router.delete(
  '/delete/:id',
  checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]),
  TaskController.deleteTask
);

export { router as TaskRouter };
