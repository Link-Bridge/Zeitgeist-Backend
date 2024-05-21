import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { EmployeeController } from '../controllers/employee.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.post('/signup', EmployeeController.userExists);
router.get(
  '/',
  checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL]),
  EmployeeController.getAllEmployees
);

router.use(checkAuthRole([SupportedRoles.ADMIN]));
router.delete('/delete/:id', EmployeeController.deleteEmployee);

export { router as EmployeeRouter };
