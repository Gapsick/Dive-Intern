import api from './apiClient';

export type SelectionCategory = '지원 준비' | '진행 중인 전형' | '합격' | '불합격';

export interface SelectionItemDto {
  id: string;
  name_ko: string | null;
  name_ja: string | null;
  industry: string | null;
  region: string | null;
  logo_url: string | null;
  description_ko: string | null;
  description_ja: string | null;
  position_ko: string | null;
  position_ja: string | null;
  tech_stacks: string[];
  status: string | null;
  current_stage_label: string | null;
  match_score: number | null;
  next_event_label: string | null;
  next_event_date: string | null;
}

export interface UserCompany {
  id: string;
  status: string | null;
  is_bookmarked: boolean;
  is_applying: boolean;
  saved_at: string;
  updated_at: string | null;
}

export interface SelectionProcess {
  id: string;
  user_company: UserCompany;
  stage_type: string;
  stage_order: number;
  date: string | null;
  result: string | null;
  memo: string | null;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}

type CreateSelectionProcessBody = Pick<SelectionProcess, 'stage_type' | 'stage_order'> &
  Partial<Pick<SelectionProcess, 'date' | 'result' | 'memo' | 'is_shared'>>;

type UpdateSelectionProcessBody = Partial<
  Pick<SelectionProcess, 'stage_type' | 'stage_order' | 'date' | 'result' | 'memo' | 'is_shared'>
>;

export interface InterviewerInfo {
  id: string;
  role: string;
  count: number;
  memo: string | null;
}

export interface QnaItem {
  id: string;
  order_index: number;
  question: string;
  answer: string;
  interviewer_id: string | null;
}

export interface ReverseQnaItem {
  id: string;
  order_index: number;
  reverse_question: string;
  impression: string | null;
  interviewer_id: string | null;
}

export interface InterviewDetailData {
  selection_process_id: string;
  user_company_id: string;
  company_name: string | null;
  stage_order: number;
  stage_type: string;
  date: string | null;
  result: string | null;
  memo: string | null;
  is_shared: boolean;
  interview_type: string | null;
  interviewers: InterviewerInfo[];
  qna_items: QnaItem[];
  reverse_qna_items: ReverseQnaItem[];
}

export const selectionsApi = {
  // 학생이 지원한 기업 리스트 + 각 기업별 최신 전형 단계, 다음 일정 정보 등)
  getByStudentId: (studentId: string) =>
    api.get<SelectionItemDto[]>(`/selections/student/${studentId}`),
  // 학생이 지원한 특정 기업의 전형 단계 리스트 조회
  getByUserCompany: (userCompanyId: string) =>
    api.get<SelectionProcess[]>(`/user-companies/${userCompanyId}/selection-processes`),
  // 학생이 지원한 특정 기업의 특정 전형 단계 상세 조회
  getById: (userCompanyId: string, selectionId: string) =>
    api.get<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`),

  create: (userCompanyId: string, body: CreateSelectionProcessBody) =>
    api.post<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes`, body),

  update: (userCompanyId: string, selectionId: string, body: UpdateSelectionProcessBody) =>
    api.patch<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`, body),

  remove: (userCompanyId: string, selectionId: string) =>
    api.delete<void>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`),
  
  // 전형 단계 상세 (면접 상세 정보 등) 조회
  getInterviewDetail: (stageId: string) =>
    api.get<InterviewDetailData>(`/selections/${stageId}/interview-detail`),
};
