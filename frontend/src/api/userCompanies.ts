import api from './apiClient';

export interface ApplicationStatusSummary {
  total: number;
  byStatus: Record<string, number>;
}

export interface SelectionDetailMemo {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface StageInterviewer {
  role: string;
  count: number;
  memo: string | null;
}

export interface StageInterviewDetail {
  interview_type: string;
  interviewers: StageInterviewer[];
}

export interface StageCodingDetail {
  platform: string;
  problem_count: number;
  duration_minutes: number;
  problems: string;
  difficulty: string;
}

export interface StageSpiDetail {
  platform: string;
  duration_minutes: number;
  memo: string | null;
}

export interface SelectionProcessItem {
  id: string;
  stage_type: string;
  stage_order: number;
  date: string | null;
  result: string | null;
  memo: string | null;
  is_shared: boolean;
  interview_detail?: StageInterviewDetail;
  coding_test_detail?: StageCodingDetail;
  spi_detail?: StageSpiDetail;
}

export interface UserTechStackItem {
  name: string;
  level: number;
}

export interface SelectionDetailData {
  id: string;
  status: string;
  is_bookmarked: boolean;
  is_applying: boolean;
  company: {
    id: string;
    name_ja: string;
    name_ko: string;
    industry: string;
    region: string;
    hp_url: string | null;
    logo_url: string | null;
    description_ja: string;
    description_ko: string;
    mvv_ja: string | null;
    mvv_ko: string | null;
    tech_stacks: string[];
  };
  job_posting: {
    id: string;
    position_ja: string;
    position_ko: string;
    description_ja: string;
    description_ko: string;
    employment_type: string;
    is_remote: boolean;
    salary_min: number | null;
    salary_max: number | null;
    term: string | null;
    start_date: string | null;
    end_date: string | null;
    application_deadline: string | null;
    work_hours: string | null;
    major_requirement_ja: string | null;
    major_requirement_ko: string | null;
    other_requirements_ja: string | null;
    other_requirements_ko: string | null;
    recruit_url: string | null;
  };
  ai_analysis: {
    match_score: number;
    match_summary: string;
  } | null;
  user_tech_stacks: UserTechStackItem[];
  selection_processes: SelectionProcessItem[];
  memos: SelectionDetailMemo[];
}

export const userCompaniesApi = {
  getSummary: (studentId: string) =>
    api.get<ApplicationStatusSummary>(`/user-companies/summary?studentId=${studentId}`),

  getDetail: (id: string) =>
    api.get<SelectionDetailData>(`/user-companies/${id}/detail`),
};
