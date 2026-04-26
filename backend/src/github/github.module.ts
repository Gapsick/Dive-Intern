import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubProfile } from './entities/github-profile.entity';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

// forFeature: 이 모듈 안에서 GithubProfile entity를 사용하겠다고 TypeORM에 등록
@Module({
  imports: [TypeOrmModule.forFeature([GithubProfile])],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
