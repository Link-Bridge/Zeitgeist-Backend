import { randomUUID } from 'crypto';
import { CreateProjectRequest } from '../../../api/controllers/project.controller';
import { mapProjectEntityFromDbModel } from '../../infra/mappers/project-entity-from-db-model-mapper';
import { ProjectRepository } from '../../infra/repositories/project.repository';

export interface CreateProjectData {
  area: string;
  category: string;
  description: string | null;
  end_date: Date | null;
  id: string;
  id_company: string;
  is_chargeable: boolean;
  matter: string | null;
  name: string;
  periodicity: string | null;
  start_date: Date;
}

async function createProject(data: CreateProjectRequest) {
  const newProject = await ProjectRepository.createProject({
    area: data.area,
    category: data.category,
    description: data.description ?? null,
    end_date: data.endDate ?? null,
    id: randomUUID(),
    id_company: data.client,
    is_chargeable: data.chargable,
    matter: data.matter ?? null,
    name: data.projectName,
    periodicity: data.periodic ?? null,
    start_date: data.startDate,
  });

  return mapProjectEntityFromDbModel(newProject);
}

export const ProjectService = { createProject };
