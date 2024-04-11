import { Prisma } from "../../..";
import { CompanyEntity } from "../../domain/entities/company.entity";
import { NotFoundError } from "../../errors/not-found.error";
import { mapCompanyEntityFromDbModel } from "../mappers/company-entity-from-db-model.mapper";

const RESOURCE_NAME = 'Company info'

/** 
 * Finds all company entities in the database
 * @version 1.0.0
 * @returns {Promise<CompanyEntity[]>} a promise taht resolves to an array of company entities
 * @throws {NotFoundError} if no entities are found
 * @throws {Error} if an unexpected error occurs
*/

async function findAll(): Promise<CompanyEntity[]> {
    try{
        const data = await Prisma.company.findMany()

        if(!data){
            throw new NotFoundError(RESOURCE_NAME)
        }
        
        return data.map(mapCompanyEntityFromDbModel)
    }
    catch(error: any) {  
        console.log(error)
        throw new Error('an unexpected error occurred');
    }
}

export const CompanyRepository = {findAll}