import api from './apiClient';

// GET /companies 응답 타입 (flat 구조)
export interface CompanyListItem {
  id: string;
  name_ja: string | null;
  name_ko: string | null;
  industry: string | null;
  region: string | null;
  logo_url: string | null;
  description_ja: string | null;
  description_ko: string | null;
  tech_stacks: string[];
  application_deadline: string[];
}

export interface Company {
  id: string;
  name: string;
  industry: string | null;
  description: string | null;
  region: string | null;
  hp_url: string;
  logo_url: string | null;
  mvv: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobPosting {
  id: string;
  company: Company;
  position: string | null;
  description: string | null;
  employment_type: string | null;
  work_hours: string | null;
  is_remote: boolean;
  major_requirement: string | null;
  other_requirements: string | null;
  salary_min: number | null;
  salary_max: number | null;
  recruit_url: string | null;
  term: string | null;
  start_date: string | null;
  end_date: string | null;
  application_deadline: string | null;
  created_at: string;
  updated_at: string;
}

type CreateCompanyBody = Pick<Company, 'name' | 'hp_url'> & Partial<Omit<Company, 'id' | 'name' | 'hp_url' | 'created_at' | 'updated_at'>>;
type UpdateCompanyBody = Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>;

type CreateJobPostingBody = Partial<Omit<JobPosting, 'id' | 'company' | 'created_at' | 'updated_at'>>;
type UpdateJobPostingBody = Partial<Omit<JobPosting, 'id' | 'company' | 'created_at' | 'updated_at'>>;

export const companiesApi = {
  // Company
  getAll: () =>
    api.get<CompanyListItem[]>('/companies'),

  getById: (id: string) =>
    api.get<Company>(`/companies/${id}`),

  create: (body: CreateCompanyBody) =>
    api.post<Company>('/companies', body),

  update: (id: string, body: UpdateCompanyBody) =>
    api.patch<Company>(`/companies/${id}`, body),

  remove: (id: string) =>
    api.delete<void>(`/companies/${id}`),

  // JobPosting
  getJobPostings: (companyId: string) =>
    api.get<JobPosting[]>(`/companies/${companyId}/job-postings`),

  getJobPostingById: (companyId: string, jobPostingId: string) =>
    api.get<JobPosting>(`/companies/${companyId}/job-postings/${jobPostingId}`),

  createJobPosting: (companyId: string, body: CreateJobPostingBody) =>
    api.post<JobPosting>(`/companies/${companyId}/job-postings`, body),

  updateJobPosting: (companyId: string, jobPostingId: string, body: UpdateJobPostingBody) =>
    api.patch<JobPosting>(`/companies/${companyId}/job-postings/${jobPostingId}`, body),

  removeJobPosting: (companyId: string, jobPostingId: string) =>
    api.delete<void>(`/companies/${companyId}/job-postings/${jobPostingId}`),
};
