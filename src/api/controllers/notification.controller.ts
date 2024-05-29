import { Request, Response } from 'express';
import { z } from 'zod';
import { NotificationService } from '../../core/app/services/notification.service';
import { SupportedDepartments } from '../../utils/enums';
import { zodValidUuid } from '../validators/zod.validator';

const notificationSchema = z.object({
  departmentTitle: z.nativeEnum(SupportedDepartments).refine(
    val => {
      return val === SupportedDepartments.ACCOUNTING || val === SupportedDepartments.LEGAL;
    },
    {
      message: "departmentTitle must be either 'Accounting' or 'Legal'",
    }
  ),
  projectId: zodValidUuid,
});

async function sendNotificationToDepartment(req: Request, res: Response) {
  try {
    const parsed = notificationSchema.parse(req.body);

    const response = await NotificationService.sendProjectStatusUpdateNotification(
      parsed.departmentTitle,
      parsed.projectId
    );

    if (response === 'Failed to send email') {
      return res.status(400).json({ message: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error: any) {
    console.error(error); // TODO: Delete this
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
}

export const NotificationController = { sendNotificationToDepartment };
