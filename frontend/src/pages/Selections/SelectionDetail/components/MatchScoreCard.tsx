import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  aiAnalysis: SelectionDetailData['ai_analysis'];
  isKo: boolean;
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
          borderRadius: '14px',
          p: '22px 24px',
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
  const rankLabel = getScoreRankLabel(match_score);

  return (
    <Box
      sx={{
        background: 'linear-gradient(145deg, #1e3a8a 0%, #2d4fd6 60%, #3d64f4 100%)',
        borderRadius: '14px',
        p: '22px 24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 원 */}
      <Box
        sx={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          bgcolor: 'rgba(255,255,255,0.06)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* 섹션 레이블 */}
      <Typography
        sx={{
          fontSize: '11px',
          fontWeight: 700,
          opacity: 0.65,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          mb: 1.75,
        }}
      >
        AI 매칭 분석
      </Typography>

      {/* 점수 + 순위 배지 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, mb: 0.75 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography
            sx={{ fontSize: '58px', fontWeight: 700, lineHeight: 1, letterSpacing: '-2px' }}
          >
            {scoreInt}
          </Typography>
          <Typography sx={{ fontSize: '15px', opacity: 0.6, pb: 0.75 }}>점</Typography>
        </Box>
        {rankLabel && (
          <Box sx={{ pb: 0.75 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                px: '11px',
                py: '3px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <StarIcon sx={{ fontSize: '11px' }} />
              {rankLabel}
            </Box>
          </Box>
        )}
      </Box>

      {/* 진행 바 */}
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.2)',
          borderRadius: '99px',
          height: '5px',
          mt: 1.75,
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '99px',
            height: '5px',
            width: `${match_score}%`,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: '10px',
          opacity: 0.5,
          textAlign: 'right',
          fontFamily: 'monospace',
          mb: 1.75,
        }}
      >
        기술 스택 매칭 {scoreInt} / 100
      </Typography>

      {/* AI 코멘트 */}
      <Box
        sx={{
          bgcolor: 'rgba(0,0,0,0.18)',
          borderRadius: '8px',
          p: '11px 14px',
        }}
      >
        <Typography sx={{ fontSize: '12px', lineHeight: 1.6, opacity: 0.9 }}>
          {match_summary}
        </Typography>
      </Box>
    </Box>
  );
}

export default MatchScoreCard;
