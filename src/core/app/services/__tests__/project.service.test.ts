import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { default as Sinon, default as sinon } from 'sinon';
import {
  ProjectCategory,
  ProjectPeriodicity,
  ProjectStatus,
  SupportedDepartments,
  SupportedRoles,
} from '../../../../utils/enums';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { CompanyService } from '../company.service';
import { ProjectService } from '../project.service';

describe('ProjectService', () => {
  let findProjectByIdStub: Sinon.SinonStub;
  let createProjectStub: sinon.SinonStub;
  let findAllByRoleStub: sinon.SinonStub;
  let findCompanyByIdStub: Sinon.SinonStub;
  let findProjectsByClientIdStub: Sinon.SinonStub;
  let updateProjectStub: sinon.SinonStub;
  let updateProjectStatusStub: sinon.SinonStub;
  let findEmployeeByEmailStub: sinon.SinonStub;
  let findRoleByIdStub: sinon.SinonStub;
  let findRoleByEmailStub: sinon.SinonStub;
  let deleteProjectByIdStub: sinon.SinonStub;

  beforeEach(() => {
    createProjectStub = sinon.stub(ProjectRepository, 'createProject');
    findAllByRoleStub = sinon.stub(ProjectRepository, 'findAllByRole');
    findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
    findProjectsByClientIdStub = sinon.stub(ProjectRepository, 'findProjetsByClientId');
    findCompanyByIdStub = sinon.stub(CompanyRepository, 'findById');
    findEmployeeByEmailStub = sinon.stub(EmployeeRepository, 'findByEmail');
    findRoleByIdStub = sinon.stub(RoleRepository, 'findById');
    findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
    deleteProjectByIdStub = sinon.stub(ProjectRepository, 'deleteProjectById');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findProjectsByClientId', () => {
    it('Should get the projects of a client with the given id', async () => {
      const clientId = randomUUID();
      const projects: ProjectEntity[] = [
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo',
          matter: 'Desarrollo de un sistema de gestión interna',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROGRESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          isArchived: false,
          area: 'Client',
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: clientId,
        },
      ];

      const roleId = randomUUID();
      const existingRole = {
        id: roleId,
        title: 'Admin',
        createdAt: new Date(),
      };

      const employeeId = randomUUID();
      const existingEmployee = {
        id: employeeId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: roleId,
      };

      findProjectsByClientIdStub.withArgs(clientId).returns(Promise.resolve(projects));
      findRoleByEmailStub.withArgs(existingEmployee.email).returns(Promise).returns(existingRole);

      const result = await ProjectService.findProjectsClient(clientId, existingEmployee.email);
      expect(result).to.deep.equal(projects);
      expect(findProjectsByClientIdStub.calledOnceWithExactly(clientId)).to.be.true;
    });

    it("Should throw an error if the projects couldn't be found", async () => {
      const clientId = randomUUID();
      findProjectsByClientIdStub.withArgs(clientId).throws(new Error('An unexpected error occured'));
      try {
        await ProjectService.findProjectsClient(clientId, randomUUID());
      } catch (error: any) {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.be.equal('An unexpected error occured');
      }
    });
  });

  describe('createProject', () => {
    it('should create a project', async () => {
      const uuid = randomUUID();
      const clientUuid = randomUUID();

      const company = {
        id: clientUuid,
        name: 'Zeitgeist',
        email: 'info@zeitgeist.mx',
        phoneNumber: '1234567890',
        landlinePhone: '0987654321',
        archived: false,
        createdAt: new Date(),
        updatedAt: null,
        idCompanyDirectContact: null,
        idForm: null,
      };

      const projectData = {
        id: uuid,
        name: 'Nuevo Proyecto de Desarrollo',
        matter: 'Desarrollo de un sistema de gestión interna',
        description:
          'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
        status: ProjectStatus.IN_PROGRESS,
        category: ProjectCategory.GOVERNMENT,
        startDate: new Date('2023-04-01T00:00:00.000Z'),
        endDate: new Date('2023-12-01T00:00:00.000Z'),
        periodicity: ProjectPeriodicity.ONE_WEEK,
        isChargeable: true,
        isArchived: false,
        area: SupportedDepartments.ACCOUNTING,
        createdAt: new Date('2024-04-19T01:23:49.555Z'),
        idCompany: clientUuid,
      };

      findCompanyByIdStub.resolves(company);
      createProjectStub.resolves(projectData);
      const newProject = await ProjectService.createProject(projectData);
      expect(newProject).to.equal(projectData);
    });
  });

  describe('getAllProjects', () => {
    it('should return all projects', async () => {
      const accountingRole = randomUUID();

      const role = {
        title: SupportedRoles.ACCOUNTING,
        createdAr: new Date(),
      };

      const employee = {
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'joe.doe@email.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: accountingRole,
      };

      const projects = [
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo',
          matter: 'Desarrollo de un sistema de gestión interna',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROGRESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          isArchived: false,
          area: SupportedDepartments.ACCOUNTING,
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: randomUUID(),
        },
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo 2',
          matter: 'Desarrollo de un sistema de gestión interna 2',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROGRESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          isArchived: false,
          area: SupportedDepartments.ACCOUNTING,
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: randomUUID(),
        },
      ];

      findEmployeeByEmailStub.resolves(employee);
      findRoleByIdStub.resolves(role);
      findAllByRoleStub.resolves(projects);

      const getProjects = await ProjectService.getDepartmentProjects(employee.email);

      expect(getProjects).eql(projects);
    });
  });

  describe('getProjectById', () => {
    it('Should return the project information and client name acording its id', async () => {
      const role = {
        title: SupportedRoles.ADMIN,
        createdAt: new Date(),
      };

      const employee = {
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'joe.doe@email.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: role,
      };

      const projectId = randomUUID();
      const existingProject = {
        id: projectId,
        name: 'Smartwatch',
        matter: 'Legal',
        description: 'smartwatch description',
        status: 'In process',
        category: 'LegalCategory',
        startDate: new Date(),
        createdAt: new Date(),
        totalHours: 20,
        area: 'Legal',
      };

      findProjectByIdStub.resolves(existingProject);
      findRoleByEmailStub.resolves(role);

      const res = await ProjectService.getProjectById(projectId, employee.email);

      expect(res).to.exist;
      expect(res).to.be.equal(existingProject);
      expect(res.id).to.equal(projectId);
      expect(res.matter).to.equal(existingProject.matter);
    });
  });

  describe('getProjectAndClientById', () => {
    it('Should return the project information acording its id', async () => {
      const role = {
        title: SupportedRoles.ADMIN,
        createdAt: new Date(),
      };

      const employee = {
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'joe.doe@email.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: role,
      };

      const companyId = randomUUID();

      const existingCompany = {
        id: companyId,
        name: 'Borregos',
      };

      const projectId = randomUUID();
      const existingProject = {
        id: projectId,
        name: 'Estadio',
        matter: 'Legal',
        description: 'Estadio description',
        status: 'Completed',
        category: 'LegalCategory',
        startDate: new Date(),
        createdAt: new Date(),
        totalHours: 28,
        idCompany: companyId,
        area: 'Legal',
      };

      findProjectByIdStub.resolves(existingProject);
      findCompanyByIdStub.resolves(existingCompany);
      findRoleByEmailStub.resolves(role);

      const res = await ProjectService.getProjectById(projectId, employee.email);
      const res2 = await CompanyService.findById(companyId);

      expect(res).to.exist;
      expect(res.id).to.equal(projectId);
      expect(res.totalHours).to.equal(Number(28));
      expect(res.description).to.equal(existingProject.description);
      expect(res2.name).to.equal(existingCompany.name);
    });
  });

  describe('updateProject', () => {
    const mockProject = prepareMockProject();

    beforeEach(() => {
      updateProjectStub = sinon.stub(ProjectRepository, 'updateProject');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should update a project', async () => {
      findProjectByIdStub.resolves(mockProject.original);
      updateProjectStub.resolves(mockProject.updatedProject);
      const res = await ProjectService.updateProject(mockProject.updatePayload);

      expect(res).to.deep.equal(mockProject.updatedProject);
    });
  });

  describe('updateProjectStatus', () => {
    const mockProject = prepareMockProject();

    beforeEach(() => {
      updateProjectStatusStub = sinon.stub(ProjectRepository, 'updateProjectStatus');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should update a project status', async () => {
      findProjectByIdStub.resolves(mockProject.original);
      updateProjectStatusStub.resolves(mockProject.updateProjectStatus);
      const res = await ProjectService.updateProjectStatus(
        mockProject.updateProjectStatus.id,
        mockProject.updateProjectStatus.status
      );

      expect(res).to.equal(mockProject.updateProjectStatus.status);
    });
  });

  describe('deleteProjectByID', () => {
    it('it should throw an error if project is not deleted from DB', async () => {
      const mockProject = prepareMockProject();

      beforeEach(() => {
        updateProjectStatusStub = sinon.stub(ProjectRepository, 'deleteProjectById');
      });

      afterEach(() => {
        sinon.restore();
      });

      findProjectByIdStub.resolves(mockProject.original.id);
      deleteProjectByIdStub.resolves(null);

      const res = await ProjectService.deleteProjectById(mockProject.original.id);

      expect(res).to.eql(null);
      expect(deleteProjectByIdStub.calledOnce);
    });
  });

  it('it should delete project by ID', async () => {
    const mockProject2 = prepareMockProject();

    findProjectByIdStub.resolves(mockProject2.original.id);
    deleteProjectByIdStub.resolves(mockProject2.original.id);

    await ProjectService.deleteProjectById(mockProject2.original.id);

    expect(deleteProjectByIdStub.calledOnceWith(mockProject2.original.id)).to.be.true;
  });
});

function prepareMockProject() {
  const projectId = randomUUID();
  const companyId = randomUUID();

  const original: ProjectEntity = {
    id: projectId,
    name: faker.lorem.words(3),
    description: faker.lorem.words(10),
    matter: faker.lorem.word(),
    periodicity: faker.helpers.arrayElement(Object.values(ProjectPeriodicity)),
    area: faker.helpers.arrayElement(Object.values(SupportedDepartments)),
    category: faker.helpers.arrayElement(Object.values(ProjectCategory)),
    status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
    startDate: faker.date.recent(),
    createdAt: faker.date.recent(),
    idCompany: companyId,
    isChargeable: false,
  };

  const updatedProject = {
    ...original,
    name: faker.lorem.words(2),
    description: faker.lorem.words(12),
    matter: faker.lorem.word(),
  };

  const updateProjectStatus = {
    ...original,
    status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
  };

  const updatePayload = {
    id: projectId,
    name: faker.lorem.words(2),
    description: faker.lorem.words(12),
    matter: faker.lorem.word(),
    periodicity: faker.helpers.arrayElement(Object.values(ProjectPeriodicity)),
    area: faker.helpers.arrayElement(Object.values(SupportedDepartments)),
    category: faker.helpers.arrayElement(Object.values(ProjectCategory)),
    status: faker.helpers.arrayElement(Object.values(ProjectStatus)),
    startDate: faker.date.recent(),
    createdAt: faker.date.recent(),
    idCompany: companyId,
  };
  return { original, updatedProject, updateProjectStatus, updatePayload };
}
