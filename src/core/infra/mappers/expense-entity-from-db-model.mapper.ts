import { expense } from '@prisma/client';
import { ExpenseEntity, ExpenseReport, RawExpenseReport } from '../../domain/entities/expense.entity';

export function mapExpenseEntityFromDbModel(model: expense): ExpenseEntity {
  return {
    id: model.id,
    title: model.title,
    justification: model.justification,
    totalAmount: model.total_amount,
    status: model.status ? model.status : '',
    category: model.category ? model.category : '',
    date: model.date,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : undefined,
    idReport: model.id_report,
    urlFile: model.url_file ? model.url_file : '',
  };
}

export function mapExpenseReportEntityFromDbModel(model: RawExpenseReport): ExpenseReport {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    startDate: model.start_date,
    endDate: model.end_date ? model.end_date : undefined,
    status: model.status ? model.status : undefined,
    idEmployee: model.id_employee,
    employeeFirstName: model.employee?.first_name ? model.employee.first_name : '',
    employeeLastName: model.employee?.last_name ? model.employee.last_name : '',
    expenses: model.expense ? model.expense.map(mapExpenseEntityFromDbModel) : [],
  };
}
