import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { companiesApi, type CompanyListItem } from '@/api/companies';
import { schedulesApi, type UpcomingScheduleItem } from '@/api/schedules';
import { userCompaniesApi, type ApplicationStatusSummary } from '@/api/userCompanies';
import ApplicationStatus from './ApplicationStatus';
import RecommendedCompanies from './RecommendedCompanies';
import UpcomingSchedules from './UpcomingSchedules';

function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [schedules, setSchedules] = useState<UpcomingScheduleItem[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatusSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [schedulesLoading, setSchedulesLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    // AI 추천 기업 (간단히 전체 기업 리스트로 대체)
    companiesApi.getAll()
      .then(setCompanies)
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // 학생 ID가 없는 경우 API 호출하지 않음
    if (!user?.studentId) {
      return;
    }
    // 일정
    schedulesApi.getUpcoming(user.studentId)
      .then(setSchedules)
      .catch(() => setSchedules([]))
      .finally(() => setSchedulesLoading(false));

    // 지원 현황
    setStatusLoading(true); // 로딩 상태 시작
    userCompaniesApi.getSummary(user.studentId)
      .then(setApplicationStatus)
      .catch(() => setApplicationStatus(null))
      .finally(() => setStatusLoading(false)); // 지원 현황 로딩 완료
  }, [user?.studentId]);

  const isLogin = Boolean(user?.name);

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 3 }}>
        안녕하세요, {user?.name ?? '사용자'} 님
      </Typography>

      {/* 지원 상태 */}
      <ApplicationStatus
        data={applicationStatus ?? { total: 0, byStatus: {} }}
        isLogin={isLogin}
        loading={statusLoading}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          // AI 추천 기업
          <RecommendedCompanies companies={companies} />
        )}
        {/* 일정 */}
        {isLogin && schedulesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <UpcomingSchedules schedules={schedules} isLogin={isLogin} />
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
