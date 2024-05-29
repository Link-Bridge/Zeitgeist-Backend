import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { ProjectStatus, SupportedRoles, TaskStatus } from '../../../../utils/enums';
import { EmployeeTask } from '../../../domain/entities/employee-task.entity';
import { BareboneTask, ProjectDetailsTask, Task, UpdatedTask } from '../../../domain/entities/task.entity';
import { EmployeeTaskRepository } from '../../../infra/repositories/employee-task.repository';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ProjectRepository } from '../../../infra/repositories/project.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
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
  let deleteEmployeeTaskStub: sinon.SinonStub;
  let validateEmployeeTaskStub: sinon.SinonStub;
  let updateTaskRepositoryStub: sinon.SinonStub;
  let updateTaskStatusRepositoryStub: sinon.SinonStub;
  let updateTaskEndDateRepositoryStub: sinon.SinonStub;
  let findRoleByEmailStub: sinon.SinonStub;
  let findTasksByIdsStub: sinon.SinonStub;

  const idProject = randomUUID();
  const project = {
    id: idProject,
    name: 'Project',
    status: ProjectStatus.ACCEPTED,
    category: 'Internal',
    startDate: new Date('05-01-2021'),
    endDate: new Date('05-01-2042'),
    area: 'Legal',
    createdAt: new Date(),
    idCompany: randomUUID(),
  };

  const existingTasks: ProjectDetailsTask[] = [
    {
      id: randomUUID(),
      title: 'Zombie',
      description: 'Zombie',
      status: TaskStatus.DONE,
      startDate: new Date('05-01-2024'),
      endDate: new Date('05-02-2024'),
      createdAt: new Date(),
      idProject: idProject,
      employeeFirstName: faker.person.firstName(),
      employeeLastName: faker.person.lastName(),
    },
    {
      id: randomUUID(),
      title: 'Nether update',
      description:
        'The Nether is a dimension that is supposedly located below the Mother Rock in Minecraft. Its appearance is similar to the idea of hell, with many dark rocks and lava and magma plaguing the entire setting.',
      status: TaskStatus.POSTPONED,
      startDate: new Date('05-01-2024'),
      endDate: new Date('05-02-2024'),
      createdAt: new Date(),
      idProject: idProject,
      employeeFirstName: faker.person.firstName(),
      employeeLastName: faker.person.lastName(),
    },
  ];
  const idRole = randomUUID();
  const role = {
    id: idRole,
    title: SupportedRoles.ADMIN,
    createdAr: new Date(),
  };

  const employee = {
    id: randomUUID(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'joe.doe@email.com',
    imageUrl: 'http://example.com/john.jpg',
    createdAt: new Date(),
    idRole: idRole,
  };

  const task: BareboneTask = {
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    startDate: new Date('05-01-2021'),
    endDate: new Date('05-01-2042'),
    workedHours: faker.number.int() % 1000,
    idProject: idProject,
    idEmployee: randomUUID(),
  };

  const createdTask: Task = {
    id: randomUUID(),
    title: task.title,
    description: task.description,
    status: task.status,
    startDate: new Date('05-01-2024'),
    endDate: new Date('05-02-2024'),
    workedHours: task.workedHours ?? undefined,
    createdAt: new Date(),
    idProject: task.idProject,
  };

  const updatedTask: UpdatedTask = {
    id: createdTask.id,
    title: createdTask.title,
    description: createdTask.description,
    status: createdTask.status,
    startDate: new Date('05-01-2023'),
    endDate: new Date('05-02-2024'),
    workedHours: createdTask.workedHours,
    idProject: createdTask.idProject,
    idEmployee: randomUUID(),
  };

  const updatedEmployeeTask = {
    id: randomUUID(),
    idEmployee: updatedTask.idEmployee,
    idTask: updatedTask.id,
  };

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
    deleteEmployeeTaskStub = sinon.stub(EmployeeTaskRepository, 'deleteByTaskId');
    validateEmployeeTaskStub = sinon.stub(EmployeeTaskRepository, 'validateEmployeeTask');
    updateTaskRepositoryStub = sinon.stub(TaskRepository, 'updateTask');
    updateTaskStatusRepositoryStub = sinon.stub(TaskRepository, 'updateTaskStatus');
    updateTaskEndDateRepositoryStub = sinon.stub(TaskRepository, 'updateTaskEndDate');
    findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
    findTasksByIdsStub = sinon.stub(EmployeeTaskRepository, 'findByTaskIds');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createTask', () => {
    it('Should create missing attributes and send them to the repository', async () => {
      projectRepositoryStub.resolves(project);
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves({ id: task.idEmployee });
      employeeTaskRepositoryStub.resolves({ id: randomUUID() });
      const emitterEmail = faker.internet.email();

      const result = await TaskService.createTask(task, emitterEmail);

      expect(result).to.deep.equal(createdTask);
    });

    it('Should throw an error if the project ID is not valid', async () => {
      projectRepositoryStub.withArgs(idProject).resolves(null);
      const emitterEmail = faker.internet.email();

      try {
        await TaskService.createTask(task, emitterEmail);
      } catch (error: any) {
        expect(error.message).to.equal('Requested Project ID was not found');
      }
    });

    it('Should throw an error if the task already exists', async () => {
      projectRepositoryStub.resolves(project);
      taskRepositoryStub.resolves(null);
      const emitterEmail = faker.internet.email();

      try {
        await TaskService.createTask(task, emitterEmail);
      } catch (error: any) {
        expect(error.message).to.equal('Task already exists');
      }
    });

    it('Should throw an error if the employee is not found', async () => {
      projectRepositoryStub.resolves(project);
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves(null);
      const emitterEmail = faker.internet.email();

      try {
        await TaskService.createTask(task, emitterEmail);
      } catch (error: any) {
        expect(error.message).to.equal('Requested Employee was not found');
      }
    });

    it('Should throw an error if an error occurs when assigning the task to the employee', async () => {
      projectRepositoryStub.resolves(project);
      taskRepositoryStub.resolves(createdTask);
      employeeRepositoryStub.resolves({ id: task.idEmployee });
      employeeTaskRepositoryStub.resolves(null);
      const emitterEmail = faker.internet.email();

      try {
        await TaskService.createTask(task, emitterEmail);
      } catch (error: any) {
        expect(error.message).to.equal('Error assigning a task to an employee');
      }
    });
  });

  describe('getTasksFromProject', () => {
    it('Should get an array of tasks from the repository', async () => {
      taskFetchRepositoryStub.resolves(existingTasks);
      findRoleByEmailStub.resolves(role);
      projectRepositoryStub.resolves(project);

      findTasksByIdsStub.resolves(
        existingTasks.map(task => ({
          idTask: task.id,
          idEmployee: employee.id,
        }))
      );

      employeeRepositoryStub.resolves({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      });

      const result = await TaskService.getTasksFromProject(idProject, employee.email);

      expect(result).to.deep.equal(
        existingTasks.map(task => ({
          ...task,
          employeeFirstName: employee.firstName,
          employeeLastName: employee.lastName,
        }))
      );
      expect(taskFetchRepositoryStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the task could not be created', async () => {
      taskFetchRepositoryStub.withArgs(existingTasks).throws(new Error('An unexpected error occurred'));

      try {
        await TaskService.getTasksFromProject(idProject, employee.email);
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('An unexpected error occurred');
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
        idProject: idProject,
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
        expect(error.message).to.equal('Requested Employee was not found');
      }
    });

    it('Should throw an error if the employee has no assigned tasks', async () => {
      const employeeId = randomUUID();
      employeeRepositoryStub.resolves({ id: employeeId });
      employeeTaskFindByIdStub.withArgs(employeeId).resolves(null);

      try {
        await TaskService.getTasksAssignedToEmployee(employeeId);
      } catch (error: any) {
        expect(error.message).to.equal('Requested Task assigned to employee was not found');
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
        expect(error.message).to.equal('Could not fetch tasks');
      }
    });
  });

  describe('deleteTaskById', () => {
    it('Should delete a task from the repository', async () => {
      deleteEmployeeTaskStub.resolves();
      deleteTaskStub.resolves();

      await TaskService.deleteTask(randomUUID());

      expect(deleteTaskStub.calledOnce).to.be.true;
    });

    it('Should throw a NotFoundError if the task could not be found', async () => {
      deleteEmployeeTaskStub.resolves();
      findTaskByIdStub.withArgs(randomUUID()).resolves(null);

      try {
        await TaskService.deleteTask(randomUUID());
      } catch (error: any) {
        expect(error.message).to.equal('Requested Task was not found');
      }

      expect(findTaskByIdStub.calledOnce).to.be.true;
    });

    it('Should throw an error if the task could not be deleted', async () => {
      deleteEmployeeTaskStub.resolves();
      deleteTaskStub.rejects(new Error('Could not delete task'));

      try {
        await TaskService.deleteTask(randomUUID());
      } catch (error: any) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Could not delete task');
      }

      expect(deleteTaskStub.calledOnce).to.be.true;
    });
  });

  describe('updateTask', () => {
    it('Should update a task in the repository', async () => {
      findTaskByIdStub.resolves({ id: createdTask.id });
      validateEmployeeTaskStub.resolves({ idEmployee: randomUUID(), idTask: randomUUID() });
      employeeTaskRepositoryStub.resolves(updatedEmployeeTask);
      deleteEmployeeTaskStub.resolves({ idTask: createdTask.id });
      projectRepositoryStub.resolves(project);
      updateTaskRepositoryStub.resolves(updatedTask);
      employeeRepositoryStub.resolves({ id: randomUUID() });

      const result = await TaskService.updateTask(createdTask.id, updatedTask);
      expect(result).to.deep.equal(updatedTask);
    });

    it('Should throw an error if the idTask is not valid', async () => {
      findTaskByIdStub.resolves(null);

      try {
        await TaskService.updateTask('', updatedTask);
      } catch (error: any) {
        expect(error.message).to.equal('Task ID is not valid');
      }
    });

    it('Should throw an error if the EmployeeTask could not be created', async () => {
      findTaskByIdStub.resolves({ id: createdTask.id });
      validateEmployeeTaskStub.resolves(null);
      const invalidEmployeeTask = { ...updatedEmployeeTask, idEmployee: '' };

      try {
        await TaskService.updateTask(createdTask.id, invalidEmployeeTask);
      } catch (error: any) {
        expect(error.message).to.equal('Error assigning a task to an employee');
      }
    });
  });

  describe('updateTaskStatus', () => {
    it('Should update a task status in the repository', async () => {
      findTaskByIdStub.resolves({ id: createdTask.id });
      updateTaskStatusRepositoryStub.resolves(true);
      const result = await TaskService.updateTaskStatus(createdTask.id, TaskStatus.CANCELLED);
      expect(result).to.be.true;
    });

    it('Should update the endDate to today when status is Done', async () => {
      findTaskByIdStub.resolves({ id: createdTask.id });
      updateTaskStatusRepositoryStub.resolves(true);
      updateTaskEndDateRepositoryStub.resolves(true);
      const result = await TaskService.updateTaskStatus(createdTask.id, TaskStatus.DONE);
      expect(result).to.be.true;
    });
  });
});

describe('TaskService', () => {
  let findTaskByIdStub: sinon.SinonStub;
  let findProjectByIdStub: sinon.SinonStub;
  let findEmployeeByIdStub: sinon.SinonStub;
  let findAllEmployeeTaskStub: sinon.SinonStub;
  let findRoleByEmailStub: sinon.SinonStub;

  beforeEach(() => {
    findTaskByIdStub = sinon.stub(TaskRepository, 'findTaskById');
    findProjectByIdStub = sinon.stub(ProjectRepository, 'findById');
    findEmployeeByIdStub = sinon.stub(EmployeeRepository, 'findById');
    findAllEmployeeTaskStub = sinon.stub(EmployeeTaskRepository, 'findAll');
    findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
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
        employeeId: employeeId,
      };

      findTaskByIdStub.resolves(existingTask);
      findProjectByIdStub.resolves(existingProject);
      findEmployeeByIdStub.resolves(existingEmployee);
      findAllEmployeeTaskStub.resolves(existingEmployeeTask);
      findRoleByEmailStub.resolves(existingRole);

      const result = await TaskService.findUnique(taskId, existingEmployee.email);

      expect(result).to.eql(taskDetail);
      expect(findTaskByIdStub.calledOnce).to.be.true;
      expect(findProjectByIdStub.calledOnce).to.be.true;
      expect(findEmployeeByIdStub.calledOnce).to.be.true;
      expect(findAllEmployeeTaskStub.calledOnce).to.be.true;
      expect(findRoleByEmailStub.calledOnce).to.be.true;
    });

    it('should throw an error if the task id does not exist', async () => {
      const errorMessage = 'An unexpected error occurred';
      findTaskByIdStub.rejects(new Error(errorMessage));

      await expect(TaskService.findUnique(randomUUID(), randomUUID())).to.be.rejectedWith(Error, errorMessage);
    });
  });
});
