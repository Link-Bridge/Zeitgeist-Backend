import { expect } from 'chai';
import { instance, mock, when } from 'ts-mockito';
import { DummyRepository } from '../dummy.respository';

describe('Dummy Repository', () => {
  let dummyRepository: DummyRepository;

  beforeEach(() => {
    dummyRepository = new DummyRepository();
  });

  describe('Find All', () => {
    it('should log and throw an error if an unexpected error occurs', async () => {
      const dummyRepositoryMock = mock(DummyRepository);
      when(dummyRepositoryMock.findAll()).thenThrow(new Error('Unexpected error'));

      const dummyRepository = instance(dummyRepositoryMock);

      expect(() => dummyRepository.findAll()).to.throw(Error, 'Unexpected error');
    });
  });
});
