import { Prisma } from '../../..';
import { Company } from '../../domain/entities/company.entity';
import { mapCompanyEntityFromDbModel } from '../mappers/company-entity-from-db-model-mapper'
import { NotFoundError } from '../../errors/not-found.error';

const RESOURCE_NAME = 'Company';

async function findById(id: string): Promise<Company> {
    let data = await Prisma.company.findUnique({
        where: {
            id: id,
        },
    });

    if(!data) {
        throw new NotFoundError(RESOURCE_NAME);
    }

    return mapCompanyEntityFromDbModel(data);
}

export const CompanyRepository = { findById };