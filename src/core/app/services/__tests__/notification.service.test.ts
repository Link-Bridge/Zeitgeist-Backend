import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import sinon from 'sinon';
import { Task } from '../../../domain/entities/task.entity';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { NotificationService } from '../notification.service';

describe('NotificationService', () => {
  let findById: sinon.SinonStub;

  beforeEach(() => {
    findById = sinon.stub(EmployeeRepository, 'findById');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should send a notification with the assigned task to the employee', async () => {
    findById.resolves({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      imageUrl: faker.image.url(),
      createdAt: new Date(),
    });
    const result = await NotificationService.sendAssignedTaskNotification(faker.string.uuid(), {} as Task);

    expect(result).to.be.undefined;
  });
});
