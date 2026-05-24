import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import type { InterviewDetailData } from '@/api/selections';

interface Props {
  data: InterviewDetailData;
}

const RESULT_STYLE: Record<string, { bg: string; color: string; border: string; label: string }> = {
  '待ち': { bg: '#fff8e1', color: '#f57f17', border: '#ffe082', label: '결과 대기' },
  '合格': { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7', label: '합격' },
  '不合格': { bg: '#ffebee', color: '#c62828', border: '#ef9a9a', label: '불합격' },
};

const ROLE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  'エンジニア': { bg: '#e8eaf6', color: '#283593', border: '#9fa8da' },
  '人事': { bg: '#fff3f3', color: '#c62828', border: '#ffcdd2' },
  'プロダクトマネージャー': { bg: '#f3e5f5', color: '#6a1b9a', border: '#ce93d8' },
  'クラウドアーキテクト': { bg: '#e3f2fd', color: '#1565c0', border: '#90caf9' },
};

function getDefaultRoleStyle(role: string) {
  return ROLE_STYLE[role] ?? { bg: '#f5f5f5', color: '#555', border: '#ddd' };
}

function InfoField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography sx={{ fontSize: '0.75rem', color: '#999', mb: 0.5, fontWeight: 500 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function InterviewBasicInfo({ data }: Props) {
  const resultStyle = RESULT_STYLE[data.result ?? ''] ?? RESULT_STYLE['待ち'];

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <AssignmentIndIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>면접 기본정보</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
            cursor: 'pointer',
            color: '#d97b4e',
            '&:hover': { opacity: 0.75 },
          }}
        >
          <EditIcon sx={{ fontSize: '0.85rem' }} />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>수정</Typography>
        </Box>
      </Box>

      {/* 기본 정보 그리드 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 2,
          pb: 2.5,
          mb: 2.5,
          borderBottom: '1px solid #f0ebe3',
        }}
      >
        <InfoField label="면접 방식">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {data.interview_type === 'オンライン' ? '화상' : '대면'}
          </Typography>
        </InfoField>
        <InfoField label="날짜">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {(data.date ?? '-').replace(/-/g, '.')}
          </Typography>
        </InfoField>
        <InfoField label="전형 순서">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {data.stage_order}단계
          </Typography>
        </InfoField>
        <InfoField label="결과">
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1,
              py: 0.2,
              borderRadius: '6px',
              bgcolor: resultStyle.bg,
              border: `1px solid ${resultStyle.border}`,
            }}
          >
            <Typography sx={{ fontSize: '0.8rem', color: resultStyle.color, fontWeight: 600 }}>
              {resultStyle.label}
            </Typography>
          </Box>
        </InfoField>
        <InfoField label="공유 여부">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600 }}>
            {data.is_shared ? '공개' : '비공개'}
          </Typography>
        </InfoField>
      </Box>

      {/* 면접관 구성 */}
      <Box sx={{ mb: data.memo ? 2.5 : 0 }}>
        <Typography sx={{ fontSize: '0.8rem', color: '#999', mb: 0.8, fontWeight: 500 }}>
          면접관 구성
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {data.interviewers.map((iv) => {
            const roleStyle = getDefaultRoleStyle(iv.role);
            return (
              <Box
                key={iv.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.2,
                  py: 0.5,
                  bgcolor: roleStyle.bg,
                  border: `1px solid ${roleStyle.border}`,
                  borderRadius: '8px',
                }}
              >
                <Typography sx={{ fontSize: '0.78rem', color: roleStyle.color, fontWeight: 600 }}>
                  {iv.role}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: roleStyle.color }}>
                  {iv.count}명
                </Typography>
                {iv.memo && (
                  <Typography sx={{ fontSize: '0.75rem', color: roleStyle.color, opacity: 0.8 }}>
                    · {iv.memo}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* 메모 */}
      {data.memo && (
        <Box sx={{ pt: 2.5, borderTop: '1px solid #f0ebe3' }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#999', mb: 0.6, fontWeight: 500 }}>
            메모
          </Typography>
          <Typography sx={{ fontSize: '0.87rem', color: '#555', lineHeight: 1.7 }}>
            {data.memo}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default InterviewBasicInfo;
