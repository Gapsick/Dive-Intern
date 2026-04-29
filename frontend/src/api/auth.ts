import api from './apiClient';

// /api/auth/me 응답 타입
// JWT payload에서 꺼낸 값 (student_id, email, name)
// isOnboarding: true이면 온보딩 미완료 상태
export interface AuthUser {
  student_id: string | null;
  email: string;
  name: string;
  isOnboarding?: boolean;
}

export const authApi = {
  // GET /api/auth/me → 로그인 상태 확인 및 유저 정보 반환
  me: () => api.get<AuthUser>('/auth/me'),

  // POST /api/auth/refresh → accessToken 만료 시 재발급
  refresh: () => api.post<void>('/auth/refresh', {}),

  // POST /api/auth/logout → Cookie 삭제
  logout: () => api.post<void>('/auth/logout', {}),
};
