import { Report } from '../../domain/entities/project.entity';
import { findReport } from '../../infra/repositories/project.repository';

async function getReport(id: string): Promise<Report> {
    try {
        const data = await findReport(id);
        return data;
    } catch (error: any) {
        console.error('Error: ', error);
        throw new Error('An unexpected error occurred');
    }
}

export { getReport };