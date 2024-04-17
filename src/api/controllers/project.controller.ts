import { Request, Response } from 'express';
import { z } from 'zod';
import { ProjectReportService } from '../../core/app/services/project-report.services';

const reportSchema = z.object({
    id: z.string().min(1, {message: 'projectId cannot be empty'}),
});

async function getReportData(req: Request, res: Response) {
    try {
        const { id } = reportSchema.parse({id: req.params.id});
        
        const data = await ProjectReportService.getReport(id);
        res.status(200).json({ data: data });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const ProjectController = { getReportData };