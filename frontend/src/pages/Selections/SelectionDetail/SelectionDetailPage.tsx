import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { userCompaniesApi } from '@/api/userCompanies';
import type { SelectionDetailData } from '@/api/userCompanies';
import { MOCK_DETAIL } from './mockDetailData';
import DetailHeaderBar from './components/DetailHeaderBar';
import CompanyInfoCard from './components/CompanyInfoCard';
import JobInfoCard from './components/JobInfoCard';
import MatchScoreCard from './components/MatchScoreCard';
import TechStackCard from './components/TechStackCard';
import SelectionStagesCard from './components/SelectionStagesCard';
import MemoCard from './Memo/MemoCard';

function SelectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const isKo = useAppSelector((state) => state.auth.isKo);

  const [data, setData] = useState<SelectionDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    userCompaniesApi
      .getDetail(id)
      .then((res) => setData(res))
      .catch(() => {
        // API 실패 시 mock 데이터로 폴백 (개발 환경) 나중에 삭제
        setData(MOCK_DETAIL);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <Typography sx={{ color: '#d32f2f', fontSize: '0.95rem' }}>
          {error ?? '데이터를 불러오지 못했습니다.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0 auto' }}>
      <DetailHeaderBar data={data} isKo={isKo} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 2.5,
          mt: 2.5,
          alignItems: 'start',
        }}
      >
        {/* 왼쪽 열 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <CompanyInfoCard
            company={data.company}
            isRemote={data.job_posting.is_remote}
            workHours={data.job_posting.work_hours}
            isKo={isKo}
          />
          <JobInfoCard jobPosting={data.job_posting} isKo={isKo} />
          <MatchScoreCard aiAnalysis={data.ai_analysis} isKo={isKo} />
          <TechStackCard
            companyTechStacks={data.company.tech_stacks}
            userTechStacks={data.user_tech_stacks}
          />
        </Box>

        {/* 오른쪽 열 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <MemoCard memos={data.memos} />
          <SelectionStagesCard processes={data.selection_processes} />
        </Box>
      </Box>
    </Box>
  );
}

export default SelectionDetailPage;
