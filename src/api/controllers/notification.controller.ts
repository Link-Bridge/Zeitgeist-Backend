import { Request, Response } from 'express';
import { NotificationService } from '../../core/app/services/notification.services';

/**
 * Creates a new notification and sends it as a response
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 *
 * @returns {Promise<void>} A promise that resolves to void
 *
 * @throws {Error} If an unexpected error occurs
 */

async function createNotification(req: Request, res: Response) {
  try {
    const data = await NotificationService.createNotification(req.body);
    res.status(201).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Gets the notificacion data from the service and sends it as a response
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 *
 * @returns {Promise<void>} A promise that resolves to void
 *
 * @throws {Error} If an unexpected error occurs
 */

async function getAllNotifications(req: Request, res: Response) {
  try {
    const data = await NotificationService.getAllNotifications();
    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const NotificationController = { createNotification, getAllNotifications };
