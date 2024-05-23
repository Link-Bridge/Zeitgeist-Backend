import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { default as Sinon, default as sinon } from 'sinon';
import { ExpenseReportStatus, SupportedRoles } from '../../../../utils/enums';

import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ExpenseRepository } from '../../../infra/repositories/expense.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { ExpenseService } from '../expense.service';

describe('ExpenseService', () => {
  let findEmployeeByEmailStub: Sinon.SinonStub;
  let findRoleByEmailStub: Sinon.SinonStub;
  let findExpenseByIdStub: Sinon.SinonStub;

  beforeEach(() => {
    findEmployeeByEmailStub = sinon.stub(EmployeeRepository, 'findByEmail');
    findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
    findExpenseByIdStub = sinon.stub(ExpenseRepository, 'findById');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getReportById', () => {
    it('Should return the expense report details', async () => {
      const reportId = randomUUID();
      const userEmail = faker.internet.email();
      const userId = randomUUID();

      const employee = {
        id: userId,
        email: userEmail,
        name: faker.lorem.words(2),
        role: SupportedRoles.ADMIN,
      };
      const role = {
        title: SupportedRoles.ADMIN,
      };
      const expenses = [
        {
          id: randomUUID(),
          title: faker.lorem.words(3),
          justification: faker.lorem.words(10),
          totalAmount: faker.number.float(),
          date: new Date(),
          createdAt: new Date(),
          idReport: reportId,
        },
      ];
      const existingReport = {
        id: reportId,
        title: faker.lorem.words(3),
        description: faker.lorem.words(10),
        startDate: new Date(),
        endDate: new Date(),
        status: ExpenseReportStatus.PENDING,
        createdAt: new Date(),
        idEmployee: userId,
        expenses: expenses,
      };

      findEmployeeByEmailStub.resolves(employee);
      findRoleByEmailStub.resolves(role);
      findExpenseByIdStub.resolves(existingReport);

      const res = await ExpenseService.getReportById(reportId, userEmail);

      expect(res).to.exist;
      expect(res).to.be.equal(existingReport);
      expect(res.id).to.equal(reportId);
      expect(res.expenses?.length).to.equal(expenses.length);
    });
  });
});
