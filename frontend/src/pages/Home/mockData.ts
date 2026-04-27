// mock_data.sql 기반 홈 페이지용 mock 데이터
import type { CompanyListItem } from '@/api/companies';

export type ApplicationStatus =
  | '서류준비'
  | '지원완료'
  | '면접'
  | '합격'
  | '불합격';

export interface ApplicationStatusSummary {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
}

export type RecommendedCompany = CompanyListItem;

export interface UpcomingSchedule {
  id: string;
  companyName: string;
  title: string;
  scheduleType: string;
  date: string;
  time: string;
  locationType: string;
  dDay: number;
}

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

// 다가오는 일정 mock 데이터 (schedules 기반)
export const mockUpcomingSchedules: UpcomingSchedule[] = [
  {
    id: 'sch-001',
    companyName: 'Mercari',
    title: 'Mercari 1차 면접',
    scheduleType: '면접',
    date: '04/15',
    time: '14:00',
    locationType: '화상면접',
    dDay: -2,
  },
  {
    id: 'sch-002',
    companyName: 'Mercari',
    title: 'Mercari 서류 마감',
    scheduleType: '서류마감',
    date: '04/16',
    time: '23:59',
    locationType: '',
    dDay: -3,
  },
  {
    id: 'sch-003',
    companyName: 'Colopl',
    title: 'Colopl 1차 면접',
    scheduleType: '면접',
    date: '04/17',
    time: '13:00',
    locationType: '대면',
    dDay: -4,
  },
  {
    id: 'sch-004',
    companyName: 'SmartHR',
    title: 'SmartHR 2차 면접',
    scheduleType: '면접',
    date: '04/20',
    time: '15:00',
    locationType: '화상면접',
    dDay: -7,
  },
  {
    id: 'sch-005',
    companyName: 'Recruit',
    title: 'Recruit 회사설명회',
    scheduleType: '설명회',
    date: '04/22',
    time: '10:00',
    locationType: '대면',
    dDay: -9,
  },
  {
    id: 'sch-006',
    companyName: 'Cyberagent',
    title: 'Cyberagent 서류 마감',
    scheduleType: '서류마감',
    date: '04/23',
    time: '23:59',
    locationType: '',
    dDay: -10,
  },
  {
    id: 'sch-007',
    companyName: 'LINE',
    title: 'LINE 코딩테스트',
    scheduleType: '코딩테스트',
    date: '04/25',
    time: '13:00',
    locationType: '온라인',
    dDay: -12,
  },
];
