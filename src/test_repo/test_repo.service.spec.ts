import { Test, TestingModule } from '@nestjs/testing';
import { TestRepoService } from './test_repo.service';

describe('TestRepoService', () => {
  let service: TestRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestRepoService],
    }).compile();

    service = module.get<TestRepoService>(TestRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
