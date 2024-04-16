import { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectReportService } from '../../core/app/services/project-report.services';

const createProjectRequestSchema = z.object({
  projectName: z.string(),
  client: z.string(),
  category: z.string(),
  matter: z.string().optional(),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  periodic: z.string().optional(),
  chargable: z.boolean().optional(),
});

export type CreateProjectData = z.infer<typeof createProjectRequestSchema>;

async function createProject(req: Request, res: Response) {
  try {
    const data = createProjectRequestSchema.parse(req.body);
    console.log(data);
    res.status(200).send();
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
