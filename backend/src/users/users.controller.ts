import { Body, Controller, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':studentId')
  findOne(@Param('studentId') studentId: string) {
    return this.usersService.findOne(studentId);
  }

  // PATCH /api/users/onboarding → 온보딩 완료 후 DB에 첫 저장 + 정식 JWT 발급
  @Patch('onboarding')
  @UseGuards(AuthGuard('jwt'))
  async completeOnboarding(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: {
      student_id: string;
      desired_position?: string;
      portfolio_url?: string;
      github_url?: string;
    },
  ) {
    const tempPayload = (req as any).user;
    const { accessToken, refreshToken } = await this.authService.completeOnboarding(tempPayload, body);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ success: true });
  }
}
