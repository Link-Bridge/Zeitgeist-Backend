import { instance, mock, resetCalls, when } from "ts-mockito"
import { CompanyRepository } from "../../../infra/repositories/company.repository"
import { ProjectRepository } from "../../../infra/repositories/project.repository"
import { CompanyService } from "../company.services"
import { Decimal } from "@prisma/client/runtime/library"
import { expect } from "chai"

describe("CompanyService", () => {
    let companyService: typeof CompanyService
    let companyRepositoryMock: typeof CompanyRepository
    let companyRepositoryInstance: typeof CompanyRepository
    let projectRepositoryMock: typeof ProjectRepository
    let projectRepositoryInstance: typeof ProjectRepository

    beforeEach(() => {
        companyRepositoryMock = mock<typeof CompanyRepository>();
        companyRepositoryInstance = instance(companyRepositoryMock);

        companyService = {
            ...CompanyService,
            findAll: () => companyRepositoryInstance.findAll(),
        }
    })

    afterEach(() => {
        resetCalls(companyRepositoryMock)
    })

    describe("findAll", () => {
        it("Should return an array of all companies", async () => {
            const companies = [
                {
                    "id": "dd706c45-1461-4490-88ea-43b92b3fd61d",
                    "name": "Company 1",
                    "email": null,
                    "phoneNumber": null,
                    "landlinePhone": null,
                    "idCompanyDirectContact": null,
                    "idForm": null,
                    "createdAt": new Date(),
                    "updatedAt": null,
                    "accountingHours": new Decimal(25),
                    "legalHours": new Decimal(10),
                    "chargeableHours": new Decimal(35),
                    "totalProjects": 4
                  }
            ]

            when(companyRepositoryMock.findAll()).thenReturn(Promise.resolve(companies))

            const result = await companyService.findAll()
            expect(result).to.deep.equal([...companies])
        })

    })
}) 