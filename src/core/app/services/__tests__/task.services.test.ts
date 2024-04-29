import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { TaskStatus } from '../../../../utils/enums';
import { BareboneTask, Task, UpdatedTask } from '../../../domain/entities/task.entity';
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

describe('TaskService', () => {
  let findTaskByIdStub: sinon.SinonStub;
  let findProjectByIdStub: sinon.SinonStub;
  let findEmployeeByIdStub: sinon.SinonStub;
  let findAllEmployeeTaskStub: sinon.SinonStub;

  beforeEach(() => {
    findTaskByIdStub = sinon.stub(TaskRepository, 'findTaskById');
    findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
    findEmployeeByIdStub = sinon.stub(EmployeeRepository, 'findById');
    findAllEmployeeTaskStub = sinon.stub(EmployeeTaskRepository, 'findAll');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findTaskById', () => {
    it('should return a all data in the database of the selected taks', async () => {
      const projectId = randomUUID();
      const existingProject = {
        id: projectId,
        name: 'ITESM Project',
        matter: 'SAT',
        description: 'ITESM Project description',
        status: 'ACCEPTED',
        startDate: new Date(),
        createdAt: new Date(),
        idCompany: randomUUID(),
      };

      const employeeId = randomUUID();
      const existingEmployee = {
        id: employeeId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: randomUUID(),
      };

      const taskId = randomUUID();
      const existingTask = {
        id: taskId,
        title: 'ITESM task',
        description: 'ITESM task description',
        status: 'DELAYED',
        startDate: new Date(),
        workedHours: 100,
        createdAt: new Date(),
        idProject: projectId,
      };

      const employeeTaskId = randomUUID();
      const existingEmployeeTask = [
        {
          id: employeeTaskId,
          createdAt: new Date(),
          idEmployee: employeeId,
          idTask: taskId,
        },
      ];

      const taskDetail = {
        ...existingTask,
        projectName: existingProject.name,
        employeeFirstName: existingEmployee.firstName,
        employeeLastName: existingEmployee.lastName,
      };

      findTaskByIdStub.resolves(existingTask);
      findProjectByIdStub.resolves(existingProject);
      findEmployeeByIdStub.resolves(existingEmployee);
      findAllEmployeeTaskStub.resolves(existingEmployeeTask);

      const result = await TaskService.findUnique(taskId);

      expect(result).to.eql(taskDetail);
      expect(findTaskByIdStub.calledOnce).to.be.true;
      expect(findProjectByIdStub.calledOnce).to.be.true;
      expect(findEmployeeByIdStub.calledOnce).to.be.true;
      expect(findAllEmployeeTaskStub.calledOnce).to.be.true;
    });

    it('should throw an error if the task id does not exist', async () => {
      const errorMessage = 'An unexpected error occurred';
      findTaskByIdStub.rejects(new Error(errorMessage));

      await expect(TaskService.findUnique(randomUUID())).to.be.rejectedWith(Error, errorMessage);
    });
  });
});

describe('TaskService', () => {
  let taskRepositoryStub: sinon.SinonStub;
  let taskFindByIdRepositoryStub: sinon.SinonStub;
  let projectRepositoryStub: sinon.SinonStub;
  let employeeRepositoryStub: sinon.SinonStub;

  beforeEach(() => {
    taskRepositoryStub = sinon.stub(TaskRepository, 'updateTask');
    taskFindByIdRepositoryStub = sinon.stub(TaskRepository, 'findTaskById');
    projectRepositoryStub = sinon.stub(ProjectRepository, 'findById');
    employeeRepositoryStub = sinon.stub(EmployeeRepository, 'findById');
  });

  afterEach(() => {
    sinon.restore();
  });

  const taskToUpdate: UpdatedTask = {
    id: randomUUID(),
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
    workedHours: faker.number.int(),
    idProject: randomUUID(),
    idEmployee: randomUUID(),
  };

  const updatedTask: UpdatedTask = {
    id: taskToUpdate.id,
    title: taskToUpdate.title,
    description: taskToUpdate.description,
    status: taskToUpdate.status,
    startDate: taskToUpdate.startDate,
    endDate: taskToUpdate.endDate,
    workedHours: taskToUpdate.workedHours,
    idProject: taskToUpdate.idProject,
    idEmployee: taskToUpdate.idEmployee,
  };

  describe('updateTask', () => {
    it('Should update the task and send it to the repository', async () => {
      taskFindByIdRepositoryStub.resolves({ id: taskToUpdate.id });
      taskRepositoryStub.resolves(updatedTask);
      projectRepositoryStub.resolves({ id: taskToUpdate.idProject });
      employeeRepositoryStub.resolves({ id: taskToUpdate.idEmployee });

      const result = await TaskService.updateTask(taskToUpdate.id, updatedTask);

      expect(result).to.deep.equal(updatedTask);
    });
  });
});
