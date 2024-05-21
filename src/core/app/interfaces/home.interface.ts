import { CompanyEntity } from '../../domain/entities/company.entity';
import { ProjectEntity } from '../../domain/entities/project.entity';

export interface Home {
  projects: ProjectEntity[];
  companies: CompanyEntity[];
}
