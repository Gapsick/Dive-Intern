import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionProcess } from './entities/selection-process.entity';
import { UserCompany } from '../user-companies/entities/user-company.entity';
import { InterviewDetail } from './entities/interview-detail.entity';
import { Interviewer } from './entities/interviewer.entity';
import { InterviewerQna } from './entities/interviewer-qna.entity';
import { SelectionProcessesController } from './selection-processes.controller';
import { SelectionProcessesService } from './selection-processes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SelectionProcess, UserCompany, InterviewDetail, Interviewer, InterviewerQna])],
  controllers: [SelectionProcessesController],
  providers: [SelectionProcessesService],
})
export class SelectionProcessesModule {}
