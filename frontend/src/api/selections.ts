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

export const selectionsApi = {
  // 학생이 지원한 기업 리스트 + 각 기업별 최신 전형 단계, 다음 일정 정보 등)
  getByStudentId: (studentId: string) =>
    api.get<SelectionItemDto[]>(`/selections/student/${studentId}`),

  getByUserCompany: (userCompanyId: string) =>
    api.get<SelectionProcess[]>(`/user-companies/${userCompanyId}/selection-processes`),

  getById: (userCompanyId: string, selectionId: string) =>
    api.get<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`),

  create: (userCompanyId: string, body: CreateSelectionProcessBody) =>
    api.post<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes`, body),

  update: (userCompanyId: string, selectionId: string, body: UpdateSelectionProcessBody) =>
    api.patch<SelectionProcess>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`, body),

  remove: (userCompanyId: string, selectionId: string) =>
    api.delete<void>(`/user-companies/${userCompanyId}/selection-processes/${selectionId}`),
};
