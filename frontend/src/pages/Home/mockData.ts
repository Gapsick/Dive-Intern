// mock_data.sql 기반 홈 페이지용 mock 데이터
import type { CompanyListItem } from '@/api/companies';
import type { UpcomingScheduleItem } from '@/api/schedules';
import type { ApplicationStatusSummary } from '@/api/userCompanies';

export type RecommendedCompany = CompanyListItem;

// 지원현황 mock 데이터
export const mockApplicationStatus: ApplicationStatusSummary = {
  total: 25,
  byStatus: {
    서류준비: 5,
    지원완료: 5,
    면접: 5,
    합격: 5,
    불합격: 5,
  },
};

// AI 추천 기업 mock 데이터 (ai_analyses + companies + job_postings 기반)
export const mockRecommendedCompanies: RecommendedCompany[] = [
  {
    id: 'co-0001-0000-0000-000000000001',
    name_ja: 'メルカリ',
    name_ko: '메루카리',
    industry: 'EC',
    region: '東京',
    logo_url: null,
    description_ja: 'フリマアプリNo.1',
    description_ko: '중고거래 앱 1위',
    tech_stacks: ['Go', 'MySQL'],
    application_deadline: ['2024-05-31'],
  },
  {
    id: 'co-0001-0000-0000-000000000002',
    name_ja: 'サイバーエージェント',
    name_ko: '사이버에이전트',
    industry: 'IT',
    region: '東京',
    logo_url: null,
    description_ja: 'インターネットの総合企業',
    description_ko: '인터넷 종합 기업',
    tech_stacks: ['React', 'NestJS'],
    application_deadline: ['2024-06-10', '2024-06-15'],
  },
  {
    id: 'co-0001-0000-0000-000000000003',
    name_ja: 'LINE',
    name_ko: 'LINE',
    industry: 'IT',
    region: '東京',
    logo_url: null,
    description_ja: 'コミュニケーションアプリLINE',
    description_ko: '커뮤니케이션 앱 LINE',
    tech_stacks: ['TypeScript', 'PostgreSQL'],
    application_deadline: ['2024-06-30', '2024-10-31'],
  },
  {
    id: 'co-0001-0000-0000-000000000004',
    name_ja: '楽天',
    name_ko: '라쿠텐',
    industry: 'IT',
    region: '東京',
    logo_url: null,
    description_ja: '日本最大級のEC/プラットフォーム企業',
    description_ko: '일본 최대 규모의 EC/플랫폼 기업',
    tech_stacks: ['PostgreSQL'],
    application_deadline: ['2024-06-25'],
  },
];

// 다가오는 일정 mock 데이터 (API 응답 형식에 맞춤)
export const mockUpcomingSchedules: UpcomingScheduleItem[] = [
  {
    id: 'b138a8e5-418b-11f1-bc2e-c65ff86e27c9',
    title: 'メルカリ 一次面接',
    schedule_type: '面接',
    start_at: '2024-05-20T10:00:00.000Z',
    end_at: '2024-05-20T11:00:00.000Z',
    user_company_id: 'uc-0001-0000-0000-000000000001',
  },
  {
    id: 'b138b008-418b-11f1-bc2e-c65ff86e27c9',
    title: 'サイバーエージェント 書類締切',
    schedule_type: '書類締切',
    start_at: '2024-06-15T23:59:00.000Z',
    end_at: null,
    user_company_id: 'uc-0001-0000-0000-000000000002',
  },
];
