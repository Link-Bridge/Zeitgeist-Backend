import { Decimal } from '@prisma/client/runtime/library';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { SupportedRoles } from '../../../../utils/enums';
import { CompanyRepository } from '../../../infra/repositories/company.repository';
import { EmployeeTaskRepository } from '../../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { HomeService } from '../home.service';

chai.use(chaiAsPromised);

describe('HomeService', () => {
  let findAllProjectsStub: sinon.SinonStub;
  let findTaskByEmployeeIdStub: sinon.SinonStub;
  let findAllTasksStub: sinon.SinonStub;
  let findAllCompaniesStub: sinon.SinonStub;
  let findEmployeeByEmail: sinon.SinonStub;
  let findEmployeeById: sinon.SinonStub;
  let findRoleById: sinon.SinonStub;

  beforeEach(() => {
    findAllProjectsStub = sinon.stub(ProjectRepository, 'findAllByRole');
    findTaskByEmployeeIdStub = sinon.stub(EmployeeTaskRepository, 'findByEmployeeId');
    findAllTasksStub = sinon.stub(TaskRepository, 'findAll');
    findAllCompaniesStub = sinon.stub(CompanyRepository, 'findAll');
    findEmployeeByEmail = sinon.stub(EmployeeRepository, 'findByEmail');
    findEmployeeById = sinon.stub(EmployeeRepository, 'findById');
    findRoleById = sinon.stub(RoleRepository, 'findById');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getHomeInfo', () => {
    it('should return the projects an employee has assigned and the companies of those projects', async () => {
      const employeeId = randomUUID();

      const accountingRole = randomUUID();

      const role = {
        title: SupportedRoles.ACCOUNTING,
        createdAr: new Date(),
      };

      const employee = {
        id: employeeId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'joe.doe@email.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: accountingRole,
      };

      const companyId = randomUUID();
      const companyId2 = randomUUID();
      const existingCompanies = [
        {
          id: companyId,
          name: 'Tecnológico de Monterrey',
          email: 'tec@itesm.mx',
          phoneNumber: '4421234567',
          landlinePhone: '4420987654',
          archived: false,
          createdAt: new Date(),
        },
        {
          id: companyId2,
          name: 'Oracle',
          email: 'support@oracle.com.mx',
          phoneNumber: '4421234567',
          landlinePhone: '4420987654',
          archived: true,
          createdAt: new Date(),
        },
      ];

      const projectId = randomUUID();
      const projectId2 = randomUUID();
      const existingProjects = [
        {
          id: projectId,
          name: 'ITESM Project',
          matter: 'SAT',
          description: 'ITESM Project description',
          status: 'IN PROGRESS',
          totalHours: new Decimal(100),
          startDate: new Date(),
          createdAt: new Date(),
          idCompany: companyId,
        },
        {
          id: projectId2,
          name: 'Oracle Cloud',
          matter: 'OCI',
          description: 'The cloud',
          status: 'ACCEPTED',
          totalHours: new Decimal(100),
          startDate: new Date(),
          createdAt: new Date(),
          idCompany: companyId2,
        },
      ];

      const taskId = randomUUID();
      const taskId2 = randomUUID();
      const existingTasks = [
        {
          id: taskId,
          title: 'ITESM task',
          description: 'ITESM task description',
          status: 'DELAYED',
          startDate: new Date(),
          workedHours: 100,
          createdAt: new Date(),
          idProject: projectId,
        },
        {
          id: taskId2,
          title: 'Oracle task',
          description: 'ORACLE task description',
          status: 'CANCELLED',
          startDate: new Date(),
          workedHours: 100,
          createdAt: new Date(),
          idProject: projectId2,
        },
      ];

      const existingEmployeeTasks = [
        {
          id: randomUUID(),
          createdAt: new Date(),
          idEmployee: employeeId,
          idTask: taskId,
        },
        {
          id: randomUUID(),
          createdAt: new Date(),
          idEmployee: employeeId,
          idTask: taskId2,
        },
      ];

      findEmployeeByEmail.resolves(employee);
      findEmployeeById.resolves(employee);
      findRoleById.resolves(role);

      findAllProjectsStub.resolves(existingProjects);
      findAllCompaniesStub.resolves(existingCompanies);
      findAllTasksStub.resolves(existingTasks);
      findTaskByEmployeeIdStub.resolves(existingEmployeeTasks);

      const home = {
        projects: existingProjects,
        companies: existingCompanies,
      };

      const result = await HomeService.getMyInfo(employeeId);

      expect(result).to.eql(home);
      expect(findAllCompaniesStub.calledOnce).to.be.true;
      expect(findAllProjectsStub.calledOnce).to.be.true;
      expect(findAllTasksStub.calledOnce).to.be.true;
      expect(findTaskByEmployeeIdStub.calledOnce).to.be.true;
    });

    it('should throw an error if the employee id does not exist', async () => {
      const errorMessage = 'An unexpected error occurred';
      findTaskByEmployeeIdStub.rejects(new Error(errorMessage));

      await expect(HomeService.getMyInfo(randomUUID())).to.be.rejectedWith(Error, errorMessage);
    });
  });
});
