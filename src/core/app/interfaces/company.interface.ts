export interface UpdateCompanyBody {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  landlinePhone?: string | null;
  archived?: boolean;
}
