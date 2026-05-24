// 개발용 mock 데이터 (API 미연동 환경 폴백용)
// backend/db/seed/mock_data.sql의 メルカリ 1차 면접
// (selection_process: sp-0001-0000-0000-000000000003) 기준

export type { QnaItem, ReverseQnaItem, InterviewerInfo, InterviewDetailData } from '@/api/selections';
import type { InterviewDetailData } from '@/api/selections';

export const MOCK_INTERVIEW_DETAIL: InterviewDetailData = {
  selection_process_id: 'sp-0001-0000-0000-000000000003',
  user_company_id: 'uc-0001-0000-0000-000000000001',
  company_name: 'メルカリ',
  stage_order: 1,
  stage_type: '面接',
  date: '2024-04-15',
  result: '待ち',
  memo: '技術面接、エンジニア2名 + 人事1名。事前にGoとReactの復習を行った。',
  is_shared: true,
  interview_type: 'オンライン',
  interviewers: [
    {
      id: 'iv-0001-0000-0000-000000000001',
      role: 'エンジニア',
      count: 2,
      memo: 'バックエンド担当エンジニア',
    },
    {
      id: 'iv-0001-0000-0000-000000000002',
      role: '人事',
      count: 1,
      memo: null,
    },
  ],
  qna_items: [
    {
      id: 'qna-001',
      order_index: 1,
      question: '自己紹介とインターンシップ志望理由をお話しください。',
      answer:
        'ReactとGoを主に使用しています。メルカリの技術スタックとC2Cプラットフォームの技術的課題が魅力的で志望しました。',
    },
    {
      id: 'qna-002',
      order_index: 2,
      question: 'Reactでの状態管理はどのようにされていますか？',
      answer:
        '主にZustandを使用しています。小規模はContext API、複雑な状態はZustandがより直感的です。',
    },
    {
      id: 'qna-003',
      order_index: 3,
      question: 'Go言語の使用経験はありますか？',
      answer:
        '個人プロジェクトでGoでREST APIサーバーを実装しました。goroutineを活用した非同期処理も扱いました。',
    },
    {
      id: 'qna-004',
      order_index: 4,
      question: '入社後にどのようなエンジニアになりたいですか？',
      answer: 'ユーザー体験を最優先に考えるフルスタックエンジニアが目標です。',
    },
  ],
  reverse_qna_items: [
    {
      id: 'rqna-001',
      order_index: 1,
      reverse_question: 'インターン期間中、実際にどのようなプロダクトを担当しますか？',
      impression:
        'チームによって異なるが、実際のプロダクションコードに貢献する形で進めるとのこと。ユーザーに直接触れる機能を扱うことが多いそうです。',
    },
    {
      id: 'rqna-002',
      order_index: 2,
      reverse_question: 'メルカリバックエンドでGo以外に主に使う技術はありますか？',
      impression:
        'Goが主力で一部マイクロサービスはPythonも使うとのこと。インフラはGCPベースでKubernetesでオーケストレーションしているとのこと。',
    },
    {
      id: 'rqna-003',
      order_index: 3,
      reverse_question: 'コードレビューの文化はどのように運営されていますか？',
      impression: null,
    },
  ],
};
