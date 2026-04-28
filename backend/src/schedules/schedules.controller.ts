import { Controller, Get, Param, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  // :id보다 먼저 선언해야 'upcoming'이 파라미터로 캡처되지 않음
  @Get('upcoming')
  findUpcoming(@Query('studentId') studentId: string) {
    return this.schedulesService.findUpcoming(studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }
}
