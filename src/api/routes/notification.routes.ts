import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();

router.post('/token', NotificationController.saveToken);
router.get('/', NotificationController.getAllNotifications);
router.post('/create', NotificationController.createNotification);

export { router as NotificationRouter };
