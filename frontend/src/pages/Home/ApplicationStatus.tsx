import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ApplicationStatusSummary } from '@/api/userCompanies';

interface Props {
  data: ApplicationStatusSummary;
  isLogin: boolean;
  loading?: boolean;
}

// 지원 상태별 색상 및 라벨 설정
const STATUS_CONFIG: { keys: string[]; label: string; color: string }[] = [
  { keys: ['서류준비', '書類'],  label: '서류', color: '#b8a585' },
  { keys: ['지원완료'],             label: '지원완료', color: '#5b8dd9' },
  { keys: ['SPI'],                  label: 'SPI',     color: '#7c6fb0' },
  { keys: ['면접', '面接'],         label: '면접',    color: '#d97b4e' },
  { keys: ['합격', '合格'],         label: '합격',    color: '#4a9e6b' },
  { keys: ['불합격', '不合格'],     label: '불합격',  color: '#8c8c8c' },
];

function ApplicationStatus({ data, isLogin, loading }: Props) {
  const navigate = useNavigate();

  // 상태별 지원 건수 계산 후, 0건인 상태는 제외
  const activeStatuses = STATUS_CONFIG
    .map((config) => ({
      ...config,
      count: config.keys.reduce((sum, k) => sum + (data.byStatus[k] ?? 0), 0),
    }))
    .filter(({ count }) => count > 0);

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : isLogin && activeStatuses.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', mb: 1.5 }}>
            {activeStatuses.map(({ label, color, count }) => (
              <Box
                key={label}
                sx={{ flex: count, background: color }}
              />
            ))}
          </Box>

          {/* 범례 */}
          <Box sx={{ display: 'flex', gap: 2.4, flexWrap: 'wrap' }}>
            {activeStatuses.map(({ label, color, count }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  component="span"
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: color,
                    display: 'inline-block',
                  }}
                />
                <Typography component="span" sx={{ fontSize: '0.85rem', color: '#555' }}>
                  {label}
                </Typography>
                <Typography component="span" sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#555' }}>
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Typography sx={{ fontSize: '0.9rem', color: '#555', textAlign: 'center', py: 4 }}>
          {isLogin ? '지원 현황이 없습니다.' : '로그인 후 지원 현황을 확인할 수 있습니다.'}
        </Typography>
      )}
    </Box>
  );
}

export default ApplicationStatus;
