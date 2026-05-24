import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideocamIcon from '@mui/icons-material/Videocam';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import type { InterviewDetailData } from '@/api/selections';

interface Props {
  data: InterviewDetailData;
}

const RESULT_STYLE: Record<string, { bg: string; color: string; border: string; label: string; Icon: React.ElementType }> = {
  '待ち': { bg: '#fff8e1', color: '#f57f17', border: '#ffe082', label: '결과 대기', Icon: HourglassEmptyIcon },
  '合格': { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7', label: '합격', Icon: CheckCircleIcon },
  '不合格': { bg: '#ffebee', color: '#c62828', border: '#ef9a9a', label: '불합격', Icon: CancelIcon },
};

function InterviewHeader({ data }: Props) {
  const navigate = useNavigate();
  const result = RESULT_STYLE[data.result ?? ''] ?? RESULT_STYLE['待ち'];
  const ResultIcon = result.Icon;
  const isOnline = data.interview_type === 'オンライン';

  return (
    <Box>
      {/* 브레드크럼 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
          onClick={() => navigate(`/selections/${data.user_company_id}`)}
        >
          <ArrowBackIcon sx={{ fontSize: '0.9rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.85rem', color: '#888' }}>지원 관리</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#aaa', mx: 0.3 }}>›</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#888' }}>{data.company_name}</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#aaa', mx: 0.3 }}>›</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>
            {data.stage_order}차 면접
          </Typography>
        </Box>
      </Box>

      {/* 헤더 카드 */}
      <Box
        sx={{
          border: '1px solid #e8e0d5',
          borderRadius: '12px',
          p: 2.5,
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* 순서 번호 */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            bgcolor: '#d97b4e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>
            {data.stage_order}
          </Typography>
        </Box>

        {/* 제목 + 배지 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.8 }}>
            {data.company_name} · {data.stage_order}차 면접
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.3,
                px: 1,
                py: 0.25,
                bgcolor: '#fff3f3',
                borderRadius: '6px',
                border: '1px solid #fcc',
              }}
            >
              <VideocamIcon sx={{ fontSize: '0.75rem', color: '#c62828' }} />
              <Typography sx={{ fontSize: '0.78rem', color: '#c62828', fontWeight: 600 }}>
                {isOnline ? '화상면접' : '대면면접'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.3,
                px: 1,
                py: 0.25,
                bgcolor: '#f5f5f5',
                borderRadius: '6px',
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: '0.75rem', color: '#888' }} />
              <Typography sx={{ fontSize: '0.78rem', color: '#666' }}>
                {(data.date ?? '-').replace(/-/g, '.')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ResultIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              bgcolor: result.bg,
              borderColor: result.border,
              color: result.color,
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { bgcolor: result.bg, borderColor: result.border, opacity: 0.85 },
            }}
          >
            {result.label}
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon sx={{ fontSize: '0.85rem !important' }} />}
            sx={{
              fontSize: '0.82rem',
              textTransform: 'none',
              borderRadius: '8px',
              borderColor: '#ef9a9a',
              color: '#c62828',
              '&:hover': { bgcolor: '#fff5f5', borderColor: '#ef9a9a' },
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default InterviewHeader;
