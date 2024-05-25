import { notifyAssignedTaskEmailBody } from '../../../utils/email/email.templates';
import { Notification } from '../../domain/entities/notification.entity';
import { Task } from '../../domain/entities/task.entity';
import { EmailProvider } from '../../infra/providers/resend.provider';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { NotificationRepository } from '../../infra/repositories/notification.repository';

/**
 * @deprecated This interface is deprecated and should not be used.
 */
export interface userToken {
  email: string;
  deviceToken: string;
}

/**
 * @deprecated This function is deprecated and should not be used.
 */
async function saveToken(body: userToken) {
  try {
    return await NotificationRepository.saveToken(body.email, body.deviceToken);
  } catch (error) {
    throw new Error('Error saving token.' + error);
  }
}

/**
 * @deprecated This function is deprecated and should not be used.
 */
async function createNotification(notification: Notification): Promise<Notification> {
  try {
    const notificationRecord = await NotificationRepository.createNotification(notification);
    return notificationRecord;
  } catch (error: any) {
    throw new Error('Error creating notification.' + error);
  }
}

/**
 * @deprecated This function is deprecated and should not be used.
 */
async function getAllNotifications(): Promise<Notification[]> {
  try {
    const notificationRecords = await NotificationRepository.findAllNotifications();
    return notificationRecords;
  } catch (error: any) {
    throw new Error('Error getting notifications.' + error);
  }
}

/**
 * This method is used for sending a notification when the task is created and its assigned to the user.
 * @param userId {string} - The user id to whom the task is assigned
 * @param task {Task} - The task that is assigned to the user
 */
async function sendAssignedTaskNotification(userId: string, task: Task): Promise<void> {
  const employee = await EmployeeRepository.findById(userId);
  if (!employee) {
    throw new Error('Employee not found');
  }

  const { subject, body } = notifyAssignedTaskEmailBody(employee.firstName, employee.lastName, task);

  await EmailProvider.sendEmail([employee.email], subject, body);
}

export const NotificationService = { saveToken, getAllNotifications, createNotification, sendAssignedTaskNotification };
