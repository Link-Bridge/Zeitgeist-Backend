import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { getAllDepartments } from '../controllers/department.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ADMIN, SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL]));

router.get('/getAllDepartments', getAllDepartments);

export { router as DepartmentRouter };
