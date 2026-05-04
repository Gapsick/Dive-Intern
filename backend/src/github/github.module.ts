import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubProfile } from './entities/github-profile.entity';
import { Repo } from './entities/repo.entity';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { AuthModule } from '../auth/auth.module';

// forFeature: 이 모듈 안에서 사용할 entity를 TypeORM에 등록
@Module({
  imports: [
    TypeOrmModule.forFeature([GithubProfile, Repo]),
    forwardRef(() => AuthModule),
  ],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
