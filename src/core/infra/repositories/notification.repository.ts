import { randomUUID } from 'crypto';
import { Prisma } from '../../..';
import { EmployeeNotification } from '../../domain/entities/employee-notification.entity';
import { Notification } from '../../domain/entities/notification.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapEmployeeNotificationEntityFromDbModel } from '../mappers/employee-notif-from-db-mapper';
import { mapNotificationEntityFromDbModel } from '../mappers/notification-entity-from-db-model-mapper';

/**
 * @brief Name of the resource used in the notification repository operations.
 */

const RESOURCE_NAME = 'Notification';

/**
 * @brief Function that sets the token of an employee
 *
 * @param email: string
 * @param token: string
 *
 * @return Promise<boolean>. True if the token was saved successfully, false otherwise.
 */

async function saveToken(email: string, token: string): Promise<boolean> {
  try {
    const data = await Prisma.employee.update({
      where: {
        email: email,
      },
      data: {
        device_token: token,
      },
    });

    return !!data;
  } catch (error: unknown) {
    throw new Error(`Failed to assign user Device Token: ${error}`);
  }
}

/**
 * @brief Creates a new notification in the database.
 *
 * @param notification: Notification - New notification to be created.
 * @return {Promise<Notification>} - Created notification.
 */

async function createNotification(notification: Notification): Promise<Notification> {
  try {
    console.log(notification);

    const data = await Prisma.notification.create({
      data: {
        id: notification.id,
        title: notification.title,
        body: notification.body,
        created_at: notification.createdAt,
        updated_at: notification.updatedAt,
      },
    });

    return mapNotificationEntityFromDbModel(data);
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * @brief Finds all notifications in the database.
 *
 * @return {Promise<Notification[]>} - List of notifications.
 */

async function findAllNotifications(): Promise<Notification[]> {
  try {
    const data = await Prisma.notification.findMany();

    if (!data) {
      throw new NotFoundError(RESOURCE_NAME);
    }

    return data.map(mapNotificationEntityFromDbModel);
  } catch (error: unknown) {
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

/**
 * @brief Function that creates a new notification and sends it as a response
 *
 * @return
 */
async function createEmployeeNotification(idEmployee: string, idNotification: string): Promise<EmployeeNotification> {
  try {
    const data = await Prisma.employee_notification.create({
      data: {
        id: randomUUID(),
        id_employee: idEmployee,
        id_notification: idNotification,
        created_at: new Date(),
      },
    });

    return mapEmployeeNotificationEntityFromDbModel(data);
  } catch (error: unknown) {
    throw new Error('Error creating employee notification');
  }
}

export const NotificationRepository = {
  saveToken,
  findAllNotifications,
  createNotification,
  createEmployeeNotification,
};
