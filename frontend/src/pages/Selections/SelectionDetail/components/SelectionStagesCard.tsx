import { Box, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import type { SelectionProcessItem } from '@/api/userCompanies';

interface Props {
  processes: SelectionProcessItem[];
}

const RESULT_STYLE: Record<string, { bg: string; color: string; border: string; label: string }> = {
  '合格': { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7', label: '합격' },
  '不合格': { bg: '#ffebee', color: '#c62828', border: '#ef9a9a', label: '불합격' },
  '待ち': { bg: '#fff8e1', color: '#f57f17', border: '#ffe082', label: '결과 대기' },
};

const STAGE_STYLE: Record<string, { bg: string; color: string }> = {
  '面接': { bg: '#fff3f3', color: '#c62828' },
  'コーディングテスト': { bg: '#e8eaf6', color: '#283593' },
  'SPI': { bg: '#f3e5f5', color: '#6a1b9a' },
  '書類': { bg: '#e3f2fd', color: '#1565c0' },
};

function getDefaultStageStyle(stageType: string) {
  return STAGE_STYLE[stageType] ?? { bg: '#f5f5f5', color: '#555' };
}

function formatDate(dateStr: string): string {
  const [year, mm, dd] = dateStr.split('-');
  return `${year}.${mm}.${dd}`;
}

function SelectionStagesCard({ processes }: Props) {
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
          <AssignmentIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>면접 기록</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
            px: 1,
            py: 0.4,
            border: '1px solid #e8e0d5',
            borderRadius: '8px',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#faf7f2' },
          }}
        >
          <AddIcon sx={{ fontSize: '0.9rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.78rem', color: '#666' }}>추가</Typography>
        </Box>
      </Box>

      {/* 전형 목록 */}
      {processes.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', py: 3 }}>
          기록된 전형이 없습니다.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {processes.map((process, index) => {
            const stageStyle = getDefaultStageStyle(process.stage_type);
            const resultInfo = process.result ? RESULT_STYLE[process.result] : null;

            return (
              <Box
                key={process.id}
                sx={{
                  border: '1px solid #f0ebe3',
                  borderRadius: '10px',
                  p: 1.8,
                  bgcolor: '#fdfcfa',
                }}
              >
                {/* 상단: 순서 번호 + 스테이지 배지 + 날짜 + 결과 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {/* 순서 번호 */}
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      bgcolor: stageStyle.bg,
                      border: `1px solid ${stageStyle.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: stageStyle.color }}>
                      {index + 1}
                    </Typography>
                  </Box>

                  {/* 스테이지 배지 */}
                  <Box
                    sx={{
                      px: 1,
                      py: 0.2,
                      borderRadius: '6px',
                      bgcolor: stageStyle.bg,
                      color: stageStyle.color,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {process.stage_type}
                  </Box>

                  {/* 날짜 */}
                  {process.date && (
                    <Typography sx={{ fontSize: '0.78rem', color: '#888' }}>
                      {formatDate(process.date)}
                    </Typography>
                  )}

                  {/* 결과 배지 */}
                  {resultInfo && (
                    <Box
                      sx={{
                        ml: 'auto',
                        px: 1,
                        py: 0.2,
                        borderRadius: '6px',
                        bgcolor: resultInfo.bg,
                        border: `1px solid ${resultInfo.border}`,
                        color: resultInfo.color,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {resultInfo.label}
                    </Box>
                  )}
                </Box>

                {/* 면접 상세 (면접관 정보) */}
                {process.interview_detail && (
                  <Box sx={{ mb: 0.8 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888', mb: 0.3 }}>
                      {process.interview_detail.interview_type} ·{' '}
                      {process.interview_detail.interviewers
                        .map((iv) => `${iv.role} ${iv.count}명`)
                        .join(' + ')}
                    </Typography>
                  </Box>
                )}

                {/* 코딩테스트 상세 */}
                {process.coding_test_detail && (
                  <Box sx={{ mb: 0.8 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>
                      {process.coding_test_detail.platform} · {process.coding_test_detail.problem_count}문제 ·{' '}
                      {process.coding_test_detail.duration_minutes}분 · 난이도 {process.coding_test_detail.difficulty}
                    </Typography>
                  </Box>
                )}

                {/* SPI 상세 */}
                {process.spi_detail && (
                  <Box sx={{ mb: 0.8 }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#888' }}>
                      {process.spi_detail.platform} · {process.spi_detail.duration_minutes}분
                    </Typography>
                  </Box>
                )}

                {/* 메모 */}
                {process.memo && (
                  <Typography sx={{ fontSize: '0.82rem', color: '#666' }}>{process.memo}</Typography>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* 추가 버튼 (하단) */}
      <Box
        sx={{
          mt: 1.5,
          p: 1,
          border: '1px dashed #e8e0d5',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': { bgcolor: '#faf7f2' },
        }}
      >
        <AddIcon sx={{ fontSize: '0.9rem', color: '#bbb', mr: 0.5 }} />
        <Typography sx={{ fontSize: '0.82rem', color: '#bbb' }}>+ 새 면접 기록 추가하기</Typography>
      </Box>
    </Box>
  );
}

export default SelectionStagesCard;
