export class InterviewerDto {
  id: string;
  role: string;
  count: number;
  memo: string | null;
}

export class QnaItemDto {
  id: string;
  order_index: number;
  question: string;
  answer: string;
  interviewer_id: string | null;
}

export class ReverseQnaItemDto {
  id: string;
  order_index: number;
  reverse_question: string;
  impression: string | null;
  interviewer_id: string | null;
}

export class InterviewDetailResponseDto {
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
  interviewers: InterviewerDto[];
  qna_items: QnaItemDto[];
  reverse_qna_items: ReverseQnaItemDto[];
}
