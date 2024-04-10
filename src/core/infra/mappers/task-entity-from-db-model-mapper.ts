import { task } from '@prisma/client';
import { Task } from '../../domain/entities/task.entity';

export function mapTaskEntityFromDbModel(model: task): Task {
  return {
    id: model.id,
    title: model.title,
    description: model.description,
    status: model.status,
    waiting_for: model.waiting_for ? model.waiting_for : undefined,
    start_date: model.start_date,
    end_date: model.end_date ? model.end_date : undefined,
    worked_hours: Number(model.worked_hours) ? Number(model.worked_hours) : undefined,
    created_at: model.created_at,
    updated_at: model.updated_at ? model.updated_at : undefined,
    id_project: model.id_project,

  };
}
