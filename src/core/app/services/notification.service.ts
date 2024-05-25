import { notifyAssignedTaskEmailBody } from '../../../utils/email/email.templates';
import { Task } from '../../domain/entities/task.entity';
import { EmailProvider } from '../../infra/providers/resend.provider';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';

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

export const NotificationService = { sendAssignedTaskNotification };
