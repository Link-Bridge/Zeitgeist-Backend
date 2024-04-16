import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { instance, mock, resetCalls, when } from 'ts-mockito';
import { TaskStatus } from '../../../../utils/enums/index';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { Task } from '../../interfaces/project-report.interface';
import { TaskService } from '../task.services';

describe('TaskService', () => {
  let taskService: typeof TaskService;
  let taskRepositoryMock: typeof TaskRepository;
  let taskMockInstance: typeof TaskRepository;

  beforeEach(() => {
    taskRepositoryMock = mock<typeof TaskRepository>();
    taskMockInstance = instance(taskRepositoryMock);
    taskService = {
      ...TaskService,
      createTask: (newTask: Task) => taskMockInstance.createTask(newTask),
    };
  });

  afterEach(() => {
    resetCalls(taskRepositoryMock);
  });

  describe('createTask', () => {
    it('Should create a new task with the given data', async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Company',
        description: 'Verify the SAT information for the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      when(taskRepositoryMock.createTask(newTask)).thenResolve(newTask);
      const createdTask = await taskService.createTask(newTask);

      expect(createdTask).to.deep.equal(newTask);
    });

    it('Should return null if the task already exists', async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Company',
        description: 'Verify the SAT information for the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      when(taskRepositoryMock.findTaskById(newTask.id)).thenResolve(newTask);
      const createdTask = await taskService.createTask(newTask);

      expect(createdTask).to.be.null;
    });

    it('Should throw an error if the task could not be created', async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Company',
        description: 'Verify the SAT information for the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      when(taskRepositoryMock.findTaskById(newTask.id)).thenReject(new Error('Error creating task'));

      try {
        await taskService.createTask(newTask);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });
});
