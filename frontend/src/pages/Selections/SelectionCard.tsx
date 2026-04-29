import { Box, Typography, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import type { SelectionItemDto } from '@/api/selections';

interface Props {
  item: SelectionItemDto;
  isKo: boolean;
  compact?: boolean;
}

const LOGO_COLORS = ['#5b8dd9', '#d97b4e', '#4a9e6b', '#7b5dd9', '#e05c5c', '#b8935a', '#44aa88'];

function getLogoColor(name: string): string {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return LOGO_COLORS[sum % LOGO_COLORS.length];
}

const STAGE_BADGE: Record<string, { bg: string; color: string }> = {
  '1차 면접': { bg: '#ffebee', color: '#c62828' },
  '2차 면접': { bg: '#ffebee', color: '#c62828' },
  '면접': { bg: '#ffebee', color: '#c62828' },
  'SPI': { bg: '#f3e5f5', color: '#6a1b9a' },
  '코딩 테스트': { bg: '#e8eaf6', color: '#283593' },
};

// D-Day 계산 함수
function calcDDay(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function DDayText({ dDay }: { dDay: number }) {
  const label = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'D-Day' : `D+${Math.abs(dDay)}`;
  const color = dDay <= 3 ? '#d97b4e' : '#888';
  return (
    <Typography component="span" sx={{ fontSize: '0.82rem', fontWeight: 700, color }}>
      {label}
    </Typography>
  );
}

function SelectionCard({ item, isKo, compact = false }: Props) {
  const name = isKo ? (item.name_ko ?? '') : (item.name_ja ?? '');
  const description = isKo ? item.description_ko : item.description_ja;
  const position = isKo ? item.position_ko : item.position_ja;
  const logoColor = getLogoColor(name);
  const initial = name.charAt(0).toUpperCase();
  const isFinished = item.status === '合格' || item.status === '不合格';
  const stageBadge = !isFinished && item.current_stage_label
    ? (STAGE_BADGE[item.current_stage_label] ?? STAGE_BADGE['면접'])
    : null;

  return (
    <Box
      sx={{
        border: '1px solid #e8e0d5',
        borderRadius: '10px',
        p: compact ? 1.5 : 2,
        bgcolor: '#fff',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s',
        '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.12)' },
      }}
    >
      {/* 상단: 로고 + 회사명 + 스테이지 배지 + 점수 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
        {/* 로고 */}
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '8px',
            bgcolor: item.logo_url ? 'transparent' : logoColor,
            border: item.logo_url ? '1px solid #e8e0d5' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {/* 로고 데이터가 있으면 표시, 아니면 초기화 */}
          {item.logo_url ? (
            <Box
              component="img"
              src={item.logo_url}
              alt={name}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{initial}</Typography>
          )}
        </Box>

        {/* 회사명 + 업계/지역 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>
            {item.industry} · {item.region}
          </Typography>
        </Box>

        {/* 스테이지 배지 (진행 중인 전형만) */}
        {stageBadge && item.current_stage_label && (
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: '6px',
              bgcolor: stageBadge.bg,
              color: stageBadge.color,
              fontSize: '0.72rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              alignSelf: 'center',
              flexShrink: 0,
            }}
          >
            {item.current_stage_label}
          </Box>
        )}

        {/* 매칭 점수 */}
        {item.match_score != null && (
          <Box
            component="span"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: '6px',
              bgcolor: '#fdf3e0',
              color: '#b8935a',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              alignSelf: 'center',
              flexShrink: 0,
            }}
          >
            {item.match_score}점
          </Box>
        )}
      </Box>

      {/* compact 모드에서는 여기까지만 표시 */}
      {!compact && (
        <>
          {/* 공고 포지션 + 설명 */}
          <Typography sx={{ fontSize: '0.78rem', color: '#777', mt: 0.5 }}>{position}</Typography>
          <Typography sx={{ fontSize: '0.82rem', color: '#555', mt: 0.5, mb: 1 }} noWrap>
            {description}
          </Typography>

          {/* 기술 스택 */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
            {item.tech_stacks.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.72rem', height: '20px' }}
              />
            ))}
          </Box>

          {/* 다음 일정 */}
          {item.next_event_label && item.next_event_date && (() => {
            const dDay = calcDDay(item.next_event_date);
            const isSoon = dDay <= 3;
            const Icon = isSoon ? AccessTimeIcon : CalendarTodayIcon;
            const [, mm, dd] = item.next_event_date.split('-');
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Icon sx={{ fontSize: '0.9rem', color: isSoon ? '#d97b4e' : '#888' }} />
                  <Typography sx={{ fontSize: '0.8rem', color: isSoon ? '#d97b4e' : '#666' }}>
                    {item.next_event_label} {mm}/{dd}
                  </Typography>
                </Box>
                <DDayText dDay={dDay} />
              </Box>
            );
          })()}
        </>
      )}
    </Box>
  );
}

export default SelectionCard;
