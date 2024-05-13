import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { TaskController } from '../controllers/task.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));
router.get('/project/:idProject', TaskController.getTasksFromProject);
router.get('/employee/:idEmployee', TaskController.findTasksByEmployeeId);
router.get('/:id', TaskController.findTaskById);
router.post('/create', TaskController.createTask);
router.put('/update/:id', TaskController.updateTask);
router.put('/update/status/:id', TaskController.updateTaskStatus);
router.delete('/delete/:id', TaskController.deleteTask);

export { router as TaskRouter };
