import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  findAll() {
    return this.githubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.githubService.findOne(id);
  }
}
