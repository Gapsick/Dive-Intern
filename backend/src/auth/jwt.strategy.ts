import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

// JWT 검증 Strategy
// @UseGuards(AuthGuard('jwt')) 사용 시 자동으로 실행됨
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // HttpOnly Cookie에서 accessToken 추출
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.accessToken ?? null,
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  // JWT 검증 완료 후 payload를 받아서 req.user에 주입할 값을 반환
  validate(payload: any) {
    // 온보딩 중인 임시 토큰이면 payload 전체 반환 (email, name, providerId 등 포함)
    if (payload.isOnboarding) return payload;

    // 정식 토큰이면 필요한 정보만 반환
    return { student_id: payload.sub, email: payload.email, name: payload.name };
  }
}
