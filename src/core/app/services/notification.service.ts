import {
  notifyAssignedTaskEmailTemplate,
  notifyOtherDeparmentEmailTemplate,
} from '../../../utils/email/email.templates';
import { SupportedDepartments } from '../../../utils/enums';
import { Task } from '../../domain/entities/task.entity';
import { EmailProvider } from '../../infra/providers/resend.provider';
import { DepartmentRepository } from '../../infra/repositories/department.repository';
import { EmployeeRepository } from '../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../infra/repositories/project.repository';

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

  const { subject, body } = notifyAssignedTaskEmailTemplate(employee.firstName, employee.lastName, task);

  await EmailProvider.sendEmail([employee.email], subject, body);
}

/**
 * This method is used for sending a notification to another department when the project status is updated.
 * @param departmentTitle {SupportedDepartments} - The department to which the notification is to be sent
 * @param projectId {string} - The project id for which the status is updated
 */
async function sendProjectStatusUpdateNotification(
  departmentTitle: SupportedDepartments,
  projectId: string
): Promise<string> {
  const project = await ProjectRepository.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const deparment = await DepartmentRepository.findByTitle(departmentTitle);
  const employees = await EmployeeRepository.findByDepartment(deparment.id);
  if (!employees) {
    throw new Error('Employees not found');
  }

  const emailList = employees.map(employee => employee.email);

  const deparmentSubject =
    departmentTitle === SupportedDepartments.ACCOUNTING ? SupportedDepartments.LEGAL : SupportedDepartments.ACCOUNTING;
  const { subject, body } = notifyOtherDeparmentEmailTemplate(deparmentSubject, project);

  const response = await EmailProvider.sendEmail(emailList, subject, body);

  if (!response.error) {
    return 'Email sent successfully';
  }

  return 'Failed to send email';
}

export const NotificationService = { sendAssignedTaskNotification, sendProjectStatusUpdateNotification };
