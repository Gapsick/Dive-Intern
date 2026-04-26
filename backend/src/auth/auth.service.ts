import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { OauthAccount } from '../users/entities/oauth-account.entity';

interface GoogleUser {
  email: string;
  name: string;
  providerId: string;
  refreshToken: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OauthAccount)
    private readonly oauthAccountRepository: Repository<OauthAccount>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(googleUser: GoogleUser) {
    const { email, name, providerId, refreshToken } = googleUser;

    // Given: users 테이블에 존재하지 않는 유저 → 새로 생성
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({ email, name });
      await this.userRepository.save(user);

      const oauthAccount = this.oauthAccountRepository.create({
        user,
        provider: 'google',
        provider_account_id: providerId,
        refresh_token: refreshToken,
      });
      await this.oauthAccountRepository.save(oauthAccount);
    } else {
      // Given: 기존 유저 - refreshToken 확인
      const oauthAccount = await this.oauthAccountRepository.findOne({
        where: { provider_account_id: providerId },
      });

      // Given: refreshToken도 만료 → 재인증 요청
      if (!oauthAccount?.refresh_token && !refreshToken) {
        throw new UnauthorizedException('OAuth 재인증이 필요합니다');
      }

      // Given: 토큰 만료 → refreshToken으로 새 accessToken 발급
      if (refreshToken && oauthAccount) {
        oauthAccount.refresh_token = refreshToken;
        await this.oauthAccountRepository.save(oauthAccount);
      }
    }

    // Then: accessToken 반환
    const accessToken = this.jwtService.sign({
      sub: user.student_id,
      email: user.email,
    });

    return { accessToken };
  }
}
