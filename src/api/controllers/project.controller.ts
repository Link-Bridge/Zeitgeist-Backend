import { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectReportService } from '../../core/app/services/project-report.services';
import { ProjectService } from '../../core/app/services/project.services';
import { ProjectCategory, ProjectPeriodicity, ProjectStatus } from '../../utils/enums';

const createProjectRequestSchema = z.object({
  projectName: z.string(),
  client: z.string().uuid(),
  category: z.nativeEnum(ProjectCategory),
  matter: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  periodic: z.nativeEnum(ProjectPeriodicity),
  chargable: z.boolean(),
  area: z.nativeEnum(ProjectCategory),
});

/**
 * @description Create a new project
 * @param req
 * @param res
 */
async function createProject(req: Request, res: Response) {
  try {
    const data = createProjectRequestSchema.parse(req.body);
    const newProject = await ProjectService.createProject({
      name: data.projectName,
      matter: data.matter || null,
      description: data.description || null,
      area: data.area,
      status: data.status,
      category: data.category,
      endDate: data.endDate || null,
      idCompany: data.client,
      isChargeable: data.chargable,
      periodicity: data.periodic,
      startDate: data.startDate,
    });
    res.status(201).json(newProject);
  } catch (error: unknown) {
    res.status(400).json({ message: error });
  }
}

async function getReportData(req: Request, res: Response) {
  try {
    const data = await ProjectReportService.getReport(req.params.id);
    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllProjects(req: Request, res: Response) {
  try {
    const data = await ProjectService.getAllProjects();
    res.status(200).json({ data: data });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const ProjectController = { getReportData, createProject, getAllProjects };
