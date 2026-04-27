import { Box, Typography, Button, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import type { CompanyListItem } from '@/api/companies';

interface Props {
  companies: CompanyListItem[];
}

// 배열에서 가장 가까운 미래 마감일 선택, 모두 지난 경우 가장 최근 지난 것 반환
function calcDeadlineInfo(deadlines: string[]): { formatted: string; dDay: number } | null {
  if (deadlines.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const candidates = deadlines.map((d) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    const dDay = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return { formatted: `${month}/${day}`, dDay };
  });

  const upcoming = candidates
    .filter((c) => c.dDay <= 0)
    .sort((a, b) => b.dDay - a.dDay)[0];

  return upcoming ?? candidates.sort((a, b) => a.dDay - b.dDay)[0];
}

function DeadlineBadge({ deadline, dDay }: { deadline: string; dDay: number }) {
  const isDeadlineSoon = dDay >= -3;
  const color = isDeadlineSoon ? '#d97b4e' : '#666';
  const Icon = isDeadlineSoon ? AccessTimeIcon : CalendarTodayIcon;
  return (
    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Icon sx={{ fontSize: '0.9rem', color }} />
      <Typography component="span" sx={{ fontSize: '0.8rem', color }}>
        서류 마감 {deadline} · D{dDay}
      </Typography>
    </Box>
  );
}

function RecommendedCompanies({ companies }: Props) {
  const navigate = useNavigate();
  const isKo = useAppSelector((state) => state.auth.isKo);

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
          <AutoAwesomeIcon sx={{ fontSize: '1rem', color: '#f5a623' }} />
          <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>AI 추천 기업</Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: '8px', color: '#555', borderColor: '#ccc', fontSize: '0.8rem' }}
          onClick={() => navigate('/companies')}
        >
          더보기
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {companies.map((company) => {
          const name = isKo ? company.name_ko : company.name_ja;
          const description = isKo ? company.description_ko : company.description_ja;
          const deadline = calcDeadlineInfo(company.application_deadline);

          return (
            <Box
              key={company.id}
              sx={{
                border: '1px solid #e8e0d5',
                borderRadius: '10px',
                p: 2,
                cursor: 'pointer',
                transition: 'box-shadow 0.15s',
                '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.12)' },
              }}
            >
              <Box sx={{ mb: 0.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{name}</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#888' }}>
                  {company.industry} · {company.region}
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.82rem', color: '#555', mb: 1 }}>{description}</Typography>

              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                {company.tech_stacks.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem', height: '22px' }}
                  />
                ))}
              </Box>

              {deadline && <DeadlineBadge deadline={deadline.formatted} dDay={deadline.dDay} />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default RecommendedCompanies;
