import { Notification } from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../infra/repositories/notification.repository';

/**
 * Creates notification data in the repository
 * 
 * @param {Notification} notification - The notification entity
 * 
 * @returns {Promise<Notification>} A promise that resolves to the created
 * 
 * @throws {Error} If an unexpected error occurs
 */

async function createNotification(notification: Notification): Promise<Notification> {
    try {
        const notificationRecord = await NotificationRepository.createNotification(notification);
        return notificationRecord;
    } catch (error: any) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

/**
 * Gets notification data from the repository
 * 
 * @returns {Promise<Notification[]>} A promise that resolves to an array of
 *                                  notification entities
 * 
 * @throws {Error} If an unexpected error occurs
 */

async function getAllNotifications(): Promise<Notification[]> {
    try {
        const notificationRecords = await NotificationRepository.findAllNotifications();
        return notificationRecords;
    } catch (error: any) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export const NotificationService = { getAllNotifications, createNotification};
