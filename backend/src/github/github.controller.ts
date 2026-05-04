import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
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

  // POST /api/github/analyze → 로그인 유저의 GitHub 레포를 분석해서 DB에 저장
  @Post('analyze')
  @UseGuards(AuthGuard('jwt'))
  analyze(@Req() req: Request) {
    const user = (req as any).user;
    return this.githubService.analyze(user.student_id);
  }
}
