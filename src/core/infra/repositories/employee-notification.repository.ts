import { employee_notification } from '@prisma/client';
import { EmployeeNotification } from '../../domain/entities/employee-notification.entity';

export function mapEmployeeNotifEntityFromDbModel(model: employee_notification): EmployeeNotification {
  return {
    id: model.id,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : undefined,
    idEmployee: model.id_employee,
    idNotification: model.id_notification,
  };
}
