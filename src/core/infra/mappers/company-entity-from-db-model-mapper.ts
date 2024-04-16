import { company } from '@prisma/client';
import { Company } from '../../domain/entities/company.entity';

export function mapCompanyEntityFromDbModel(model: company): Company {
  return {
    id: model.id,
    name: model.name,
    email: model.email? model.email : undefined,
    phoneNumber: model.phone_number? model.phone_number : undefined,
    landlinePhone: model.landline_phone? model.landline_phone : undefined,
    archived: model.archived,
    createdAt: model.created_at,
    updatedAt: model.updated_at ? model.updated_at : undefined,
    idCompanyDirectContact: model.id_company_direct_contact ? model.id_company_direct_contact : undefined,
    idForm: model.id_form,
  };
}
