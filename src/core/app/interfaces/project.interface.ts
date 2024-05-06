import { ProjectCategory, ProjectStatus } from '../../../utils/enums';

export interface UpdateProjectBody {
  id: string;
  name: string;
  matter?: string | null;
  description?: string | null;
  status: ProjectStatus;
  category: ProjectCategory;
  idCompany: string;
  startDate: Date;
}
