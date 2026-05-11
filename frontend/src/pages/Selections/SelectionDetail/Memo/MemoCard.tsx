import { Box, Typography } from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import type { SelectionDetailMemo } from '@/api/userCompanies';

interface Props {
  memos: SelectionDetailMemo[];
}

function formatDate(dateStr: string): string {
  const [year, mm, dd] = dateStr.split('-');
  return `${year}.${mm}.${dd}`;
}

function MemoCard({ memos }: Props) {
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
          <NoteAltOutlinedIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>메모</Typography>
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

      {/* 메모 목록 */}
      {memos.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', py: 3 }}>
          작성된 메모가 없습니다.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {memos.map((memo) => (
            <Box
              key={memo.id}
              sx={{
                border: '1px solid #c8d7ff',
                borderRadius: '10px',
                p: 1.8,
                bgcolor: '#edf0ff',
                cursor: 'pointer',
                '&:hover': { boxShadow: '0 1px 6px rgba(61,100,244,0.12)' },
              }}
            >
              {/* 제목 + 날짜 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.6 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#1b1e2e' }}>
                  {memo.title}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#7a82a6', flexShrink: 0, ml: 1, fontFamily: 'monospace' }}>
                  {formatDate(memo.created_at)}
                </Typography>
              </Box>
              {/* 내용 */}
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  color: '#4a5280',
                  lineHeight: 1.65,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {memo.content}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MemoCard;
