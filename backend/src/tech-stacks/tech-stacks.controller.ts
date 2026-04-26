import { Controller, Get, Param } from '@nestjs/common';
import { TechStacksService } from './tech-stacks.service';

@Controller('tech-stacks')
export class TechStacksController {
  constructor(private readonly techStacksService: TechStacksService) {}

  @Get()
  findAll() {
    return this.techStacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techStacksService.findOne(id);
  }
}
