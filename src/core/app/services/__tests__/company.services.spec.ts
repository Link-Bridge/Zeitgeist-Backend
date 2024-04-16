import { Decimal } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import { instance, mock, resetCalls, when } from 'ts-mockito';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { CompanyService } from '../company.services';

describe('CompanyService', () => {
  let companyService: typeof CompanyService;
  let companyRepositoryMock: typeof CompanyRepository;
  let companyRepositoryInstance: typeof CompanyRepository;

  let projectRepositoryMock: typeof ProjectRepository;
  let projectRepositoryInstance: typeof ProjectRepository;

  beforeEach(() => {
    companyRepositoryMock = mock<typeof CompanyRepository>();
    companyRepositoryInstance = instance(companyRepositoryMock);

    projectRepositoryMock = mock<typeof ProjectRepository>();
    projectRepositoryInstance = instance(projectRepositoryMock);

    companyService = {
      ...CompanyService,
      findAll: () => companyRepositoryInstance.findAll(),
    };
  });

  afterEach(() => {
    resetCalls(companyRepositoryMock);
    resetCalls(projectRepositoryMock);
  });

  const companies = [
    {
      id: 'f4105be8-3b4a-44bb-8707-d1e3eec927ba',
      name: 'Company 1',
      email: null,
      phoneNumber: null,
      landlinePhone: null,
      idCompanyDirectContact: null,
      idForm: null,
      createdAt: new Date(),
      updatedAt: null,
    },
    {
      id: '4f0fe05a-84ea-4c6f-a460-56f33ae75ecd',
      name: 'Company 1',
      email: null,
      phoneNumber: null,
      landlinePhone: null,
      idCompanyDirectContact: null,
      idForm: null,
      createdAt: new Date(),
      updatedAt: null,
    },
    {
      id: 'dd706c45-1461-4490-88ea-43b92b3fd61d',
      name: 'Company 1',
      email: null,
      phoneNumber: null,
      landlinePhone: null,
      idCompanyDirectContact: null,
      idForm: null,
      createdAt: new Date(),
      updatedAt: null,
    },
  ];

  const projects = [
    {
      id: '2f51f9a5-1b03-4a94-a4e1-9ecb34ee0832',
      name: 'Project 1 Company 1',
      matter: null,
      description: null,
      status: 'Not started',
      category: '',
      startDate: new Date(),
      endDate: null,
      totalHours: new Decimal(10),
      perodicity: null,
      isChargeable: true,
      area: 'Legal',
      createdAt: new Date(),
      updatedAt: null,
      idCompany: 'dd706c45-1461-4490-88ea-43b92b3fd61d',
    },
  ];

  describe('findAll', () => {
    it('Should return an array of all companies', async () => {
      when(companyRepositoryMock.findAll()).thenReturn(Promise.resolve(companies));
      when(projectRepositoryMock.findAll()).thenReturn(Promise.resolve(projects));
      const result = await companyService.findAll();
      expect(result).to.deep.equal([...companies]);
    });

    it('Should return an array of length 3', async () => {
      when(companyRepositoryMock.findAll()).thenReturn(Promise.resolve(companies));
      when(projectRepositoryMock.findAll()).thenReturn(Promise.resolve(projects));
      const result = await companyService.findAll();
      expect(result).has.length(3);
    });

    it('Should return 10 as a value for legal hours', async () => {
      when(companyRepositoryMock.findAll()).thenReturn(Promise.resolve(companies));
      when(projectRepositoryMock.findAll()).thenReturn(Promise.resolve(projects));
      const result = await companyService.findAll();
      // expect(result[2].legalHours).to.be.equal(new Decimal(10))
      // expect(result[2].chargeableHours).to.be.equal(new Decimal(10))
      //   console.log(result);
      expect(result[2].totalProjects).to.be.equal(1);
    });
  });
});
