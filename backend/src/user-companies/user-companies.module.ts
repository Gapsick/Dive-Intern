import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompany } from './entities/user-company.entity';
import { Memo } from './entities/memo.entity';
import { AiAnalysis } from './entities/ai-analysis.entity';
import { SelectionProcess } from '../selection-processes/entities/selection-process.entity';
import { InterviewDetail } from '../selection-processes/entities/interview-detail.entity';
import { CodingTestDetail } from '../selection-processes/entities/coding-test-detail.entity';
import { SpiDetail } from '../selection-processes/entities/spi-detail.entity';
import { Interviewer } from '../selection-processes/entities/interviewer.entity';
import { UserTechStack } from '../tech-stacks/entities/user-tech-stack.entity';
import { UserCompaniesController } from './user-companies.controller';
import { UserCompaniesService } from './user-companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCompany,
      Memo,
      AiAnalysis,
      SelectionProcess,
      InterviewDetail,
      CodingTestDetail,
      SpiDetail,
      Interviewer,
      UserTechStack,
    ]),
  ],
  controllers: [UserCompaniesController],
  providers: [UserCompaniesService],
})
export class UserCompaniesModule {}
