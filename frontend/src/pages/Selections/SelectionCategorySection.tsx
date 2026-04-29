import { Box, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import type { SvgIconComponent } from '@mui/icons-material';
import SelectionCard from './SelectionCard';
import type { SelectionItemDto, SelectionCategory } from '@/api/selections';

interface Props {
  category: SelectionCategory;
  items: SelectionItemDto[];
  isKo: boolean;
  compact?: boolean;
}

interface CategoryConfig {
  headerBg: string;
  color: string;
  Icon: SvgIconComponent;
}

const CATEGORY_CONFIG: Record<SelectionCategory, CategoryConfig> = {
  '지원 준비': {
    headerBg: '#f5edd8',
    color: '#b8935a',
    Icon: DescriptionOutlinedIcon,
  },
  '진행 중인 전형': {
    headerBg: '#deeaff',
    color: '#5b8dd9',
    Icon: TrackChangesIcon,
  },
  '합격': {
    headerBg: '#d4f5e3',
    color: '#4a9e6b',
    Icon: EmojiEventsIcon,
  },
  '불합격': {
    headerBg: '#ebebeb',
    color: '#8c8c8c',
    Icon: CancelOutlinedIcon,
  },
};

function SelectionCategorySection({ category, items, isKo, compact = false }: Props) {
  const { headerBg, color, Icon } = CATEGORY_CONFIG[category];

  return (
    <Box
      sx={{
        borderRadius: '12px',
        border: '1px solid #e8e0d5',
        overflow: 'hidden',
        bgcolor: '#fafafa',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.2,
          bgcolor: headerBg,
        }}
      >
        <Icon sx={{ fontSize: '1rem', color }} />
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color, flex: 1 }}>
          {category}
        </Typography>
        <Box
          component="span"
          sx={{
            minWidth: '22px',
            height: '22px',
            borderRadius: '11px',
            bgcolor: color,
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 0.75,
          }}
        >
          {items.length}
        </Box>
      </Box>

      {/* 카드 목록 */}
      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          flexDirection: compact ? 'row' : 'column',
          flexWrap: compact ? 'wrap' : 'nowrap',
          gap: 1.5,
          maxHeight: compact ? 'none' : '520px',
          overflowY: compact ? 'visible' : 'auto',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#d0c8bc', borderRadius: '4px' },
        }}
      >
        {items.length === 0 ? (
          <Typography sx={{ fontSize: '0.85rem', color: '#aaa', py: 2, textAlign: 'center', width: '100%' }}>
            해당 항목이 없습니다
          </Typography>
        ) : (
          items.map((item) => (
            <Box
              key={item.id}
              sx={compact ? { flex: '1 1 calc(50% - 6px)', minWidth: '160px' } : undefined}
            >
              <SelectionCard item={item} isKo={isKo} compact={compact} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default SelectionCategorySection;
