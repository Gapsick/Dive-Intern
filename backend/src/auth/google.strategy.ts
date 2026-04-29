import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

// Google OAuth 인증 처리 Strategy
// Google 로그인 완료 시 Passport가 자동으로 validate() 호출
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    } as any);
  }

  // Google에서 받은 프로필 정보를 authService.googleLogin()에 넘겨줌
  // 반환값이 req.user에 주입됨
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const googleUser = {
      email: profile.emails[0].value,
      name: profile.displayName ?? `${profile.name?.familyName ?? ''}${profile.name?.givenName ?? ''}`,
      providerId: profile.id,
      refreshToken: refreshToken ?? null,
    };

    const result = await this.authService.googleLogin(googleUser);
    done(null, result);
  }
}
