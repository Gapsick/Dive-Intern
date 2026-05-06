// 개발용 mock 데이터 (API 미연동 환경 폴백용)
// backend/db/seed/mock_data.sql 메루카리(uc-0001-0000-0000-000000000001) 기준으로 구성
import type { SelectionDetailData } from '@/api/userCompanies';

export const MOCK_DETAIL: SelectionDetailData = {
  id: 'uc-0001-0000-0000-000000000001',
  status: '面接',
  is_bookmarked: true,
  is_applying: true,
  company: {
    id: 'co-0001-0000-0000-000000000001',
    name_ja: 'メルカリ',
    name_ko: '메루카리',
    industry: 'IT / EC',
    region: '東京 · 港区',
    hp_url: 'https://mercari.com',
    logo_url: null,
    description_ja:
      'フリマアプリNo.1。個人間取引プラットフォームを世界に展開するテクノロジー企業。MAU 2,000万人以上、技術ブログが活発でOSSへの貢献も高い。',
    description_ko:
      '중고거래 앱 1위. 개인 간 거래 플랫폼을 전 세계에 전개하는 테크 기업. MAU 2,000만 명 이상, 기술 블로그 활발하고 OSS 기여 높음.',
    mvv_ja: '新たな価値を生みだす世界的なマーケットプレイスを創る',
    mvv_ko: '새로운 가치를 창출하는 글로벌 마켓플레이스를 만들다',
    tech_stacks: ['Go', 'MySQL', 'React', 'TypeScript', 'Kubernetes', 'GCP'],
  },
  job_posting: {
    id: 'jp-0001-0000-0000-000000000001',
    position_ja: 'バックエンドエンジニア',
    position_ko: '백엔드 엔지니어',
    description_ja:
      'Go言語を使ったマイクロサービス開発。フリマアプリのコアAPIの設計・実装を担当。チームでのアジャイル開発経験を積むことができます。',
    description_ko:
      'Go 언어를 사용한 마이크로서비스 개발. 프리마 앱 핵심 API 설계 및 구현 담당. 팀 애자일 개발 경험을 쌓을 수 있습니다.',
    employment_type: 'インターン',
    is_remote: true,
    salary_min: 250000,
    salary_max: 300000,
    term: '2024 summer',
    start_date: '2024-07-01',
    end_date: '2024-09-30',
    application_deadline: '2024-05-31',
    work_hours: 'フレックスタイム',
    major_requirement_ja: '情報系歓迎',
    major_requirement_ko: '정보계열 환영',
    other_requirements_ja: '英語ドキュメント読解力',
    other_requirements_ko: '영어 문서 독해 능력',
    recruit_url: 'https://mercari.com/recruit/backend',
  },
  ai_analysis: {
    match_score: 87.5,
    match_summary:
      'NestJS・Go経験がメルカリのバックエンド要件と高くマッチしています。GitHub分析結果フロントエンド3/5、バックエンド4/5のスキル評価で、Mercariが求める技術スタックと80%以上マッチします。',
  },
  user_tech_stacks: [
    { name: 'Go', level: 3 },
    { name: 'React', level: 2 },
    { name: 'TypeScript', level: 3 },
    { name: 'NestJS', level: 4 },
    { name: 'Node.js', level: 3 },
    { name: 'PostgreSQL', level: 1 },
  ],
  selection_processes: [
    {
      id: 'sp-0001-0000-0000-000000000003',
      stage_type: '面接',
      stage_order: 3,
      date: '2024-04-15',
      result: '待ち',
      memo: '技術面接、エンジニア2名 + 人事1名',
      is_shared: true,
      interview_detail: {
        interview_type: 'オンライン',
        interviewers: [
          { role: 'エンジニア', count: 2, memo: 'バックエンド担当エンジニア' },
          { role: '人事', count: 1, memo: null },
        ],
      },
    },
    {
      id: 'sp-0001-0000-0000-000000000001',
      stage_type: '書類',
      stage_order: 1,
      date: '2024-03-20',
      result: '合格',
      memo: '이력서 + 포트폴리오 제출',
      is_shared: false,
    },
  ],
  memos: [
    {
      id: 'memo-001',
      title: '1차 면접 준비 사항',
      content:
        '자기소개 1분 버전 준비. 프로젝트 경험 위주로 정리. Go 언어 기초 복습 필요. 메르카리 비즈니스 모델 공부해가기.',
      created_at: '2024-04-10',
    },
    {
      id: 'memo-002',
      title: '회사 조사 메모',
      content:
        '인터넷 최대 개인 간 거래 플랫폼. MAU 2,000만 명 이상. 기술 블로그 활발하고 OSS 기여 높음. 사내 공식 언어 영어.',
      created_at: '2024-03-25',
    },
  ],
};
