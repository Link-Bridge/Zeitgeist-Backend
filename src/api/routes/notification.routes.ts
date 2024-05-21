import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();

router.get('/', NotificationController.getAllNotifications);
router.post('/token', NotificationController.saveToken);
router.post('/create', NotificationController.createNotification);

export { router as NotificationRouter };
