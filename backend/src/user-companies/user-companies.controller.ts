import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserCompaniesService } from './user-companies.service';

@Controller('user-companies')
export class UserCompaniesController {
  constructor(private readonly userCompaniesService: UserCompaniesService) {}

  @Get()
  findAll() {
    return this.userCompaniesService.findAll();
  }

  @Get('summary')
  getSummary(@Query('studentId') studentId: string) {
    return this.userCompaniesService.getSummary(studentId);
  }

  @Get(':id/detail')
  getDetail(@Param('id') id: string) {
    return this.userCompaniesService.getDetail(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCompaniesService.findOne(id);
  }
}
