import api from './apiClient';

export interface RepoAnalysis {
  repo_name: string;
  repo_url: string;
  analysis: string;
}

export const githubApi = {
  // POST /api/github/analyze → 레포 AI 분석 후 결과 반환
  analyze: () =>
    api.post<{ repo_count: number; repos: RepoAnalysis[] }>('/github/analyze', {}),
};
