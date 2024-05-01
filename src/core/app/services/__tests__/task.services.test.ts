import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { TaskStatus } from '../../../../utils/enums';
import { EmployeeTask } from '../../../domain/entities/employee-task.entity';
import { BareboneTask, Task } from '../../../domain/entities/task.entity';
import { EmployeeTaskRepository } from '../../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { TaskService } from '../task.service';

describe('Task Service', () => {
  let taskRepositoryStub: sinon.SinonStub;
  let projectRepositoryStub: sinon.SinonStub;
  let taskFetchRepositoryStub: sinon.SinonStub;
  let fetchMultipleTasksByIdsStub: sinon.SinonStub;
  let deleteTaskStub: sinon.SinonStub;
  let employeeRepositoryStub: sinon.SinonStub;
  let employeeTaskRepositoryStub: sinon.SinonStub;
  let employeeTaskFindByIdStub: sinon.SinonStub;
  let findTaskByIdStub: sinon.SinonStub;

  const idProject = 'fb6bde87-5890-4cf7-978b-8daa13f105f7';

  const existingTasks: Task[] = [
    {
      id: randomUUID(),
      title: 'Zombie',
      description: 'Zombie',
      status: TaskStatus.DONE,
      startDate: new Date(),
      createdAt: new Date(),
      idProject: 'fb6bde87-5890-4cf7-978b-8daa13f105f7',
    },
    {
      id: randomUUID(),
      title: 'Nether update',
      description:
        'The Nether is a dimension that is supposedly located below the Mother Rock in Minecraft. Its appearance is similar to the idea of hell, with many dark rocks and lava and magma plaguing the entire setting.',
      status: TaskStatus.POSTPONED,
      startDate: new Date(),
      createdAt: new Date(),
      idProject: 'fb6bde87-5890-4cf7-978b-8daa13f105f7',
    },
  ];

  beforeEach(() => {
    taskRepositoryStub = sinon.stub(TaskRepository, 'createTask');
    projectRepositoryStub = sinon.stub(ProjectRepository, 'findById');
    taskFetchRepositoryStub = sinon.stub(TaskRepository, 'findTasksByProjectId');
    employeeRepositoryStub = sinon.stub(EmployeeRepository, 'findById');
    employeeTaskRepositoryStub = sinon.stub(EmployeeTaskRepository, 'create');
    employeeTaskFindByIdStub = sinon.stub(EmployeeTaskRepository, 'findByEmployeeId');
    fetchMultipleTasksByIdsStub = sinon.stub(TaskRepository, 'findTasksById');
    deleteTaskStub = sinon.stub(TaskRepository, 'deleteTaskById');
    findTaskByIdStub = sinon.stub(TaskRepository, 'findTaskById');
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

  describe('getTasksFromProject', () => {
    it('Should get an array of tasks from the repository', async () => {
      taskFetchRepositoryStub.resolves(existingTasks);

      const result = await TaskService.getTasksFromProject(idProject);

      expect(result).to.deep.equal(existingTasks);
      expect(taskFetchRepositoryStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the task could not be created', async () => {
      taskFetchRepositoryStub.withArgs(existingTasks).throws(new Error('Could not get tasks'));

      try {
        await TaskService.getTasksFromProject(idProject);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Could not get tasks');
      }
    });
  });

  describe('getTasksByEmployeeId', () => {
    it('Should get an array of tasks from the repository', async () => {
      const employeeId = randomUUID();
      const employeeTasks: EmployeeTask[] = [
        {
          id: randomUUID(),
          createdAt: faker.date.recent(),
          idEmployee: employeeId,
          idTask: randomUUID(),
        },
        {
          id: randomUUID(),
          createdAt: faker.date.recent(),
          idEmployee: employeeId,
          idTask: randomUUID(),
        },
      ];

      const assignedTasks = Array.from({ length: 5 }, () => ({
        id: randomUUID(),
        title: faker.lorem.words(3),
        description: faker.lorem.words(10),
        status: faker.helpers.arrayElement(Object.values(TaskStatus)),
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        workedHours: faker.number.int(),
        createdAt: new Date(),
        idProject: projectID,
      }));

      employeeRepositoryStub.resolves({ id: employeeId });
      employeeTaskFindByIdStub.resolves(employeeTasks);
      fetchMultipleTasksByIdsStub.resolves(assignedTasks);

      const result = await TaskService.getTasksAssignedToEmployee(employeeId);

      expect(result).to.deep.equal(assignedTasks);
      expect(employeeTaskFindByIdStub.calledOnce).to.be.true;
      expect(fetchMultipleTasksByIdsStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the employee is not found', async () => {
      const employeeId = randomUUID();
      employeeRepositoryStub.withArgs(employeeId).resolves(null);

      try {
        await TaskService.getTasksAssignedToEmployee(employeeId);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Requested Employee was not found');
      }
    });

    it('Should throw an error if the employee has no assigned tasks', async () => {
      const employeeId = randomUUID();
      employeeRepositoryStub.resolves({ id: employeeId });
      employeeTaskFindByIdStub.withArgs(employeeId).resolves(null);

      try {
        await TaskService.getTasksAssignedToEmployee(employeeId);
      } catch (error: any) {
        expect(error.message).to.equal('Error: Requested Task assigned to employee was not found');
      }
    });

    it('Should throw an error if the tasks could not be fetched', async () => {
      const employeeId = randomUUID();
      const employeeTasks: EmployeeTask[] = [
        {
          id: randomUUID(),
          createdAt: faker.date.recent(),
          idEmployee: employeeId,
          idTask: randomUUID(),
        },
        {
          id: randomUUID(),
          createdAt: faker.date.recent(),
          idEmployee: employeeId,
          idTask: randomUUID(),
        },
      ];

      employeeRepositoryStub.resolves({ id: employeeId });
      employeeTaskFindByIdStub.resolves(employeeTasks);
      fetchMultipleTasksByIdsStub.rejects(new Error('Could not fetch tasks'));

      try {
        await TaskService.getTasksAssignedToEmployee(employeeId);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error: Could not fetch tasks');
      }
    });
  });

  describe('deleteTaskById', () => {
    it('Should delete a task from the repository', async () => {
      deleteTaskStub.resolves();

      await TaskService.deleteTask(randomUUID());

      expect(deleteTaskStub.calledOnce).to.be.true;
    });

    it('Should throw a NotFoundError if the task could not be found', async () => {
      findTaskByIdStub.withArgs(randomUUID()).resolves(null);

      try {
        await TaskService.deleteTask(randomUUID());
      } catch (error: any) {
        expect(error.message).to.equal('Error: Requested Task was not found');
      }

      expect(findTaskByIdStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the task could not be deleted', async () => {
      deleteTaskStub.rejects(new Error('Could not delete task'));

      try {
        await TaskService.deleteTask(randomUUID());
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Error: Could not delete task');
      }

      expect(deleteTaskStub.calledOnce).to.be.true;
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
