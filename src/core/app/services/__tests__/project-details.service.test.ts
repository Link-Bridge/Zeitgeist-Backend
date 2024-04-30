import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomUUID } from 'crypto';
import { default as Sinon, default as sinon } from 'sinon';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { CompanyService } from '../company.service';
import { ProjectService } from '../project.service';

chai.use(chaiAsPromised);

describe('ProjectService', () => {
  let findProjectByIdStub: Sinon.SinonStub;
  let findCompanyByIdStub: Sinon.SinonStub;

  beforeEach(() => {
    findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
    findCompanyByIdStub = sinon.stub(CompanyRepository, 'findById');
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('getProjectById', () => {
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
