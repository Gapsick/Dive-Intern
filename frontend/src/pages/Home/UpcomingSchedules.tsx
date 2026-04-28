import { Box, Typography, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import type { UpcomingScheduleItem } from '@/api/schedules';

interface Props {
  schedules: UpcomingScheduleItem[];
  isLogin: boolean;
}

const SCHEDULE_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  '面接': { bg: '#fff0eb', text: '#d97b4e' },
  '書類締切': { bg: '#fff0f0', text: '#cc4444' },
  'コーディングテスト': { bg: '#f0eeff', text: '#7b5dd9' },
  'SPI': { bg: '#eef5ff', text: '#4477cc' },
  '説明会': { bg: '#eefff0', text: '#44aa66' },
  'その他': { bg: '#f5f5f5', text: '#666' },
};

function ScheduleTypeBadge({ type }: { type: string }) {
  const colors = SCHEDULE_TYPE_COLORS[type] ?? SCHEDULE_TYPE_COLORS['その他'];
  return (
    <Box
      component="span"
      sx={{
        bgcolor: colors.bg,
        color: colors.text,
        borderRadius: '8px',
        px: 1,
        py: 0.25,
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {type}
    </Box>
  );
}

function UpcomingSchedules({ schedules, isLogin }: Props) {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        background: '#fff',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon sx={{ fontSize: '1rem', color: '#5b8dd9' }} />
          <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>다가오는 일정</Typography>
        </Box>
        {isLogin && (
          <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: '8px', color: '#555', borderColor: '#ccc', fontSize: '0.8rem' }}
            onClick={() => navigate('/schedules')}
          >
            더보기
          </Button>
        )}
      </Box>

      {isLogin && schedules.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {schedules.map((schedule, index) => {
          // timezone 고려해서 날짜 계산
          const [datePart, timePart] = schedule.start_at.split('T');
          const [, month, day] = datePart.split('-');
          const time = timePart.substring(0, 5);

          const now = new Date();
          const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
          const scheduleUTC = new Date(datePart + 'T00:00:00.000Z').getTime();
          const diffDays = Math.round((scheduleUTC - todayUTC) / (1000 * 60 * 60 * 24));

          const scheduleType = schedule.schedule_type ?? 'その他';

          return (
            <Box
              key={schedule.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                borderBottom: index < schedules.length - 1 ? '1px solid #f0ebe3' : 'none',
              }}
            >
              {/* 날짜 */}
              <Box sx={{ minWidth: '36px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.1 }}>{day}</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' }}>
                  {getMonthLabel(month)}
                </Typography>
              </Box>

              {/* 일정 정보 */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {schedule.title}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#888' }}>
                  {time}
                </Typography>
              </Box>

              <ScheduleTypeBadge type={scheduleType} />

              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#d97b4e',
                  minWidth: '40px',
                  textAlign: 'right',
                }}
              >
                D-{diffDays}
              </Typography>
            </Box>
          );
        })}
      </Box>
      ) : (
        <Typography sx={{ fontSize: '0.9rem', color: '#555', textAlign: 'center', py: 4 }}>
          {isLogin ? '다음 일정이 없습니다.' : '로그인 후 다가오는 일정을 확인할 수 있습니다.'}
        </Typography>
      )}
    </Box>
  );
}

function getMonthLabel(month: string): string {
  const labels: Record<string, string> = {
    '01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR',
    '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AUG',
    '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC',
  };
  return labels[month] ?? month;
}

export default UpcomingSchedules;
