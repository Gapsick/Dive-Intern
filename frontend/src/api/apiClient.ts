const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

// 모든 API 요청의 공통 함수
// credentials: 'include' → HttpOnly Cookie(accessToken)를 요청마다 자동 포함
// retry: true → 401(accessToken 만료) 시 refreshToken으로 재발급 후 원래 요청 재시도
async function request<T>(endpoint: string, options: RequestOptions, retry = true): Promise<T> {
  const { method, body, headers = {} } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // accessToken 만료 → refreshToken으로 재발급 후 원래 요청 재시도
  if (response.status === 401 && retry) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // 재발급 성공 → 원래 요청 재시도 (retry: false로 무한루프 방지)
      return request<T>(endpoint, options, false);
    } else {
      // refreshToken도 만료 → 로그인 페이지로
      window.location.href = '/login';
      throw new Error('세션이 만료됐습니다. 다시 로그인해주세요.');
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message ?? `Request failed: ${response.status}`);
  }

  // 204 No Content 등 body가 없는 응답 처리
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'POST', body, headers }),

  put: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'PUT', body, headers }),

  patch: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'PATCH', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: 'DELETE', headers }),
};

export default api;
