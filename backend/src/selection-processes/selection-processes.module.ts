import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionProcess } from './entities/selection-process.entity';
import { SelectionProcessesController } from './selection-processes.controller';
import { SelectionProcessesService } from './selection-processes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SelectionProcess])],
  controllers: [SelectionProcessesController],
  providers: [SelectionProcessesService],
})
export class SelectionProcessesModule {}
