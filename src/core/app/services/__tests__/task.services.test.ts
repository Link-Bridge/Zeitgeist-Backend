import { expect } from 'chai';
import { randomUUID } from 'crypto';
import sinon, { SinonStubbedInstance } from 'sinon';
import { TaskStatus } from '../../../../utils/enums';
import { Task } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../infra/repositories/tasks.repository';
import { TaskService } from '../task.services';

describe('TaskService', () => {
  let taskService: typeof TaskService;
  let taskRepository: SinonStubbedInstance<typeof TaskRepository>;

  beforeEach(() => {
    taskRepository = sinon.stub(TaskRepository);
    taskService = {
      ...TaskService,
      createTask: taskRepository.createTask,
    }
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createTask', () => {
    it('Should create a new task with the given data', async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Cmpany',
        description: 'Verify the SAT of the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      taskRepository.createTask.returns(Promise.resolve(newTask));
      const task = await taskService.createTask(newTask);

      expect(task).to.be.deep.equal(newTask);
      expect(taskRepository.createTask.calledOnce).to.be.true;
      expect(taskRepository.createTask.calledWith(newTask)).to.be.true;
    });

    it("Should throw an error if the task couldn't be created", async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Cmpany',
        description: 'Verify the SAT of the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      taskRepository.createTask.throws(new Error('Error creating task'));

      try {
        await taskService.createTask(newTask);
      } catch (error: any) {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.be.equal('Error creating task');
      }
    });

    it("Should return null if the task already exists", async () => {
      const newTask: Task = {
        id: randomUUID(),
        title: 'SAT Verification for ABC Cmpany',
        description: 'Verify the SAT of the ABC Company',
        status: TaskStatus.IN_PROGRESS,
        waitingFor: 'John Doe',
        startDate: new Date(),
        workedHours: 20,
        createdAt: new Date(),
        idProject: randomUUID(),
      };

      taskRepository.createTask.returns(Promise.resolve(null));
      const task = await taskService.createTask(newTask);

      expect(task).to.be.null;
      expect(taskRepository.createTask.calledOnce).to.be.true;
      expect(taskRepository.createTask.calledWith(newTask)).to.be.true;
    })
  });
});
