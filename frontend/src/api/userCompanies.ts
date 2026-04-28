import api from './apiClient';

export interface ApplicationStatusSummary {
  total: number;
  byStatus: Record<string, number>;
}

export const userCompaniesApi = {
  getSummary: (studentId: string) =>
    api.get<ApplicationStatusSummary>(`/user-companies/summary?studentId=${studentId}`),
};
