import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { default as Sinon, default as sinon } from 'sinon';
import { ExpenseReportStatus, SupportedRoles } from '../../../../utils/enums';

import { Decimal } from '@prisma/client/runtime/library';
import { EmployeeRepository } from '../../../infra/repositories/employee.repository';
import { ExpenseRepository } from '../../../infra/repositories/expense.repository';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { ExpenseService } from '../expense.service';

describe('ExpenseService', () => {
  let findEmployeeByEmailStub: Sinon.SinonStub;
  let findRoleByEmailStub: Sinon.SinonStub;
  let findExpenseByIdStub: Sinon.SinonStub;
  let findExpenseByEmployeeIdStub: Sinon.SinonStub;
  let findAllExpensesStub: Sinon.SinonStub;
  let deleteExpenseReportStub: Sinon.SinonStub;
  let updateStatusByIdStub: Sinon.SinonStub;
  let updatePaymentFileUrlByIdStub: Sinon.SinonStub;

  beforeEach(() => {
    findEmployeeByEmailStub = sinon.stub(EmployeeRepository, 'findByEmail');
    findRoleByEmailStub = sinon.stub(RoleRepository, 'findByEmail');
    findExpenseByIdStub = sinon.stub(ExpenseRepository, 'findById');
    findExpenseByEmployeeIdStub = sinon.stub(ExpenseRepository, 'findByEmployeeId');
    findAllExpensesStub = sinon.stub(ExpenseRepository, 'findAll');
    deleteExpenseReportStub = sinon.stub(ExpenseRepository, 'deleteExpenseReport');
    updateStatusByIdStub = sinon.stub(ExpenseRepository, 'updateStatusById');
    updatePaymentFileUrlByIdStub = sinon.stub(ExpenseRepository, 'updatePaymentFileUrlById');
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

  describe('getExpenses', () => {
    const adminRoleId = randomUUID();
    const legalRoleId = randomUUID();
    const adminEmployeeId = randomUUID();
    const legalEmployeeId = randomUUID();

    const adminRole = {
      id: adminRoleId,
      title: SupportedRoles.ADMIN,
    };

    const legalRole = {
      id: legalRoleId,
      title: SupportedRoles.LEGAL,
    };

    const adminEmployee = {
      id: adminEmployeeId,
      firstName: faker.lorem.words(2),
      lastName: faker.lorem.words(3),
      email: faker.internet.email(),
      idRole: adminRoleId,
    };

    const legalEmployee = {
      id: legalEmployeeId,
      firstName: faker.lorem.words(2),
      lastName: faker.lorem.words(3),
      email: faker.internet.email(),
      idRole: legalRoleId,
    };

    const adminExpenseReportId = randomUUID();
    const legalExpenseReportId = randomUUID();

    const expenseReportAdmin = {
      id: adminExpenseReportId,
      title: faker.lorem.words(4),
      description: faker.lorem.words(8),
      startDate: new Date(),
      idEmployee: adminEmployeeId,
      totalAmount: 0,
    };

    const expenseReportLegal = {
      id: legalExpenseReportId,
      title: faker.lorem.words(4),
      description: faker.lorem.words(8),
      startDate: new Date(),
      idEmployee: legalEmployeeId,
      totalAmount: 0,
    };

    const adminExpenses = Array.from({ length: 4 }, () => ({
      id: randomUUID(),
      title: faker.lorem.words(4),
      justification: faker.lorem.words(8),
      totalAmount: 10,
      date: new Date(),
      idReport: adminExpenseReportId,
    }));

    const legalExpenses = Array.from({ length: 5 }, () => ({
      id: randomUUID(),
      title: faker.lorem.words(4),
      justification: faker.lorem.words(8),
      totalAmount: 100,
      date: new Date(),
      idReport: adminExpenseReportId,
    }));

    it('LEGAL: Should return their expense reports', async () => {
      findRoleByEmailStub.resolves(legalRole);
      findEmployeeByEmailStub.resolves(legalEmployee);
      findExpenseByEmployeeIdStub.resolves([
        {
          ...expenseReportLegal,
          employeeFirstName: legalEmployee.firstName,
          employeeLastName: legalEmployee.lastName,
          expenses: legalExpenses,
        },
      ]);

      const result = await ExpenseService.getExpenses(legalEmployee.email);

      expect(result).to.eql([
        {
          ...expenseReportLegal,
          employeeFirstName: legalEmployee.firstName,
          employeeLastName: legalEmployee.lastName,
          expenses: legalExpenses,
          totalAmount: new Decimal(500),
        },
      ]);
      expect(findRoleByEmailStub.calledOnce).to.be.true;
      expect(findEmployeeByEmailStub.calledOnce).to.be.true;
      expect(findExpenseByEmployeeIdStub.calledOnce).to.be.true;
    });

    it('ADMIN/ACCOUNTING: Should return all expense reports', async () => {
      findRoleByEmailStub.resolves(adminRole);
      findEmployeeByEmailStub.resolves(adminEmployee);
      findAllExpensesStub.resolves([
        {
          ...expenseReportLegal,
          employeeFirstName: legalEmployee.firstName,
          employeeLastName: legalEmployee.lastName,
          expenses: legalExpenses,
        },
        {
          ...expenseReportAdmin,
          employeeFirstName: adminEmployee.firstName,
          employeeLastName: adminEmployee.lastName,
          expenses: adminExpenses,
        },
      ]);

      const result = await ExpenseService.getExpenses(adminEmployee.email);

      expect(result).to.eql([
        {
          ...expenseReportLegal,
          employeeFirstName: legalEmployee.firstName,
          employeeLastName: legalEmployee.lastName,
          expenses: legalExpenses,
          totalAmount: new Decimal(500),
        },
        {
          ...expenseReportAdmin,
          employeeFirstName: adminEmployee.firstName,
          employeeLastName: adminEmployee.lastName,
          expenses: adminExpenses,
          totalAmount: new Decimal(40),
        },
      ]);
      expect(findRoleByEmailStub.calledOnce).to.be.true;
      expect(findEmployeeByEmailStub.calledOnce).to.be.true;
      expect(findAllExpensesStub.calledOnce).to.be.true;
    });

    it('Should throw an error if employee is not found', async () => {
      const errorMessage = 'Employee not found';
      findRoleByEmailStub.rejects(new Error(errorMessage));

      return await expect(ExpenseService.getExpenses(faker.internet.email())).to.be.rejectedWith(Error, errorMessage);
    });

    it('LEGAL: Should throw an error if data is not found', async () => {
      const errorMessage = 'An unexpected error occurred';

      findRoleByEmailStub.resolves(legalRole);
      findEmployeeByEmailStub.resolves(legalEmployee);
      findExpenseByEmployeeIdStub.rejects(new Error(errorMessage));

      return await expect(ExpenseService.getExpenses(legalEmployee.email)).to.be.rejectedWith(Error, errorMessage);
    });

    it('ADMIN/ACCOUNTING: Should throw an error if data is not found', async () => {
      const errorMessage = 'An unexpected error occurred';

      findRoleByEmailStub.resolves(adminRole);
      findEmployeeByEmailStub.resolves(adminEmployee);
      findAllExpensesStub.rejects(new Error(errorMessage));

      return await expect(ExpenseService.getExpenses(adminEmployee.email)).to.be.rejectedWith(Error, errorMessage);
    });
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

  describe('deleteExpenseReport', () => {
    const reportId = randomUUID();

    it('Should throw an error if expense report is not deleted', async () => {
      findExpenseByIdStub.resolves(reportId);
      deleteExpenseReportStub.resolves(null);

      const result = await ExpenseService.deleteExpenseReport(reportId);

      expect(result).to.eql(null);
      expect(deleteExpenseReportStub.calledOnce).to.be.true;
    });
  });

  describe('updateStatusById', () => {
    it('Should update the status to Payed', async () => {
      const employeeId = randomUUID();
      const reportId = randomUUID();
      const updatedExpense = {
        id: reportId,
        title: faker.lorem.words(3),
        description: faker.lorem.words(10),
        startDate: new Date(),
        createdAt: new Date(),
        idEmployee: employeeId,
        status: ExpenseReportStatus.PAYED,
      };

      updateStatusByIdStub.resolves(updatedExpense);

      const res = await ExpenseService.updateStatusById(reportId, ExpenseReportStatus.PAYED);

      expect(res).to.exist;
      expect(res).to.be.equal(updatedExpense);
      expect(res.id).to.be.equal(reportId);
      expect(res.status).to.be.equal(ExpenseReportStatus.PAYED);
    });

    it('Should throw an error if the status is not valid', async () => {
      const employeeId = randomUUID();
      const reportId = randomUUID();
      const updatedExpense = {
        id: reportId,
        title: faker.lorem.words(3),
        description: faker.lorem.words(10),
        startDate: new Date(),
        createdAt: new Date(),
        idEmployee: employeeId,
        status: ExpenseReportStatus.PAYED,
      };

      updateStatusByIdStub.resolves(updatedExpense);

      try {
        await ExpenseService.updateStatusById(reportId, 'mystatus' as ExpenseReportStatus);
      } catch (error: any) {
        expect(error.message).to.equal('Invalid status');
      }
    });
  });

  describe('updatePaymentFileUrlByIdStub', () => {
    it('Should update the url voucher', async () => {
      const employeeId = randomUUID();
      const reportId = randomUUID();
      const url = 'https://drive.google.com';
      const updatedExpense = {
        id: reportId,
        title: faker.lorem.words(3),
        description: faker.lorem.words(10),
        startDate: new Date(),
        createdAt: new Date(),
        idEmployee: employeeId,
        status: ExpenseReportStatus.PAYED,
        urlVoucher: url,
      };

      updatePaymentFileUrlByIdStub.resolves(updatedExpense);

      const res = await ExpenseService.updatePaymentFileUrlById(reportId, url);

      expect(res).to.exist;
      expect(res).to.be.equal(updatedExpense);
      expect(res.id).to.be.equal(reportId);
      expect(res.urlVoucher).to.be.equal(url);
    });
  });
});
