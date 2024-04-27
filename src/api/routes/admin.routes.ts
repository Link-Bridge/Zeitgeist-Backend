import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { updateUserRole, getAllRoles } from '../controllers/admin.controller';
import { checkAuthToken } from '../middlewares/auth.middleware';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.put('/role', checkAuthToken, checkAuthRole([SupportedRoles.ADMIN]), updateUserRole);
// router.get('/roles', checkAuthToken, checkAuthRole([SupportedRoles.ADMIN]), updateUserRole);
router.get('/roles', getAllRoles);

export { router as AdminRouter };
