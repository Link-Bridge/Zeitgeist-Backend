import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { archiveClient, getAllRoles, updateUserRole } from '../controllers/admin.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.get('/roles', checkAuthRole([SupportedRoles.ADMIN]), getAllRoles);
router.put('/role', checkAuthRole([SupportedRoles.ADMIN]), updateUserRole);
router.put('/archive/:id', checkAuthRole([SupportedRoles.ADMIN]), archiveClient);

export { router as AdminRouter };
