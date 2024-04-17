import { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectReportService } from '../../core/app/services/project-report.services';
import { ProjectService } from '../../core/app/services/project.services';

const ProjectCategory = z.enum([
  'Client',
  'Zeitgeist internal',
  'Academic connection',
  'Government',
  'Supplier',
  'Event',
  'Fairs/Conferences',
  '-',
]);

const ProjectPeriodicity = z.enum([
  '1 day',
  '1 week',
  '2 weeks',
  '1 month',
  '2 months',
  '4 months',
  '6 months',
  '12 months',
  'When needed',
]);

const ProjectAreas = z.enum(['Accounting', 'Legal']);

const createProjectRequestSchema = z.object({
  projectName: z.string(),
  client: z.string().uuid(),
  category: ProjectCategory,
  matter: z.string().optional(),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  periodic: ProjectPeriodicity.optional(),
  chargable: z.boolean(),
  area: ProjectAreas,
});

export type CreateProjectRequest = z.infer<typeof createProjectRequestSchema>;

async function createProject(req: Request, res: Response) {
  try {
    const data = createProjectRequestSchema.parse(req.body);
    const newProject = await ProjectService.createProject(data);
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

export const ProjectController = { getReportData, createProject };
