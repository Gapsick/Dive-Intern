import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // GET /api/auth/me → 로그인 상태 확인
  // JwtGuard가 Cookie에서 JWT 꺼내서 검증 후 req.user에 주입
  // req.user = { student_id, email, name }
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: Request) {
    return req.user;
  }

  // GET /api/auth/google → Google 로그인 페이지로 리다이렉트
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  // GET /api/auth/google/callback → 로그인 완료 후 Cookie 세팅 → 리다이렉트
  // 신규 유저 → /onboarding, 기존 유저 → /
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken, isNewUser } = req.user as {
      accessToken: string;
      refreshToken: string | null;
      isNewUser: boolean;
    };

    this.setCookies(res, accessToken, refreshToken);

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:8080';
    res.redirect(isNewUser ? `${frontendUrl}/onboarding` : frontendUrl);
  }

  // POST /api/auth/refresh → accessToken 만료 시 refreshToken으로 재발급
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshAccessToken(refreshToken);

    this.setCookies(res, accessToken, newRefreshToken);
    return res.json({ success: true });
  }

  // POST /api/auth/logout → accessToken, refreshToken Cookie 삭제
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: '로그아웃 완료' });
  }

  // accessToken, refreshToken을 HttpOnly Cookie로 세팅하는 공통 함수
  private setCookies(res: Response, accessToken: string, refreshToken: string | null) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15분
    });

    if (refreshToken) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      });
    }
  }
}
