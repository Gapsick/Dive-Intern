import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import type { ReverseQnaItem, InterviewerInfo } from '@/api/selections';

interface Props {
  items: ReverseQnaItem[];
  interviewers: InterviewerInfo[];
}

function ReverseQnaSection({ items, interviewers }: Props) {
  const interviewerMap = new Map(interviewers.map((iv) => [iv.id, iv]));

  return (
    <Box
      sx={{
        border: '1px solid #bbdefb',
        borderRadius: '12px',
        p: 2.5,
        bgcolor: '#f0f7ff',
      }}
    >
      {/* 섹션 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <HelpIcon sx={{ fontSize: '1rem', color: '#1976d2' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#1565c0' }}>역질문</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
            px: 1,
            py: 0.4,
            border: '1px solid #bbdefb',
            borderRadius: '8px',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#e3f2fd' },
          }}
        >
          <AddIcon sx={{ fontSize: '0.9rem', color: '#1976d2' }} />
          <Typography sx={{ fontSize: '0.78rem', color: '#1976d2' }}>추가</Typography>
        </Box>
      </Box>

      {/* 역질문 목록 */}
      {items.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#90caf9', textAlign: 'center', py: 3 }}>
          역질문이 없습니다.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {items.map((item) => {
            const interviewer = item.interviewer_id ? interviewerMap.get(item.interviewer_id) : null;
            return (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid #bbdefb',
                  borderRadius: '10px',
                  p: 1.8,
                  bgcolor: '#fff',
                }}
              >
                {/* 번호 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      bgcolor: '#e3f2fd',
                      border: '1px solid #90caf9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#1565c0' }}>
                      {item.order_index}
                    </Typography>
                  </Box>
                  {interviewer && (
                    <Typography sx={{ fontSize: '0.72rem', color: '#1565c0', fontWeight: 500 }}>
                      {interviewer.role}
                    </Typography>
                  )}
                </Box>

                {/* 역질문 */}
                <Typography
                  sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1565c0', mb: 0.6, pl: 0.5 }}
                >
                  {item.reverse_question}
                </Typography>

                {/* 면접관 답변(인상) */}
                {item.impression ? (
                  <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, pl: 0.5 }}>
                    {item.impression}
                  </Typography>
                ) : (
                  <Typography
                    sx={{ fontSize: '0.82rem', color: '#aaa', fontStyle: 'italic', pl: 0.5 }}
                  >
                    답변 미기록
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default ReverseQnaSection;
