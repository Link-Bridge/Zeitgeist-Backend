import { faker } from '@faker-js/faker';
import { Decimal } from '@prisma/client/runtime/library';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { ProjectStatus, SupportedRoles, TaskStatus } from '../../../../utils/enums';
import { CompanyEntity } from '../../../domain/entities/company.entity';
import { EmployeeTask } from '../../../domain/entities/employee-task.entity';
import { EmployeeEntity } from '../../../domain/entities/employee.entity';
import { ProjectEntity } from '../../../domain/entities/project.entity';
import { RoleEntity } from '../../../domain/entities/role.entity';
import { Task } from '../../../domain/entities/task.entity';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { EmployeeTaskRepository } from '../../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { HomeService } from '../home.service';

describe('HomeService', () => {
  let findByEmployeeId: sinon.SinonStub;
  let findRoleById: sinon.SinonStub;
  let findProjectsByRole: sinon.SinonStub;
  let findEmployeeTasks: sinon.SinonStub;
  let findTasks: sinon.SinonStub;
  let findCompanies: sinon.SinonStub;

  beforeEach(() => {
    findByEmployeeId = sinon.stub(EmployeeRepository, 'findById');
    findRoleById = sinon.stub(RoleRepository, 'findById');
    findProjectsByRole = sinon.stub(ProjectRepository, 'findAllByRole');
    findEmployeeTasks = sinon.stub(EmployeeTaskRepository, 'findByEmployeeId');
    findTasks = sinon.stub(TaskRepository, 'findAll');
    findCompanies = sinon.stub(CompanyRepository, 'findAll');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getMyInfo', () => {
    it('Should return the user info', async () => {
      const employee: EmployeeEntity = {
        id: randomUUID(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        imageUrl: faker.image.url(),
        createdAt: faker.date.recent(),
        idRole: randomUUID(),
      };

      const role: RoleEntity = {
        id: employee.idRole,
        title: faker.helpers.enumValue(SupportedRoles),
        createdAt: faker.date.recent(),
      };

      const MIN_PROJECTS = 5;
      const MIN_TASKS_PER_PROJECT = 2;

      const companies: CompanyEntity[] = Array.from({ length: 3 }, () => ({
        id: randomUUID(),
        name: faker.company.name(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        landlinePhone: faker.phone.number(),
        archived: faker.datatype.boolean(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      }));

      const projects: ProjectEntity[] = Array.from({ length: MIN_PROJECTS }, (_, index) => ({
        id: randomUUID(),
        name: faker.word.sample(),
        matter: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        category: faker.word.words(3),
        status: faker.helpers.enumValue(ProjectStatus),
        totalHours: new Decimal(faker.number.int()),
        startDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        idCompany: companies[index % companies.length].id,
      }));

      const tasks: Task[] = Array.from({ length: projects.length * MIN_TASKS_PER_PROJECT }, (_, index) => ({
        id: randomUUID(),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        status: faker.helpers.enumValue(TaskStatus),
        startDate: faker.date.recent(),
        workedHours: faker.number.int(),
        createdAt: faker.date.recent(),
        idProject: projects[index % projects.length].id,
      }));

      const employeeTasks: EmployeeTask[] = Array.from(
        { length: projects.length * MIN_TASKS_PER_PROJECT },
        (_, index) => ({
          id: randomUUID(),
          createdAt: faker.date.recent(),
          idEmployee: employee.id,
          idTask: tasks[index].id,
        })
      );

      findByEmployeeId.withArgs(employee.id).resolves(employee);
      findRoleById.withArgs(employee.idRole).returns(role);
      findProjectsByRole.withArgs(role.title).resolves(projects);
      findEmployeeTasks.withArgs(employee.id).resolves(employeeTasks);
      findTasks.resolves(tasks);
      findCompanies.resolves(companies);

      const result = await HomeService.getMyInfo(employee.id);

      expect(result).to.be.an('object');

      expect(result).to.have.property('projects').to.be.an('array');
      expect(result.projects).to.deep.equal(projects);
      expect(result.projects).to.have.lengthOf(5);

      expect(result).to.have.property('companies').to.be.an('array');
      expect(result.companies).to.deep.equal(companies);
      expect(result.companies).to.have.lengthOf(3);

      sinon.assert.calledOnce(findByEmployeeId);
      sinon.assert.calledOnce(findRoleById);
      sinon.assert.calledOnce(findProjectsByRole);
      sinon.assert.calledOnce(findEmployeeTasks);
      sinon.assert.calledOnce(findTasks);
      sinon.assert.calledOnce(findCompanies);
    });

    it('Should throw an error if the employee does not exist', async () => {
      const employeeId = randomUUID();

      findByEmployeeId.withArgs(employeeId).resolves(null);

      try {
        await HomeService.getMyInfo(employeeId);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error: Requested Employee was not found');
      }

      sinon.assert.calledOnce(findByEmployeeId);
    });

    it('Should throw an error if an error occurs', async () => {
      const employeeId = randomUUID();

      findByEmployeeId.withArgs(employeeId).throws(new Error('An unexpected error occurred'));

      try {
        await HomeService.getMyInfo(employeeId);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error: An unexpected error occurred');
      }
    });

    it('Should throw an error if the role does not exist', async () => {
      const employee: EmployeeEntity = {
        id: randomUUID(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        imageUrl: faker.image.url(),
        createdAt: faker.date.recent(),
        idRole: randomUUID(),
      };

      findByEmployeeId.withArgs(employee.id).resolves(employee);
      findRoleById.withArgs(employee.idRole).resolves(null);

      try {
        await HomeService.getMyInfo(employee.id);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error: Requested Role was not found');
      }

      sinon.assert.calledOnce(findByEmployeeId);
      sinon.assert.calledOnce(findRoleById);
    });
  });
});
