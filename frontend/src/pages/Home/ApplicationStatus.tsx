import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ApplicationStatusSummary, ApplicationStatus } from './mockData';

interface Props {
  data: ApplicationStatusSummary;
  isLogin: boolean;
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  서류준비: '#b8a585',
  지원완료: '#5b8dd9',
  면접: '#d97b4e',
  합격: '#4a9e6b',
  불합격: '#8c8c8c',
};

function ApplicationStatus({ data, isLogin }: Props) {
  const navigate = useNavigate();
  const statuses = Object.keys(data.byStatus) as ApplicationStatus[];

  return (
    <Box
      component="section"
      sx={{
        background: '#fff',
        borderRadius: '12px',
        p: 3,
        mb: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography component="span" sx={{ fontSize: '2rem', fontWeight: 700 }}>
            {isLogin && data ? data.total : 0}
          </Typography>
          <Typography component="span" sx={{ fontSize: '1rem', color: '#666', ml: 1 }}>
            개 지원
          </Typography>
        </Box>
        {isLogin && (
          <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: '8px', color: '#555', borderColor: '#ccc', fontSize: '0.875rem' }}
            onClick={() => navigate('/selections')}
          >
            지원 관리
          </Button>
        )}
      </Box>

      {/* 진행 바 */}
      {isLogin && data ? (
        <>
        <Box sx={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', mb: 1.5 }}>
          {statuses.map((status) => (
            <Box
              key={status}
              sx={{
                flex: data.byStatus[status],
              background: STATUS_COLORS[status],
            }}
          />
          ))}
        </Box>

        {/* 범례 */}
        <Box sx={{ display: 'flex', gap: 2.4, flexWrap: 'wrap' }}>
          {statuses.map((status) => (
            <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                component="span"
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: STATUS_COLORS[status],
                  display: 'inline-block',
                }}
              />
              <Typography component="span" sx={{ fontSize: '0.85rem', color: '#555' }}>
                {status}
              </Typography>
              <Typography component="span" sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#555' }}>
                {data.byStatus[status]}
              </Typography>
            </Box>
          ))}
        </Box>
        </>
        ) : (
        <Typography sx={{ fontSize: '0.9rem', color: '#555', textAlign: 'center', py: 4 }}>
          로그인 후 지원 현황을 확인할 수 있습니다.
        </Typography>
      )}
    </Box>
  );
}

export default ApplicationStatus;
