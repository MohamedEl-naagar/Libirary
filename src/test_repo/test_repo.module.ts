import { Module } from '@nestjs/common';
import { TestRepoService } from './test_repo.service';
import { TestRepoController } from './test_repo.controller';

@Module({
  controllers: [TestRepoController],
  providers: [TestRepoService],
})
export class TestRepoModule {}
