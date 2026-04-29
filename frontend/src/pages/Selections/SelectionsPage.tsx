import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, InputBase, Select, MenuItem, CircularProgress } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useAppSelector } from '@/store/hooks';
import SelectionCategorySection from './SelectionCategorySection';
import { selectionsApi, type SelectionItemDto, type SelectionCategory } from '@/api/selections';

type SortOrder = 'match_score' | 'name' | 'deadline';

function getCategory(status: string | null): SelectionCategory {
  if (status === '合格') return '합격';
  if (status === '不合格') return '불합격';
  if (status === '書類') return '지원 준비';
  return '진행 중인 전형';
}

function SelectionsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const isKo = useAppSelector((state) => state.auth.isKo);
  const isLogin = Boolean(user?.name);

  const [items, setItems] = useState<SelectionItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('match_score');

  useEffect(() => {
    if (!user?.studentId) return;

    setLoading(true);
    setError(null);
    // API 호출
    selectionsApi
      .getByStudentId(user.studentId)
      .then((res) => setItems(res))
      .catch(() => setError('지원 현황을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [user?.studentId]);

  // 검색 + 정렬 적용
  const filtered = useMemo(() => {
    let result = [...items];

    // 검색
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((item) => {
        const name = isKo ? item.name_ko : item.name_ja;
        return (name ?? '').toLowerCase().includes(query);
      });
    }

    // 정렬
    if (sortOrder === 'match_score') {
      result.sort((a, b) => (b.match_score ?? 0) - (a.match_score ?? 0));
    } else if (sortOrder === 'name') {
      result.sort((a, b) => {
        const nameA = (isKo ? a.name_ko : a.name_ja) ?? '';
        const nameB = (isKo ? b.name_ko : b.name_ja) ?? '';
        return nameA.localeCompare(nameB, isKo ? 'ko' : 'ja');
      });
    } else if (sortOrder === 'deadline') {
      result.sort((a, b) => {
        if (!a.next_event_date && !b.next_event_date) return 0;
        if (!a.next_event_date) return 1;
        if (!b.next_event_date) return -1;
        return a.next_event_date.localeCompare(b.next_event_date);
      });
    }

    return result;
  }, [searchQuery, sortOrder, isKo, items]);

  // 카테고리별로 분류
  const preparing = filtered.filter((item) => getCategory(item.status) === '지원 준비');
  const inProgress = filtered.filter((item) => getCategory(item.status) === '진행 중인 전형');
  const passed = filtered.filter((item) => getCategory(item.status) === '합격');
  const failed = filtered.filter((item) => getCategory(item.status) === '불합격');

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 3 }}>
        지원 관리
      </Typography>

      {!isLogin ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            py: 10,
            bgcolor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: '2.5rem', color: '#ccc' }} />
          <Typography sx={{ fontSize: '1rem', color: '#888' }}>
            로그인 후 지원 현황을 확인할 수 있습니다.
          </Typography>
        </Box>
      ): 
      loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={32} />
        </Box>
      ) : 
      error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <Typography sx={{ color: '#d32f2f', fontSize: '0.95rem' }}>{error}</Typography>
        </Box>
      ) : (
        // 정상 출력
        <>
          {/* 검색 + 정렬 바 */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '260px',
                bgcolor: '#fff',
                border: '1px solid #e0d8cc',
                borderRadius: '20px',
                px: 2,
                py: 0.8,
              }}
            >
              <SearchIcon sx={{ fontSize: '1rem', color: '#aaa' }} />
              <InputBase
                placeholder="기업명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ fontSize: '0.9rem', flex: 1 }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                bgcolor: '#fff',
                border: '1px solid #e0d8cc',
                borderRadius: '20px',
                pl: 1.5,
                pr: 0.5,
                py: 0.4,
              }}
            >
              <StarIcon sx={{ fontSize: '0.9rem', color: '#f5a623' }} />
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                variant="standard"
                disableUnderline
                sx={{
                  fontSize: '0.85rem',
                  color: '#555',
                  minWidth: '130px',
                  '& .MuiSelect-select': { py: 0.3 },
                }}
              >
                <MenuItem value="match_score">매칭점수 높은순</MenuItem>
                <MenuItem value="name">이름 순</MenuItem>
                <MenuItem value="deadline">전형이 가까운 순</MenuItem>
              </Select>
            </Box>

            {/* 총 지원수 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 0.5,
                background: 'linear-gradient(135deg, #fde68a 0%, #f5c440 100%)',
                borderRadius: '20px',
                px: 2.2,
                py: 0.8,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(220,170,30,0.35)',
              }}
            >
              <Typography component="span" sx={{ fontSize: '1.3rem', fontWeight: 800, color: '#7a5500', lineHeight: 1 }}>
                {filtered.length}
              </Typography>
              <Typography component="span" sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#9a7010' }}>
                개 지원
              </Typography>
            </Box>
          </Box>

          {/* 진행중 섹션 */}
          <SectionGroupLabel icon={<AutorenewIcon sx={{ fontSize: '0.95rem', color: '#888' }} />} label="진행중" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mb: 3,
            }}
          >
            <SelectionCategorySection category="지원 준비" items={preparing} isKo={isKo} />
            <SelectionCategorySection category="진행 중인 전형" items={inProgress} isKo={isKo} />
          </Box>

          {/* 결과 섹션 */}
          <SectionGroupLabel icon={<AssessmentIcon sx={{ fontSize: '0.95rem', color: '#888' }} />} label="결과" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
            }}
          >
            <SelectionCategorySection category="합격" items={passed} isKo={isKo} compact />
            <SelectionCategorySection category="불합격" items={failed} isKo={isKo} compact />
          </Box>
        </>
      )}
    </Box>
  );
}

interface SectionGroupLabelProps {
  icon: React.ReactNode;
  label: string;
}

// 카테고리별 섹션 헤더 + 스타일
function SectionGroupLabel({ icon, label }: SectionGroupLabelProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
      {icon}
      <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#666' }}>{label}</Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: '#e0d8cc', ml: 0.5 }} />
    </Box>
  );
}

export default SelectionsPage;
