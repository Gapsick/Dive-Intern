import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { OauthAccount } from '../users/entities/oauth-account.entity';
import { GithubProfile } from '../github/entities/github-profile.entity';

interface GoogleUser {
  email: string;
  name: string;
  providerId: string;
  refreshToken: string | null;
}

interface OnboardingDto {
  student_id: string;
  desired_position?: string;
  portfolio_url?: string;
  github_url?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(OauthAccount)
    private readonly oauthAccountRepository: Repository<OauthAccount>,
    @InjectRepository(GithubProfile)
    private readonly githubProfileRepository: Repository<GithubProfile>,
    private readonly jwtService: JwtService,
  ) {}

  // accessToken 발급 (15분) - JWT payload에 student_id, email, name 포함
  private issueAccessToken(user: User): string {
    return this.jwtService.sign(
      { sub: user.student_id, email: user.email, name: user.name },
      { expiresIn: '15m' },
    );
  }

  // refreshToken 발급 (7일) - type: 'refresh'로 accessToken과 구분
  private issueRefreshToken(user: User): string {
    return this.jwtService.sign(
      { sub: user.student_id, email: user.email, name: user.name, type: 'refresh' },
      { expiresIn: '7d' },
    );
  }

  async googleLogin(googleUser: GoogleUser) {
    const { email, name, providerId, refreshToken } = googleUser;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      // 기존 유저 → Google refreshToken 업데이트 후 JWT 발급
      const oauthAccount = await this.oauthAccountRepository.findOne({
        where: { provider_account_id: providerId },
      });

      if (refreshToken && oauthAccount) {
        oauthAccount.refresh_token = refreshToken;
        await this.oauthAccountRepository.save(oauthAccount);
      }

      const accessToken = this.issueAccessToken(existingUser);
      const myRefreshToken = this.issueRefreshToken(existingUser);

      return { accessToken, refreshToken: myRefreshToken, isNewUser: false };
    }

    // 신규 유저 → DB 저장 없이 Google 정보만 임시 JWT에 담아서 반환
    // isOnboarding: true로 온보딩 중임을 표시
    const tempToken = this.jwtService.sign({
      sub: null,
      email,
      name,
      providerId,
      refreshToken,
      isOnboarding: true,
    }, { expiresIn: '30m' });

    return { accessToken: tempToken, refreshToken: null, isNewUser: true };
  }

  // 온보딩 완료 → 처음으로 DB에 저장 후 정식 JWT 발급
  // 임시 JWT의 payload(email, name 등)를 꺼내서 users 테이블에 INSERT
  async completeOnboarding(tempPayload: any, dto: OnboardingDto) {
    const user = this.userRepository.create({
      student_id: dto.student_id,
      email: tempPayload.email,
      name: tempPayload.name,
      desired_position: dto.desired_position,
      portfolio_url: dto.portfolio_url,
    });
    await this.userRepository.save(user);

    // oauth_accounts에 Google 계정 연동 정보 저장
    const oauthAccount = this.oauthAccountRepository.create({
      user,
      provider: 'google',
      provider_account_id: tempPayload.providerId,
      refresh_token: tempPayload.refreshToken,
    });
    await this.oauthAccountRepository.save(oauthAccount);

    // GitHub URL 입력했으면 username만 추출해서 github_profiles에 저장
    if (dto.github_url) {
      const username = dto.github_url.replace('https://github.com/', '').replace(/\/$/, '');
      const profile = this.githubProfileRepository.create({
        user,
        github_username: username,
      });
      await this.githubProfileRepository.save(profile);
    }

    const accessToken = this.issueAccessToken(user);
    const refreshToken = this.issueRefreshToken(user);

    return { accessToken, refreshToken };
  }

  // accessToken 만료 시 refreshToken으로 재발급
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      // refreshToken인지 확인 (accessToken으로 재발급 시도 방지)
      if (payload.type !== 'refresh') {
        throw new Error('유효하지 않은 토큰입니다');
      }

      const user = await this.userRepository.findOne({ where: { student_id: payload.sub } });
      if (!user) throw new Error('유저를 찾을 수 없습니다');

      const newAccessToken = this.issueAccessToken(user);
      const newRefreshToken = this.issueRefreshToken(user);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new Error('refreshToken이 만료됐습니다. 다시 로그인해주세요');
    }
  }
}
