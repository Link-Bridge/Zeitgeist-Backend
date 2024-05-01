import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { default as Sinon, SinonStubbedInstance, default as sinon } from 'sinon';
import { ProjectCategory, ProjectPeriodicity, ProjectStatus, SupportedDepartments } from '../../../../utils/enums';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { CompanyService } from '../company.service';
import { ProjectService } from '../project.service';

describe('ProjectService', () => {
  describe('findProjectsByClientId', () => {
    let projectService: typeof ProjectService;
    let projectRepository: SinonStubbedInstance<typeof ProjectRepository>;

    beforeEach(() => {
      projectRepository = sinon.stub(ProjectRepository);
      projectService = {
        ...ProjectService,
        findProjectsClient: projectRepository.findProjetsByClientId,
        getAllProjects: projectRepository.findAll,
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should get the projects of a client with the given id', async () => {
      const clientId = '3ea24e0c-519e-46d8-a45e-62bc5fcbada0';
      const projects: ProjectEntity[] = [
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo',
          matter: 'Desarrollo de un sistema de gestión interna',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROCESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          area: 'Client',
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: clientId,
        },
      ];

      projectRepository.findProjetsByClientId.withArgs(clientId).returns(Promise.resolve(projects));

      const result = await projectService.findProjectsClient(clientId);

      expect(result).to.deep.equal(projects);
      expect(projectRepository.findProjetsByClientId.calledOnceWithExactly(clientId)).to.be.true;
    });

    it("Should throw an error if the projects couldn't be found", async () => {
      const clientId = '3ea24e0c-519e-46d8-a45e-62bc5fcbada0';

      projectRepository.findProjetsByClientId.withArgs(clientId).throws(new Error('Error getting projects'));

      try {
        await projectService.findProjectsClient(clientId);
      } catch (error: any) {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.be.equal('Error getting projects');
      }
    });
  });
  describe('createProject', () => {
    let createProject: sinon.SinonStub;
    beforeEach(() => {
      createProject = sinon.stub(ProjectRepository, 'createProject');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should create a project', async () => {
      const uuid = randomUUID();
      const clientUuid = randomUUID();
      const projectData = {
        id: uuid,
        name: 'Nuevo Proyecto de Desarrollo',
        matter: 'Desarrollo de un sistema de gestión interna',
        description:
          'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
        status: ProjectStatus.IN_PROCESS,
        category: ProjectCategory.GOVERNMENT,
        startDate: new Date('2023-04-01T00:00:00.000Z'),
        endDate: new Date('2023-12-01T00:00:00.000Z'),
        periodicity: ProjectPeriodicity.ONE_WEEK,
        isChargeable: true,
        area: SupportedDepartments.ACCOUNTING,
        createdAt: new Date('2024-04-19T01:23:49.555Z'),
        idCompany: clientUuid,
      };
      createProject.resolves(projectData);
      const newProject = await ProjectService.createProject(projectData);
      expect(newProject).to.equal(projectData);
    });
  });
  describe('getAllProjects', () => {
    let findAllStub: sinon.SinonStub;
    beforeEach(() => {
      findAllStub = sinon.stub(ProjectRepository, 'findAll');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return all projects', async () => {
      const projects = [
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo',
          matter: 'Desarrollo de un sistema de gestión interna',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROCESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          area: 'Client',
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: randomUUID(),
        },
        {
          id: randomUUID(),
          name: 'Nuevo Proyecto de Desarrollo 2',
          matter: 'Desarrollo de un sistema de gestión interna 2',
          description:
            'Este proyecto consiste en el desarrollo de un sistema de gestión interna para mejorar los procesos administrativos.',
          status: ProjectStatus.IN_PROCESS,
          category: 'Government',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          endDate: new Date('2023-12-01T00:00:00.000Z'),
          periodicity: '1 week',
          isChargeable: true,
          area: 'Client',
          createdAt: new Date('2024-04-19T01:23:49.555Z'),
          idCompany: randomUUID(),
        },
      ];

      findAllStub.resolves(projects);

      const getProjects = await ProjectService.getAllProjects();

      expect(getProjects).eql(projects);
    });
  });

  describe('getProjectById', () => {
    let findProjectByIdStub: Sinon.SinonStub;

    beforeEach(() => {
      findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
    });
    afterEach(() => {
      sinon.restore();
    });

    it('Should return the project information and client name acording its id', async () => {
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
      };

      findProjectByIdStub.resolves(existingProject);

      const res = await ProjectService.getProjectById(projectId);

      expect(res).to.exist;
      expect(res.id).to.equal(projectId);
      expect(res.matter).to.equal(existingProject.matter);
    });
  });

  describe('getProjectAndClientById', () => {
    let findProjectByIdStub: Sinon.SinonStub;
    let findCompanyByIdStub: Sinon.SinonStub;

    beforeEach(() => {
      findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
      findCompanyByIdStub = sinon.stub(CompanyRepository, 'findById');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('Should return the project information acording its id', async () => {
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
      };

      findProjectByIdStub.resolves(existingProject);
      findCompanyByIdStub.resolves(existingCompany);

      const res = await ProjectService.getProjectById(projectId);
      const res2 = await CompanyService.findById(companyId);

      expect(res).to.exist;
      expect(res.id).to.equal(projectId);
      expect(res.totalHours).to.equal(Number(28));
      expect(res.description).to.equal(existingProject.description);
      expect(res2.name).to.equal(existingCompany.name);
    });
  });
});
