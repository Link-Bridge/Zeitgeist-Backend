import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { archiveClient, getAllRoles, updateUserRole } from '../controllers/admin.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ADMIN]));
router.get('/roles', getAllRoles);
router.put('/role', updateUserRole);
router.put('/archive/:id', archiveClient);

export { router as AdminRouter };
