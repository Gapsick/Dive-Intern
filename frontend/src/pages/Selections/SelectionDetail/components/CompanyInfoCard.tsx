import { Box, Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  company: SelectionDetailData['company'];
  isRemote: boolean;
  workHours: string | null;
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
      <Box sx={{ fontSize: '0.88rem', color: '#333' }}>{children}</Box>
    </Box>
  );
}

function CompanyInfoCard({ company, isRemote, workHours, isKo }: Props) {
  const description = isKo ? company.description_ko : company.description_ja;
  const mvv = isKo ? company.mvv_ko : company.mvv_ja;

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
          <ApartmentIcon sx={{ fontSize: '1rem', color: '#888' }} />
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>기업 정보</Typography>
        </Box>
      </Box>

      {/* 기본 정보 그리드 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <InfoRow label="업계">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{company.industry}</Typography>
        </InfoRow>
        <InfoRow label="지역">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>{company.region}</Typography>
        </InfoRow>
        <InfoRow label="원격근무">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isRemote ? (
              <CheckBoxIcon sx={{ fontSize: '1rem', color: '#4a9e6b' }} />
            ) : (
              <CheckBoxOutlineBlankIcon sx={{ fontSize: '1rem', color: '#aaa' }} />
            )}
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>
              {isRemote ? '가능' : '불가'}
            </Typography>
          </Box>
        </InfoRow>
        <InfoRow label="근무시간">
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>
            {workHours ?? '—'}
          </Typography>
        </InfoRow>
      </Box>

      {/* 홈페이지 */}
      {company.hp_url && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.3 }}>홈페이지</Typography>
          <Box
            component="a"
            href={company.hp_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.4,
              fontSize: '0.88rem',
              color: '#5b8dd9',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {company.hp_url.replace(/^https?:\/\//, '')}
            <OpenInNewIcon sx={{ fontSize: '0.75rem' }} />
          </Box>
        </Box>
      )}

      {/* 구분선 */}
      <Box sx={{ height: '1px', bgcolor: '#f0ebe3', mb: 2 }} />

      {/* description */}
      <Typography sx={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.65, mb: mvv ? 1.5 : 0 }}>
        {description}
      </Typography>

      {/* MVV */}
      {mvv && (
        <Box
          sx={{
            bgcolor: '#faf7f2',
            border: '1px solid #e8e0d5',
            borderRadius: '8px',
            px: 2,
            py: 1,
          }}
        >
          <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mb: 0.3 }}>MVV</Typography>
          <Typography sx={{ fontSize: '0.88rem', color: '#555', fontStyle: 'italic' }}>{mvv}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default CompanyInfoCard;
