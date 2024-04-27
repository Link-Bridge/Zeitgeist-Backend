import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { TaskStatus } from '../../../../utils/enums';
import { BareboneTask, Task } from '../../../domain/entities/task.entity';
import { EmployeeTaskRepository } from '../../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { TaskService } from '../task.service';

describe('Task Service', () => {
  let taskRepositoryStub: sinon.SinonStub;
  let projectRepositoryStub: sinon.SinonStub;
  let employeeRepositoryStub: sinon.SinonStub;
  let employeeTaskRepositoryStub: sinon.SinonStub;

  beforeEach(() => {
    taskRepositoryStub = sinon.stub(TaskRepository, 'createTask');
    projectRepositoryStub = sinon.stub(ProjectRepository, 'findById');
    employeeRepositoryStub = sinon.stub(EmployeeRepository, 'findById');
    employeeTaskRepositoryStub = sinon.stub(EmployeeTaskRepository, 'create');
  });

  afterEach(() => {
    sinon.restore();
  });

  const projectID = randomUUID();
  const task: BareboneTask = {
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    startDate: faker.date.recent(),
    dueDate: faker.date.future(),
    workedHours: faker.number.int(),
    idProject: projectID,
    idEmployee: randomUUID(),
  };

  const createdTask: Task = {
    id: randomUUID(),
    title: task.title,
    description: task.description,
    status: task.status,
    startDate: task.startDate,
    endDate: task.dueDate ?? undefined,
    workedHours: task.workedHours ?? undefined,
    createdAt: new Date(),
    idProject: task.idProject,
  };

  describe('createTask', () => {
    it('Should create missing attributes and send them to the repository', async () => {
      projectRepositoryStub.resolves({ id: projectID });
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves({ id: task.idEmployee });
      employeeTaskRepositoryStub.resolves({ id: randomUUID() });

      const result = await TaskService.createTask(task);

      expect(result).to.deep.equal(createdTask);
    });

    it('Should throw an error if the project ID is not valid', async () => {
      projectRepositoryStub.withArgs(projectID).resolves(null);

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Requested Project ID  was not found');
      }
    });

    it('Should throw an error if the task already exists', async () => {
      projectRepositoryStub.resolves({ id: projectID });
      taskRepositoryStub.resolves(null);

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Task already exists');
      }
    });

    it('Should throw an error if the employee is not found', async () => {
      projectRepositoryStub.resolves({ id: projectID });
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves(null);

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Requested Employee was not found');
      }
    });

    it('Should throw an error if an error occurs when assigning the task to the employee', async () => {
      projectRepositoryStub.resolves({ id: projectID });
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves({ id: task.idEmployee });
      employeeTaskRepositoryStub.resolves(null);

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Error assigning a task to an employee');
      }
    });
  });
});
