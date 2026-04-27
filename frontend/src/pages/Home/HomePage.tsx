import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { companiesApi, type CompanyListItem } from '@/api/companies';
import ApplicationStatus from './ApplicationStatus';
import RecommendedCompanies from './RecommendedCompanies';
import UpcomingSchedules from './UpcomingSchedules';
import { mockApplicationStatus, mockUpcomingSchedules } from './mockData';

function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    companiesApi.getAll()
      .then(setCompanies)
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  const isLogin = Boolean(user?.name);

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 3 }}>
        안녕하세요, {user?.name ?? '사용자'} 님
      </Typography>
      
      {/* 지원 상태 */}
      <ApplicationStatus data={mockApplicationStatus} isLogin={isLogin} />

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
        <UpcomingSchedules schedules={mockUpcomingSchedules} isLogin={isLogin} />
      </Box>
    </Box>
  );
}

export default HomePage;
