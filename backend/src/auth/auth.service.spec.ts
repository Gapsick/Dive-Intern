import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { OauthAccount } from '../users/entities/oauth-account.entity';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockOauthAccountRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(OauthAccount), useValue: mockOauthAccountRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  // Scenario: 신규 유저 로그인
  // Given: users 테이블에 존재하지 않는 유저가
  // When: Google OAuth 로그인을 시도하면
  // Then: users 테이블에 새 유저가 생성되고 accessToken이 반환되고 refreshToken이 DB에 저장
  describe('신규 유저 로그인', () => {
    it('users 테이블에 없으면 새 유저를 생성하고 accessToken을 반환한다', async () => {
      const googleUser = {
        email: 'new@test.com',
        name: '홍길동',
        providerId: 'google-123',
        refreshToken: 'refresh-token',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({ student_id: '2021001', email: googleUser.email, name: googleUser.name });
      mockUserRepository.save.mockResolvedValue({ student_id: '2021001', email: googleUser.email, name: googleUser.name });
      mockOauthAccountRepository.create.mockReturnValue({});
      mockOauthAccountRepository.save.mockResolvedValue({});
      mockJwtService.sign.mockReturnValue('access-token');

      const result = await service.googleLogin(googleUser);

      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(mockOauthAccountRepository.save).toHaveBeenCalled();
      expect(result.accessToken).toBeDefined();
    });
  });

  // Scenario: 기존 유저 로그인 - 토큰 만료
  // Given: 이미 가입된 유저의 accessToken이 만료됐을 때
  // When: 로그인 페이지에 들어오면
  // Then: DB의 refreshToken으로 새로운 accessToken을 발급한다
  describe('기존 유저 로그인 - 토큰 만료', () => {
    it('이미 가입된 유저면 새 유저를 생성하지 않고 accessToken을 반환한다', async () => {
      const googleUser = {
        email: 'existing@test.com',
        name: '김철수',
        providerId: 'google-456',
        refreshToken: 'new-refresh-token',
      };

      const existingUser = { student_id: '2021002', email: googleUser.email, name: googleUser.name };
      mockUserRepository.findOne.mockResolvedValue(existingUser);
      mockOauthAccountRepository.findOne.mockResolvedValue({ refresh_token: 'old-refresh-token' });
      mockOauthAccountRepository.save.mockResolvedValue({});
      mockJwtService.sign.mockReturnValue('new-access-token');

      const result = await service.googleLogin(googleUser);

      expect(mockUserRepository.save).not.toHaveBeenCalled();
      expect(result.accessToken).toBeDefined();
    });
  });

  // Scenario: 기존 유저 로그인 - refreshToken 만료
  // Given: accessToken과 refreshToken 모두 만료됐을 때
  // When: 로그인 페이지에 들어오면
  // Then: OAuth 재인증을 요청한다
  describe('기존 유저 로그인 - refreshToken 만료', () => {
    it('refreshToken이 없으면 에러를 반환한다', async () => {
      const googleUser = {
        email: 'existing@test.com',
        name: '김철수',
        providerId: 'google-456',
        refreshToken: null,
      };

      const existingUser = { student_id: '2021002', email: googleUser.email, name: googleUser.name };
      mockUserRepository.findOne.mockResolvedValue(existingUser);
      mockOauthAccountRepository.findOne.mockResolvedValue({ refresh_token: null });

      await expect(service.googleLogin(googleUser)).rejects.toThrow('OAuth 재인증이 필요합니다');
    });
  });
});
