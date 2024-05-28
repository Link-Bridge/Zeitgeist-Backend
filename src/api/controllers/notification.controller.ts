import { Request, Response } from 'express';
import { z } from 'zod';
import { NotificationService } from '../../core/app/services/notification.service';
import { SupportedDepartments } from '../../utils/enums';
import { zodValidUuid } from '../validators/zod.validator';

const notificationSchema = z.object({
  deparmentTitle: z.nativeEnum(SupportedDepartments),
  projectId: zodValidUuid,
});

async function sendNotificationToDepartment(req: Request, res: Response) {
  try {
    const parsed = notificationSchema.parse(req.body);

    await NotificationService.sendProjectStatusUpdateNotification(parsed.deparmentTitle, parsed.projectId);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error occurred.' });
  }
}

export const NotificationController = { sendNotificationToDepartment };
