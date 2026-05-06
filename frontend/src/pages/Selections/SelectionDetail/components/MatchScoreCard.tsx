import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  aiAnalysis: SelectionDetailData['ai_analysis'];
  isKo: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 85) return '#4a9e6b';
  if (score >= 70) return '#5b8dd9';
  if (score >= 55) return '#d97b4e';
  return '#e05c5c';
}

function getScoreRankLabel(score: number): string | null {
  if (score >= 90) return '상위 5% 매칭';
  if (score >= 80) return '상위 20% 매칭';
  if (score >= 70) return '상위 40% 매칭';
  return null;
}

function MatchScoreCard({ aiAnalysis, isKo: _isKo }: Props) {
  if (!aiAnalysis) {
    return (
      <Box
        sx={{
          border: '1px solid #e8e0d5',
          borderRadius: '12px',
          p: 2.5,
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 2 }}>
          <AutoAwesomeIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>AI 매칭 분석</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', py: 2 }}>
          분석 데이터가 없습니다.
        </Typography>
      </Box>
    );
  }

  const { match_score, match_summary } = aiAnalysis;
  const scoreInt = Math.round(match_score);
  const scoreColor = getScoreColor(match_score);
  const rankLabel = getScoreRankLabel(match_score);

  return (
    <Box
      sx={{
        border: '1px solid #e8e0d5',
        borderRadius: '12px',
        p: 2.5,
        bgcolor: '#fff',
      }}
    >
      {/* 섹션 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <AutoAwesomeIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>AI 매칭 분석</Typography>
        </Box>
      </Box>

      {/* 점수 영역 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 1.5 }}>
        {/* 큰 점수 */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.3 }}>
          <Typography
            sx={{
              fontSize: '3rem',
              fontWeight: 800,
              color: scoreColor,
              lineHeight: 1,
            }}
          >
            {scoreInt}
          </Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: scoreColor }}>점</Typography>
        </Box>

        {/* 순위 배지 */}
        {rankLabel && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              px: 1,
              py: 0.4,
              bgcolor: '#fdf3e0',
              border: '1px solid #f5c440',
              borderRadius: '6px',
              mb: 0.5,
            }}
          >
            <StarIcon sx={{ fontSize: '0.8rem', color: '#f5a623' }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#b8935a' }}>
              {rankLabel}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 점수 바 */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box
          sx={{
            height: '8px',
            borderRadius: '4px',
            bgcolor: '#f0ebe3',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${match_score}%`,
              borderRadius: '4px',
              background: `linear-gradient(90deg, ${scoreColor}88, ${scoreColor})`,
              transition: 'width 0.5s ease',
            }}
          />
        </Box>
        <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mt: 0.4, textAlign: 'right' }}>
          기술 스택 매칭 {scoreInt} / 100
        </Typography>
      </Box>

      {/* 매칭 요약 */}
      <Box
        sx={{
          bgcolor: '#faf7f2',
          border: '1px solid #e8e0d5',
          borderRadius: '8px',
          p: 1.5,
        }}
      >
        <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65 }}>
          {match_summary}
        </Typography>
      </Box>
    </Box>
  );
}

export default MatchScoreCard;
