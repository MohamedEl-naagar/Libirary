import { Test, TestingModule } from '@nestjs/testing';
import { TestRepoController } from './test_repo.controller';
import { TestRepoService } from './test_repo.service';

describe('TestRepoController', () => {
  let controller: TestRepoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestRepoController],
      providers: [TestRepoService],
    }).compile();

    controller = module.get<TestRepoController>(TestRepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
