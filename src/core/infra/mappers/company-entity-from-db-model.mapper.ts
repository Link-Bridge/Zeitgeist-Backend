import { Decimal } from '@prisma/client/runtime/library';
import { CompanyEntity } from '../../domain/entities/company.entity';

interface CompanyBarebone {
  id: string;
  name: string;
  email?: string | null;
  phone_number?: string | null;
  landline_phone?: string | null;
  archived?: boolean;
  constitution_date?: Date | null;
  rfc?: string | null;
  tax_residence?: string | null;
  id_company_direct_contact?: string | null;
  id_form?: string | null;
  created_at: Date;
  updated_at?: Date | null;
  accounting_hours?: Decimal | null;
  legal_hours?: Decimal | null;
  chargeable_hours?: Decimal | null;
  total_projects?: number | null;
}

export function mapCompanyEntityFromDbModel(model: CompanyBarebone): CompanyEntity {
  return {
    id: model.id,
    name: model.name,
    email: model.email ? model.email : null,
    phoneNumber: model.phone_number ? model.phone_number : null,
    landlinePhone: model.landline_phone ? model.landline_phone : null,
    archived: model.archived,
    constitutionDate: model.constitution_date ? model.constitution_date : null,
    rfc: model.rfc ? model.rfc : null,
    taxResidence: model.tax_residence ? model.tax_residence : null,
    idCompanyDirectContact: model.id_company_direct_contact ? model.id_company_direct_contact : null,
    idForm: model.id_form ? model.id_form : null,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : null,
    accountingHours: model.accounting_hours ? model.accounting_hours : new Decimal(0),
    legalHours: model.legal_hours ? model.legal_hours : new Decimal(0),
    chargeableHours: model.chargeable_hours ? model.chargeable_hours : new Decimal(0),
    totalProjects: model.total_projects ? Number(model.total_projects) : 0,
  };
}
