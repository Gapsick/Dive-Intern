import { Controller, Get, Param } from '@nestjs/common';
import { UserCompaniesService } from './user-companies.service';

@Controller('user-companies')
export class UserCompaniesController {
  constructor(private readonly userCompaniesService: UserCompaniesService) {}

  @Get()
  findAll() {
    return this.userCompaniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCompaniesService.findOne(id);
  }
}
