import { Controller } from '@nestjs/common';
import { TestRepoService } from './test_repo.service';

@Controller('test-repo')
export class TestRepoController {
  constructor(private readonly testRepoService: TestRepoService) {}
}
