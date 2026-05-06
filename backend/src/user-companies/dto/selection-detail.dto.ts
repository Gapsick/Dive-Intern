export class StageInterviewerDto {
  role: string;
  count: number;
  memo: string | null;
}

export class StageInterviewDetailDto {
  interview_type: string;
  interviewers: StageInterviewerDto[];
}

export class StageCodingDetailDto {
  platform: string;
  problem_count: number;
  duration_minutes: number;
  problems: string;
  difficulty: string;
}

export class StageSpiDetailDto {
  platform: string;
  duration_minutes: number;
  memo: string | null;
}

export class SelectionProcessDetailDto {
  id: string;
  stage_type: string;
  stage_order: number;
  date: string | null;
  result: string | null;
  memo: string | null;
  is_shared: boolean;
  interview_detail: StageInterviewDetailDto | null;
  coding_test_detail: StageCodingDetailDto | null;
  spi_detail: StageSpiDetailDto | null;
}

export class MemoDetailDto {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export class UserTechStackDetailDto {
  name: string;
  level: number;
}

export class SelectionDetailDto {
  id: string;
  status: string | null;
  is_bookmarked: boolean;
  is_applying: boolean;
  company: {
    id: string;
    name_ja: string | null;
    name_ko: string | null;
    industry: string | null;
    region: string | null;
    hp_url: string | null;
    logo_url: string | null;
    description_ja: string | null;
    description_ko: string | null;
    mvv_ja: string | null;
    mvv_ko: string | null;
    tech_stacks: string[];
  };
  job_posting: {
    id: string;
    position_ja: string | null;
    position_ko: string | null;
    description_ja: string | null;
    description_ko: string | null;
    employment_type: string | null;
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
  user_tech_stacks: UserTechStackDetailDto[];
  selection_processes: SelectionProcessDetailDto[];
  memos: MemoDetailDto[];
}
