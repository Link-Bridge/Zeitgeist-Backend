import { Task } from '../core/domain/entities/task.entity';

interface EmailPayload {
  subject: string;
  body: string;
}

const CLIENT_URL = process.env.CLIENT_URL;

export function notifyAssignedTaskEmailBody(firstName: string, lastName: string, task: Task): EmailPayload {
  return {
    subject: `Hi ${firstName}, a new task is assigned to you`,
    body: `
        <html>
        <body>
            <h1>Task assigned to you</h1>
            <p>Hi ${firstName} ${lastName},</p>
            <p>A new task has been assigned to you:</p>
            <p>Title: ${task.title}</p>
            <p>Description: ${task.description}</p>
            <p>Start date: ${task.startDate}</p>
            <p>End date: ${task.endDate}</p>
            <p>Worked hours: ${task.workedHours}</p>
            <p>Project: ${task.idProject}</p>

            <p>Click here to access the task: <a href="${CLIENT_URL}/tasks/${task.id}">Task</a></p>
        </body>
        </html>
    `,
  };
}
