import { Router } from 'express';
import { SupportedRoles } from '../../utils/enums';
import { NotificationController } from '../controllers/notification.controller';
import { checkAuthRole } from '../middlewares/rbac.middleware';

const router = Router();

router.use(checkAuthRole([SupportedRoles.ACCOUNTING, SupportedRoles.LEGAL, SupportedRoles.ADMIN]));

router.post('/send/deparment', NotificationController.sendNotificationToDepartment);

export { router as NotificationRouter };
