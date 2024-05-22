import { expense, expense_report } from '@prisma/client';
import { ExpenseReportStatus } from '../../../utils/enums';
import { ExpenseEntity, ExpenseReport } from '../../domain/entities/expense.entity';

export function mapExpenseEntityFromDbModel(model: expense): ExpenseEntity {
  return {
    id: model.id,
    title: model.title,
    justification: model.justification,
    total_amount: model.total_amount,
    status: model.status ? model.status : '',
    category: model.category ? model.category : '',
    date: model.date,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : undefined,
    idReport: model.id_report,
    urlFile: model.url_file ? model.url_file : '',
  };
}

export function mapExpenseReportEntityFromDbModel(model: expense_report): ExpenseReport {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    startDate: model.start_date,
    endDate: model.end_date,
    status: model.status as ExpenseReportStatus,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : undefined,
    idEmployee: model.id_employee,
  };
}
