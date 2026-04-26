import { Controller, Get, Param } from '@nestjs/common';
import { SelectionProcessesService } from './selection-processes.service';

@Controller('selections')
export class SelectionProcessesController {
  constructor(private readonly selectionProcessesService: SelectionProcessesService) {}

  @Get()
  findAll() {
    return this.selectionProcessesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionProcessesService.findOne(id);
  }
}
