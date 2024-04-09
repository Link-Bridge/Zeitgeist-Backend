import { Report } from '../../domain/entities/project.entity';
import { ReportRepository } from '../../infra/repositories/report.repository';

async function getReport(id: string): Promise<Report> {
    try {
        const data = await ReportRepository.findReport(id);
        return data;
    } catch (error: unknown) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export const ProjectReportService = { getReport };