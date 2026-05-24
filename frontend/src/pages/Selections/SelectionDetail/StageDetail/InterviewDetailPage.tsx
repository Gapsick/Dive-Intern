import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { selectionsApi } from '@/api/selections';
import type { InterviewDetailData } from '@/api/selections';
import InterviewHeader from './components/InterviewHeader';
import InterviewBasicInfo from './components/InterviewBasicInfo';
import QnaSection from './components/QnaSection';
import ReverseQnaSection from './components/ReverseQnaSection';

function InterviewDetailPage() {
  const { stageId } = useParams<{ id: string; stageId: string }>();

  const [data, setData] = useState<InterviewDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stageId) return;

    setLoading(true);

    selectionsApi
      .getInterviewDetail(stageId)
      .then((res) => setData(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [stageId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <Typography sx={{ color: '#d32f2f', fontSize: '0.95rem' }}>
          데이터를 불러오지 못했습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0 auto' }}>
      <InterviewHeader data={data} />

      <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <InterviewBasicInfo data={data} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2.5,
            alignItems: 'start',
          }}
        >
          <QnaSection qnaItems={data.qna_items} interviewers={data.interviewers} />
          <ReverseQnaSection items={data.reverse_qna_items} interviewers={data.interviewers} />
        </Box>
      </Box>
    </Box>
  );
}

export default InterviewDetailPage;
