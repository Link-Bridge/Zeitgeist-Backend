import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { getAllRoles, updateUserRole } from '../controllers/admin.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.put('/role', checkAuthRole([SupportedRoles.ADMIN]), updateUserRole);
router.get('/roles', checkAuthRole([SupportedRoles.ADMIN]), getAllRoles);

export { router as AdminRouter };
