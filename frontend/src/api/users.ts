import api from './apiClient';

// users 테이블 구조에 맞춘 타입
export interface User {
  student_id: string;
  email: string;
  name: string;
  portfolio_url: string | null;
  desired_position: string | null;
  created_at: string;
  updated_at: string;
}

// 온보딩 시 전송하는 body 타입
// student_id는 필수, 나머지는 선택
type OnboardingBody = {
  student_id: string;
  desired_position?: string;
  portfolio_url?: string;
  github_url?: string;
};

export const usersApi = {
  // GET /api/users → 전체 유저 목록
  getAll: () => api.get<User[]>('/users'),

  // GET /api/users/:studentId → 특정 유저 조회
  getById: (studentId: string) => api.get<User>(`/users/${studentId}`),

  // PATCH /api/users/onboarding → 온보딩 완료
  // 임시 JWT → 실제 학번으로 DB에 저장 후 정식 JWT 재발급
  onboarding: (body: OnboardingBody) => api.patch<{ success: boolean }>('/users/onboarding', body),
};
