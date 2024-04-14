import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router = Router();

router.get('/notification', NotificationController.getAllNotifications);
router.post('/notification/create', NotificationController.createNotification);

