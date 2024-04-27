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

describe('TaskService', () => {
  let taskRepositoryStub: sinon.SinonStub;
  let projectRepositoryStub: sinon.SinonStub;

  const projectID = randomUUID();

  const task: BareboneTask = {
    title: 'ABC Company Anual SAT Report',
    description: 'This is the anual SAT report for the ABC Company',
    status: TaskStatus.IN_PROGRESS,
    startDate: new Date('2022-01-01'),
    dueDate: new Date('2022-12-31'),
    waitingFor: 'Client',
    workedHours: 20,
    idProject: projectID,
  };

  const createdTask: Task = {
    id: randomUUID(),
    title: 'ABC Company Anual SAT Report',
    description: 'This is the anual SAT report for the ABC Company',
    status: TaskStatus.IN_PROGRESS,
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    waitingFor: 'Client',
    workedHours: 20,
    createdAt: new Date(),
    idProject: projectID,
  };

  beforeEach(() => {
    taskRepositoryStub = sinon.stub(TaskRepository, 'createTask');
    projectRepositoryStub = sinon.stub(ProjectRepository, 'findById');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createTask', () => {
    it('Should create missing attributes and send them to the repository', async () => {
      taskRepositoryStub.returns(createdTask);
      projectRepositoryStub.resolves({ id: projectID });

      const result = await TaskService.createTask(task);

      expect(result).to.deep.equal(createdTask);
      expect(taskRepositoryStub.calledOnce).to.be.true;
    });

    it('Should not create a new task if the project does not exist', async () => {
      projectRepositoryStub.resolves({});

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Project does not exist');
      }
    });

    it('Should return null if the task already exists', async () => {
      taskRepositoryStub.returns(null);
      projectRepositoryStub.resolves({ id: projectID });

      const result = await TaskService.createTask(task);

      expect(result).to.be.null;
      expect(taskRepositoryStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the task could not be created', async () => {
      taskRepositoryStub.withArgs(task).throws(new Error('Could not create task'));
      projectRepositoryStub.resolves({ id: projectID });

      try {
        await TaskService.createTask(task);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Could not create task');
      }
    });
  });
});

describe('findTaskById', () => {
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

  describe('getTaskById', () => {
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

      const result = await TaskService.getTaskById(taskId);

      expect(result).to.eql(taskDetail);
      expect(findTaskByIdStub.calledOnce).to.be.true;
      expect(findProjectByIdStub.calledOnce).to.be.true;
      expect(findEmployeeByIdStub.calledOnce).to.be.true;
      expect(findAllEmployeeTaskStub.calledOnce).to.be.true;
    });

    it('should throw an error if the task id does not exist', async () => {
      const errorMessage = 'An unexpected error occurred';
      findTaskByIdStub.rejects(new Error(errorMessage));

      await expect(TaskService.getTaskById(randomUUID())).to.be.rejectedWith(Error, errorMessage);
    });
  });
});
