import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { randomUUID } from 'crypto';
import sinon from 'sinon';
import { RoleRepository } from '../../../infra/repositories/role.repository';
import { AdminRoleService } from '../admin-role.service';

chai.use(chaiAsPromised);

describe('AdminRoleService', () => {
  let findAllRoleStub: sinon.SinonStub;

  beforeEach(() => {
    findAllRoleStub = sinon.stub(RoleRepository, 'findAll');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllRoles', () => {
    it('should return a list of all the available roles', async () => {
      const idRole1 = randomUUID();
      const idRole2 = randomUUID();
      const idRole3 = randomUUID();
      const idRole4 = randomUUID();

      const existingRoles = [
        {
          id: idRole1,
          title: 'Role 1',
          createdAt: new Date(),
          updateAt: null,
        },
        {
          id: idRole2,
          title: 'Role 2',
          createdAt: new Date(),
          updateAt: null,
        },
        {
          id: idRole3,
          title: 'Role 3',
          createdAt: new Date(),
          updateAt: null,
        },
        {
          id: idRole4,
          title: 'Role 4',
          createdAt: new Date(),
          updateAt: null,
        },
      ];

      findAllRoleStub.resolves(existingRoles);

      const res = await AdminRoleService.getAllRoles();

      expect(res).to.deep.equal(existingRoles);
    });
  });
});
