import { faker } from '@faker-js/faker';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
// import { RoleRepository } from '../../../infra/repositories/role.repository';
import { CompanyService } from '../company.service';

chai.use(chaiAsPromised);

describe('CompanyService', () => {
  let findAllCompaniesStub: sinon.SinonStub;
  let updateCompanyStub: sinon.SinonStub;
  let findCompanyByIdStub: sinon.SinonStub;
  let archiveClientdStub: sinon.SinonStub;
  let getArchivedStatusStub: sinon.SinonStub;
  let deleteCompanyByIdStub: sinon.SinonStub;
  // let findRoleByEmailStub: sinon.SinonStub;

  beforeEach(() => {
    findAllCompaniesStub = sinon.stub(CompanyRepository, 'findAll');
    updateCompanyStub = sinon.stub(CompanyRepository, 'update');
    findCompanyByIdStub = sinon.stub(CompanyRepository, 'findById');
    archiveClientdStub = sinon.stub(CompanyRepository, 'archiveClient');
    getArchivedStatusStub = sinon.stub(CompanyRepository, 'getArchivedStatus');
    deleteCompanyByIdStub = sinon.stub(CompanyRepository, 'deleteCompanyById');
    // findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return an array of all companies', async () => {
    const mockData = prepareMockData();
    findAllCompaniesStub.resolves(mockData.existingCompanies);

    const res = await CompanyService.findAll();

    expect(res).to.deep.equal(mockData.existingCompanies);
    expect(res).to.have.lengthOf(2);
  });

  it('should match the name of the companies', async () => {
    const mockData = prepareMockData();
    findAllCompaniesStub.resolves(mockData.existingCompanies);

    const res = await CompanyService.findAll();

    expect(res[0].name).to.equal('Zeitgeist');
    expect(res[1].name).to.equal('Microsoft');
  });

  it('should update a company and return the updated entity', async () => {
    const fakeCompany = prepareSingleFakeCompany();
    findCompanyByIdStub.resolves(fakeCompany.original);
    updateCompanyStub.resolves(fakeCompany.updated);

    const result = await CompanyService.update(fakeCompany.updatePayload);

    expect(result).to.deep.equal(fakeCompany.updated);
  });

  it('should update the archived status of a company', async () => {
    const idCompany1 = randomUUID();
    const company = {
      id: idCompany1,
      name: faker.company.name(), // Usar Faker para generar un nombre de empresa falso
      email: faker.internet.email(), // Usar Faker para generar un correo electrónico falso
      phoneNumber: faker.phone.number().toString(), // Usar Faker para generar un número de teléfono falso
      landlinePhone: faker.phone.number().toString(),
      archived: false,
      createdAt: new Date(),
      updatedAt: null,
      idCompanyDirectContact: null,
      idForm: null,
    };

    findCompanyByIdStub.resolves(company);
    getArchivedStatusStub.resolves(company.archived);
    archiveClientdStub.resolves({ ...company, archived: !company.archived });

    const updatedCompany = await CompanyService.archiveClient(idCompany1);

    expect(findCompanyByIdStub.calledOnceWith(idCompany1)).to.be.false;
    expect(getArchivedStatusStub.calledOnceWith(idCompany1)).to.be.true;

    expect(archiveClientdStub.calledOnceWith(idCompany1, company.archived)).to.be.false;
    expect(updatedCompany.archived).to.be.true;
  });

  describe('deleteCompanyById', () => {
    const companyId = randomUUID();
    const nonExistentCompanyId = randomUUID();

    it('should delete a company from the repository', async () => {
      deleteCompanyByIdStub.withArgs(companyId).resolves();

      await CompanyService.deleteCompanyById(companyId);

      expect(deleteCompanyByIdStub.calledOnceWith(companyId)).to.be.true;
    });

    it('should throw an error if the company does not exist', async () => {
      deleteCompanyByIdStub.withArgs(nonExistentCompanyId).rejects(new Error('Company not found'));

      await expect(CompanyService.deleteCompanyById(nonExistentCompanyId)).to.be.rejectedWith('Company not found');

      expect(deleteCompanyByIdStub.calledOnceWith(nonExistentCompanyId)).to.be.true;
    });
  });

  it('should get a single company', async () => {
    const idCompany1 = randomUUID();
    const company = {
      id: idCompany1,
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

    findCompanyByIdStub.resolves(company);
    const aCompany = await CompanyService.findById(idCompany1);

    expect(findCompanyByIdStub.calledWith(idCompany1)).to.be.true;
    expect(aCompany).to.eql(company);
  });
});

function prepareMockData() {
  const idCompany1 = randomUUID();
  const idCompany2 = randomUUID();
  const existingCompanies = [
    {
      id: idCompany1,
      name: 'Zeitgeist',
      email: 'info@zeitgeist.mx',
      phoneNumber: '1234567890',
      landlinePhone: '0987654321',
      archived: false,
      constitutionDate: new Date(),
      rfc: 'ASDF907856RFT',
      taxResidence: 'Epigmenio Gonzalez 123',
      createdAt: new Date(),
      updatedAt: null,
      idCompanyDirectContact: null,
      idForm: null,
    },
    {
      id: idCompany2,
      name: 'Microsoft',
      email: 'info@microsoft.com',
      phoneNumber: '1234567890',
      landlinePhone: '0987654321',
      archived: false,
      constitutionDate: new Date(),
      rfc: 'ASDF907856RFT',
      taxResidence: 'Epigmenio Gonzalez 123',
      createdAt: new Date(),
      updatedAt: null,
      idCompanyDirectContact: null,
      idForm: null,
    },
  ];

  return { existingCompanies };
}

function prepareSingleFakeCompany() {
  const fakeId = randomUUID();
  const original = {
    id: fakeId,
    name: 'Old Company Name',
    email: 'oldemail@example.com',
    phoneNumber: '+123456789012',
    landlinePhone: '+123456789012',
    archived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const updated = {
    ...original,
    name: 'New Company Name',
    email: 'newemail@example.com',
  };
  const updatePayload = {
    id: fakeId,
    name: 'New Company Name',
    email: 'newemail@example.com',
    phoneNumber: '+123456789012',
    landlinePhone: '+123456789012',
    archived: false,
  };
  return { original, updated, updatePayload };
}
