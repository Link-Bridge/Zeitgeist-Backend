import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { EmployeeService } from '../employee.service';
chai.use(chaiAsPromised);

describe('EmployeeService', () => {
  let findByEmailStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let existByEmailStub: sinon.SinonStub;

  beforeEach(() => {
    findByEmailStub = sinon.stub(EmployeeRepository, 'findByEmail');
    createStub = sinon.stub(EmployeeRepository, 'create');
    existByEmailStub = sinon.stub(EmployeeRepository, 'existByEmail');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Create employee function', () => {
    it('should return an existing employee if email is already registered', async () => {
      const existingEmployee = {
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        imageUrl: 'http://example.com/john.jpg',
        createdAt: new Date(),
        idRole: '1d3a37f2-14de-4d3e-bc98-3b8a028599a1',
        idDepartment: '42ac048a-8bb0-4984-8145-be37312cbc35',
      };

      findByEmailStub.resolves(existingEmployee);

      const result = await EmployeeService.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        imageUrl: 'http://example.com/john.jpg',
      });

      expect(result).to.eql(existingEmployee);
      expect(findByEmailStub.calledOnce).to.be.true;
      expect(createStub.called).to.be.false;
    });

    it('should create a new employee if no existing employee is found', async () => {
      findByEmailStub.resolves(null);
      const newEmployee = {
        id: randomUUID(),
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        imageUrl: 'http://example.com/jane.jpg',
        createdAt: new Date(),
        idRole: '1d3a37f2-14de-4d3e-bc98-3b8a028599a1',
        idDepartment: '42ac048a-8bb0-4984-8145-be37312cbc35',
      };

      createStub.resolves(newEmployee);

      const result = await EmployeeService.create({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        imageUrl: 'http://example.com/jane.jpg',
      });

      expect(result).to.eql(newEmployee);
      expect(findByEmailStub.calledOnceWith('jane.doe@example.com')).to.be.true;
      expect(createStub.calledOnce).to.be.true;
    });

    it('should throw an error if the repository throws an error', async () => {
      findByEmailStub.rejects(new Error('Database error'));

      await expect(
        EmployeeService.create({
          firstName: 'Error',
          lastName: 'User',
          email: 'error.user@example.com',
          imageUrl: 'http://example.com/error.jpg',
        })
      ).to.be.rejectedWith(Error, 'Employee service error');

      expect(createStub.called).to.be.false;
    });
  });

  describe('employeeExists function', () => {
    it('should return true if the email is already registered', async () => {
      existByEmailStub.resolves(true);

      const exists = await EmployeeService.employeeExists({email: 'john.doe@example.com'});

      expect(exists).to.be.true;
      expect(existByEmailStub.calledOnceWith('john.doe@example.com')).to.be.true;
    });

    it('should return false if the email is not registered', async () => {
      existByEmailStub.resolves(false);

      const exists = await EmployeeService.employeeExists({email: 'new.user@example.com'});

      expect(exists).to.be.false;
      expect(existByEmailStub.calledOnceWith('new.user@example.com')).to.be.true;
    });

    it('should throw an error if the repository throws an error', async () => {
      const errorMessage = 'Employee service error';
      existByEmailStub.rejects(new Error(errorMessage));

      await expect(EmployeeService.employeeExists({email:'error.user@example.com'})).to.be.rejectedWith(Error, errorMessage);
    });
  });
});
