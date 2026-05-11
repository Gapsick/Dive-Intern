import { Box, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  jobPosting: SelectionDetailData['job_posting'];
  isKo: boolean;
}

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <Box>
      <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.3 }}>{label}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}

// D-Day 계산 (접수 마감일용)
function calcDDay(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  const [, mm, dd] = dateStr.split('-');
  return `${mm}/${dd}`;
}

function JobInfoCard({ jobPosting, isKo }: Props) {
  const position = isKo ? jobPosting.position_ko : jobPosting.position_ja;
  const description = isKo ? jobPosting.description_ko : jobPosting.description_ja;
  const majorReq = isKo ? jobPosting.major_requirement_ko : jobPosting.major_requirement_ja;
  const otherReq = isKo ? jobPosting.other_requirements_ko : jobPosting.other_requirements_ja;

  const deadlineDDay = jobPosting.application_deadline ? calcDDay(jobPosting.application_deadline) : null;
  const deadlineLabel = jobPosting.application_deadline
    ? formatDate(jobPosting.application_deadline)
    : null;

  const internPeriod =
    jobPosting.start_date && jobPosting.end_date
      ? `${jobPosting.start_date.slice(0, 7).replace('-', '.')} ~ ${jobPosting.end_date.slice(0, 7).replace('-', '.')}`
      : null;

  const salaryLabel =
    jobPosting.salary_min != null && jobPosting.salary_max != null
      ? ` ¥ ${jobPosting.salary_min.toLocaleString()} ~ ${jobPosting.salary_max.toLocaleString()}`
      : null;

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 2 }}>
        <WorkOutlineIcon sx={{ fontSize: '1rem', color: '#888' }} />
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>채용 정보</Typography>
        {jobPosting.recruit_url && (
          <Box
            component="a"
            href={jobPosting.recruit_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', color: '#aaa', '&:hover': { color: '#5b8dd9' } }}
          >
            <OpenInNewIcon sx={{ fontSize: '0.95rem' }} />
          </Box>
        )}
      </Box>

      {/* 기본 정보 그리드 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
        <InfoRow label="포지션">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{position}</Typography>
        </InfoRow>
        <InfoRow label="고용형태">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{jobPosting.employment_type}</Typography>
        </InfoRow>

        {internPeriod && (
          <InfoRow label="인턴 기간">
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{internPeriod}</Typography>
          </InfoRow>
        )}

        {salaryLabel && (
          <InfoRow label="급여">
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{salaryLabel}</Typography>
          </InfoRow>
        )}

        {jobPosting.work_hours && (
          <InfoRow label="근무시간">
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{jobPosting.work_hours}</Typography>
          </InfoRow>
        )}

        <InfoRow label="원격근무">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {jobPosting.is_remote ? (
              <CheckBoxIcon sx={{ fontSize: '1rem', color: '#4a9e6b' }} />
            ) : (
              <CheckBoxOutlineBlankIcon sx={{ fontSize: '1rem', color: '#aaa' }} />
            )}
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>
              {jobPosting.is_remote ? '가능' : '불가'}
            </Typography>
          </Box>
        </InfoRow>

        {/* 접수 마감일 */}
        {deadlineLabel && (
          <InfoRow label="서류 마감">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <AccessTimeIcon
                sx={{
                  fontSize: '0.9rem',
                  color:
                    deadlineDDay != null && deadlineDDay < 0
                      ? '#aaa'
                      : deadlineDDay != null && deadlineDDay <= 7
                        ? '#d97b4e'
                        : '#aaa',
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: deadlineDDay != null && deadlineDDay < 0 ? '#aaa' : 'inherit',
                  textDecoration: deadlineDDay != null && deadlineDDay < 0 ? 'line-through' : 'none',
                }}
              >
                {deadlineLabel}
              </Typography>
              {deadlineDDay != null && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: deadlineDDay < 0 ? '#aaa' : deadlineDDay <= 7 ? '#d97b4e' : '#888',
                  }}
                >
                  {deadlineDDay < 0
                    ? '마감'
                    : deadlineDDay === 0
                      ? 'D-Day'
                      : `D-${deadlineDDay}`}
                </Typography>
              )}
            </Box>
          </InfoRow>
        )}
      </Box>

      {/* 구분선 */}
      <Box sx={{ height: '1px', bgcolor: '#f0ebe3', mb: 2 }} />

      {/* 직무 내용 */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.5 }}>직무 내용</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65 }}>{description}</Typography>
      </Box>

      {/* 전공 요건 */}
      {majorReq && (
        <Box sx={{ mb: 1.5 }}>
          <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.4 }}>전공 요건</Typography>
          <Box
            sx={{
              display: 'inline-block',
              px: 1.2,
              py: 0.3,
              bgcolor: '#f0f4ff',
              border: '1px solid #d0daff',
              borderRadius: '6px',
            }}
          >
            <Typography sx={{ fontSize: '0.82rem', color: '#3a58c8' }}>{majorReq}</Typography>
          </Box>
        </Box>
      )}

      {/* 기타 요건 */}
      {otherReq && (
        <Box>
          <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.4 }}>기타 요건</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#555' }}>{otherReq}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default JobInfoCard;
