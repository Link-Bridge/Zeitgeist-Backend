import { Prisma } from '../../..';
import { Notification } from '../../domain/entities/notification.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapNotificationEntityFromDbModel } from '../mappers/notification-entity-from-db-model-mapper';

const RESOURCE_NAME = 'Notification';

async function createNotification(notification: Notification): Promise<Notification> {
  try {
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
    throw new Error(`${RESOURCE_NAME} repository error`);
  }
}

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

export const NotificationRepository = { findAllNotifications, createNotification };
