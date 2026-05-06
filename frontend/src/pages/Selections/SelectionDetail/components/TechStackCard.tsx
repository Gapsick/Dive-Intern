import { Box, Typography, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import type { SelectionDetailData } from '@/api/userCompanies';

interface Props {
  companyTechStacks: string[];
  userTechStacks: SelectionDetailData['user_tech_stacks'];
}

const LEVEL_LABEL = ['', '입문', '기초', '중급', '심화', '전문가'];

function TechStackCard({ companyTechStacks, userTechStacks }: Props) {
  const userStackNames = userTechStacks.map((t) => t.name);
  const matchingStacks = companyTechStacks.filter((s) => userStackNames.includes(s));

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
        <CodeIcon sx={{ fontSize: '1rem', color: '#888' }} />
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>기술 스택</Typography>
      </Box>

      {/* 2열 레이아웃 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
        {/* 기업 사용 기술 */}
        <Box>
          <Typography sx={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, mb: 1 }}>
            기업 사용 기술
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
            {companyTechStacks.map((tech) => {
              const isMatch = userStackNames.includes(tech);
              return (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    fontSize: '0.75rem',
                    height: '22px',
                    bgcolor: isMatch ? '#e8f5e9' : '#f5f5f5',
                    color: isMatch ? '#2e7d32' : '#666',
                    border: isMatch ? '1px solid #a5d6a7' : '1px solid #e0e0e0',
                    fontWeight: isMatch ? 700 : 400,
                  }}
                />
              );
            })}
          </Box>
        </Box>

        {/* 내 기술 스택 */}
        <Box>
          <Typography sx={{ fontSize: '0.78rem', color: '#888', fontWeight: 600, mb: 1 }}>
            내 기술 스택
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
            {userTechStacks.map((tech) => {
              const isMatch = companyTechStacks.includes(tech.name);
              return (
                <Box
                  key={tech.name}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Chip
                    label={tech.name}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      height: '22px',
                      bgcolor: isMatch ? '#e8f5e9' : '#f5f5f5',
                      color: isMatch ? '#2e7d32' : '#666',
                      border: isMatch ? '1px solid #a5d6a7' : '1px solid #e0e0e0',
                      fontWeight: isMatch ? 700 : 400,
                    }}
                  />
                  {/* 레벨 바 */}
                  <Box sx={{ display: 'flex', gap: 0.3, alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: i <= tech.level ? '#5b8dd9' : '#e0e0e0',
                        }}
                      />
                    ))}
                    <Typography sx={{ fontSize: '0.68rem', color: '#aaa', ml: 0.3 }}>
                      {LEVEL_LABEL[tech.level]}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* 매칭 현황 */}
      {matchingStacks.length > 0 && (
        <Box
          sx={{
            mt: 2,
            pt: 1.5,
            borderTop: '1px solid #f0ebe3',
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: '0.95rem', color: '#4a9e6b' }} />
          <Typography sx={{ fontSize: '0.82rem', color: '#4a9e6b', fontWeight: 600 }}>
            {matchingStacks.length}개 기술 일치
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: '#aaa' }}>
            ({matchingStacks.join(', ')})
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default TechStackCard;
