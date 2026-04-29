import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionProcess } from './entities/selection-process.entity';
import { UserCompany } from '../user-companies/entities/user-company.entity';
import { SelectionProcessesController } from './selection-processes.controller';
import { SelectionProcessesService } from './selection-processes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SelectionProcess, UserCompany])],
  controllers: [SelectionProcessesController],
  providers: [SelectionProcessesService],
})
export class SelectionProcessesModule {}
