import { Box, Typography, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  data: SelectionDetailData;
  isKo: boolean;
}

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  '面接': { bg: '#fff3f3', color: '#c62828', border: '#f5c6c6' },
  'SPI': { bg: '#f3e5f5', color: '#6a1b9a', border: '#d4b3e8' },
  'コーディングテスト': { bg: '#e8eaf6', color: '#283593', border: '#b3bce8' },
  '書類': { bg: '#e3f2fd', color: '#1565c0', border: '#b3d4f5' },
  '合格': { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
  '不合格': { bg: '#f5f5f5', color: '#757575', border: '#e0e0e0' },
};

const LOGO_COLORS = ['#5b8dd9', '#d97b4e', '#4a9e6b', '#7b5dd9', '#e05c5c', '#b8935a', '#44aa88'];

function getLogoColor(name: string): string {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return LOGO_COLORS[sum % LOGO_COLORS.length];
}

function DetailHeaderBar({ data, isKo }: Props) {
  const navigate = useNavigate();
  const { company, job_posting, status, is_bookmarked } = data;
  const companyName = isKo ? company.name_ko : company.name_ja;
  const position = isKo ? job_posting.position_ko : job_posting.position_ja;
  const statusStyle = STATUS_STYLE[status] ?? STATUS_STYLE['書類'];
  const logoColor = getLogoColor(companyName);

  return (
    <Box>
      {/* 브레드크럼 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mb: 1.5,
          cursor: 'pointer',
          width: 'fit-content',
        }}
        onClick={() => navigate('/selections')}
      >
        <ArrowBackIcon sx={{ fontSize: '0.9rem', color: '#888' }} />
        <Typography sx={{ fontSize: '0.85rem', color: '#888' }}>지원 관리</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#888' }}>›</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>{companyName}</Typography>
      </Box>

      {/* 기업 헤더 카드 */}
      <Box
        sx={{
          border: '1px solid #e8e0d5',
          borderRadius: '12px',
          p: 2.5,
          bgcolor: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* 로고 */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '10px',
            bgcolor: company.logo_url ? 'transparent' : logoColor,
            border: company.logo_url ? '1px solid #e8e0d5' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {company.logo_url ? (
            <Box
              component="img"
              src={company.logo_url}
              alt={companyName}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              {companyName.charAt(0).toUpperCase()}
            </Typography>
          )}
        </Box>

        {/* 기업명 + 태그 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.6 }}>{companyName}</Typography>
          <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
            <Chip
              label={company.industry}
              size="small"
              sx={{ fontSize: '0.72rem', height: '20px', bgcolor: '#f0f0f0', color: '#555' }}
            />
            <Chip
              label={company.region}
              size="small"
              sx={{ fontSize: '0.72rem', height: '20px', bgcolor: '#f0f0f0', color: '#555' }}
            />
            <Chip
              label={position}
              size="small"
              sx={{ fontSize: '0.72rem', height: '20px', bgcolor: '#f0f0f0', color: '#555' }}
            />
            {job_posting.term && (
              <Chip
                label={job_posting.term}
                size="small"
                sx={{ fontSize: '0.72rem', height: '20px', bgcolor: '#f0f0f0', color: '#555' }}
              />
            )}
            <Chip
              label={job_posting.employment_type}
              size="small"
              sx={{ fontSize: '0.72rem', height: '20px', bgcolor: '#f0f0f0', color: '#555' }}
            />
          </Box>
        </Box>

        {/* 우측: 지원 상태 + 찜 + 채용 페이지 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {/* 지원 상태 배지 */}
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: '8px',
              bgcolor: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              color: statusStyle.color,
              fontSize: '0.82rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {status}
          </Box>

          {/* 찜 버튼 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              px: 1.2,
              py: 0.5,
              border: '1px solid #e8e0d5',
              borderRadius: '8px',
              cursor: 'pointer',
              bgcolor: '#fff',
              '&:hover': { bgcolor: '#faf7f2' },
            }}
          >
            {is_bookmarked ? (
              <BookmarkIcon sx={{ fontSize: '1rem', color: '#d97b4e' }} />
            ) : (
              <BookmarkBorderIcon sx={{ fontSize: '1rem', color: '#aaa' }} />
            )}
            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>찜</Typography>
          </Box>

          {/* 채용 페이지 버튼 */}
          {job_posting.recruit_url && (
            <Button
              variant="contained"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
              href={job_posting.recruit_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: '#4a9e6b',
                '&:hover': { bgcolor: '#3d8a5c' },
                fontSize: '0.82rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                px: 1.5,
                py: 0.6,
                boxShadow: 'none',
              }}
            >
              채용 페이지
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DetailHeaderBar;
