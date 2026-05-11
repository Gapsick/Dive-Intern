import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import type { SelectionProcessItem } from '@/api/userCompanies';

interface Props {
  processes: SelectionProcessItem[];
  userCompanyId: string;
}

type NodeStatus = 'done' | 'active' | 'fail' | 'idle';

function getNodeStatus(result: string | null): NodeStatus {
  if (result === '合格') return 'done';
  if (result === '待ち') return 'active';
  if (result === '不合格') return 'fail';
  return 'idle';
}

function formatDate(dateStr: string): string {
  const [year, mm, dd] = dateStr.split('-');
  return `${year}.${mm}.${dd}`;
}


function buildDescription(process: SelectionProcessItem): string {
  const parts: string[] = [];
  if (process.interview_detail) {
    const { interview_type, interviewers } = process.interview_detail;
    const ivStr = interviewers.map((iv) => `${iv.role} ${iv.count}명`).join(' + ');
    parts.push(`${interview_type} · ${ivStr}`);
  }
  if (process.coding_test_detail) {
    const { platform, problem_count, duration_minutes, difficulty } = process.coding_test_detail;
    parts.push(`${platform} · ${problem_count}문제 · ${duration_minutes}분 · 난이도 ${difficulty}`);
  }
  if (process.spi_detail) {
    const { platform, duration_minutes } = process.spi_detail;
    parts.push(`${platform} · ${duration_minutes}분`);
  }
  if (process.memo) parts.push(process.memo);
  return parts.join('\n');
}

const RESULT_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  '合格': { label: '합격', bg: '#d5f5ec', color: '#0e9f6e' },
  '待ち': { label: '결과 대기', bg: '#fef3c7', color: '#d68910' },
  '不合格': { label: '불합격', bg: '#fee2e2', color: '#dc2626' },
};
const DEFAULT_BADGE = { label: '대기 중', bg: '#e3e7f0', color: '#7a82a6' };

const CARD_VARIANT: Record<NodeStatus, { bg: string; topColor: string }> = {
  done:   { bg: '#f0fdf9', topColor: '#0e9f6e' },
  active: { bg: '#fffdf0', topColor: '#d68910' },
  fail:   { bg: '#fef2f2', topColor: '#dc2626' },
  idle:   { bg: '#f7f8fb', topColor: '#e3e7f0' },
};

const NODE_STYLE: Record<NodeStatus, { bgcolor: string; color: string; shadow?: string }> = {
  done:   { bgcolor: '#0e9f6e', color: 'white' },
  active: { bgcolor: '#d68910', color: 'white', shadow: '0 0 0 4px #fef3c7' },
  fail:   { bgcolor: '#dc2626', color: 'white' },
  idle:   { bgcolor: '#e3e7f0', color: '#7a82a6' },
};

const LABEL_COLOR: Record<NodeStatus, string> = {
  done:   '#0e9f6e',
  active: '#d68910',
  fail:   '#dc2626',
  idle:   '#7a82a6',
};

// 현재는 面接 타입만 상세 페이지가 구현되어 있음
function isNavigable(stageType: string): boolean {
  return stageType === '面接';
}

function SelectionStagesCard({ processes, userCompanyId }: Props) {
  const navigate = useNavigate();
  const sorted = [...processes].sort((a, b) => a.stage_order - b.stage_order);

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

      {sorted.length === 0 ? (
        <Typography sx={{ fontSize: '0.85rem', color: '#aaa', textAlign: 'center', py: 3 }}>
          기록된 전형이 없습니다.
        </Typography>
      ) : (
        <>
          {/* 진행 바 */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 0.5, mb: 2.75 }}>
            {sorted.map((process, idx) => {
              const nodeStatus = getNodeStatus(process.result);
              const prevDone = idx > 0 && sorted[idx - 1].result === '合格';
              const nodeStyle = NODE_STYLE[nodeStatus];

              return (
                <Fragment key={process.id}>
                  {/* 이전 노드와의 연결선 */}
                  {idx > 0 && (
                    <Box
                      sx={{
                        flex: 1,
                        height: '2px',
                        mt: '-14px',
                        bgcolor: prevDone ? '#0e9f6e' : '#e3e7f0',
                      }}
                    />
                  )}
                  {/* 노드 */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        bgcolor: nodeStyle.bgcolor,
                        color: nodeStyle.color,
                        boxShadow: nodeStyle.shadow,
                      }}
                    >
                      {nodeStatus === 'done' && <CheckIcon sx={{ fontSize: '14px' }} />}
                      {nodeStatus === 'fail' && <CloseIcon sx={{ fontSize: '14px' }} />}
                      {(nodeStatus === 'active' || nodeStatus === 'idle') && (
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'inherit' }}>
                          {idx + 1}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: LABEL_COLOR[nodeStatus],
                      }}
                    >
                      {process.stage_type}
                    </Typography>
                  </Box>
                </Fragment>
              );
            })}
          </Box>

          {/* 카드 그리드 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            {sorted.map((process, idx) => {
              const nodeStatus = getNodeStatus(process.result);
              const variant = CARD_VARIANT[nodeStatus];
              const badge = process.result ? (RESULT_BADGE[process.result] ?? DEFAULT_BADGE) : DEFAULT_BADGE;
              const desc = buildDescription(process);
              const navigable = isNavigable(process.stage_type);

              return (
                <Box
                  key={process.id}
                  onClick={
                    navigable
                      ? () => navigate(`/selections/${userCompanyId}/stages/${process.id}`)
                      : undefined
                  }
                  sx={{
                    borderRadius: '10px',
                    border: '1px solid #e3e7f0',
                    borderTop: `3px solid ${variant.topColor}`,
                    bgcolor: variant.bg,
                    p: 2,
                    cursor: navigable ? 'pointer' : 'default',
                    transition: 'box-shadow 0.2s',
                    '&:hover': navigable ? { boxShadow: '0 4px 14px rgba(0,0,0,0.08)' } : {},
                  }}
                >
                  <Typography
                    sx={{ fontSize: '10px', fontFamily: 'monospace', color: '#7a82a6', mb: 0.875 }}
                  >
                    STEP {String(idx + 1).padStart(2, '0')}
                  </Typography>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 0.25 }}>
                    {process.stage_type}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '11px', color: '#7a82a6', fontFamily: 'monospace', mb: 1.25 }}
                  >
                    {process.date ? formatDate(process.date) : '—'}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-block',
                      borderRadius: '20px',
                      px: 1.25,
                      py: '2px',
                      bgcolor: badge.bg,
                      color: badge.color,
                      fontSize: '11px',
                      fontWeight: 700,
                      mb: desc ? 1.25 : 0,
                    }}
                  >
                    {badge.label}
                  </Box>
                  {desc && (
                    <Typography
                      sx={{ fontSize: '12px', color: '#7a82a6', lineHeight: 1.6, display: 'block' }}
                    >
                      {desc}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}

export default SelectionStagesCard;
