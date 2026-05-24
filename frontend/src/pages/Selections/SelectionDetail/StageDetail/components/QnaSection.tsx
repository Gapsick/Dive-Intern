import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import type { QnaItem, InterviewerInfo } from '@/api/selections';

interface Props {
  qnaItems: QnaItem[];
  interviewers: InterviewerInfo[];
}

function QnaSection({ qnaItems, interviewers }: Props) {
  const interviewerMap = new Map(interviewers.map((iv) => [iv.id, iv]));

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
          <QuizIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>질문 / 답변</Typography>
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

      {/* Q&A 목록 */}
      {qnaItems.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', py: 3 }}>
          질문/답변이 없습니다.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {qnaItems.map((item) => {
            const interviewer = item.interviewer_id ? interviewerMap.get(item.interviewer_id) : null;
            return (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid #f0ebe3',
                  borderRadius: '10px',
                  p: 1.8,
                  bgcolor: '#fdfcfa',
                }}
              >
                {/* 번호 배지 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      bgcolor: '#f5f5f5',
                      border: '1px solid #bdbdbd44',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#555' }}>
                      {item.order_index}
                    </Typography>
                  </Box>
                  {interviewer && (
                    <Typography sx={{ fontSize: '0.72rem', color: '#666', fontWeight: 500 }}>
                      {interviewer.role}
                    </Typography>
                  )}
                </Box>

                {/* 질문 */}
                <Typography
                  sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#333', mb: 0.6, pl: 0.5 }}
                >
                  {item.question}
                </Typography>

                {/* 답변 */}
                <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, pl: 0.5 }}>
                  {item.answer}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default QnaSection;
