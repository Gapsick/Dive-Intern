import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { githubApi } from '../../api/github';

interface RepoAnalysis {
  repo_name: string;
  repo_url: string;
  analysis: string;
}

function CompaniesPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [repos, setRepos] = useState<RepoAnalysis[]>([]);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError('');
    setRepos([]);
    try {
      const data = await githubApi.analyze();
      setRepos(data.repos);
    } catch {
      setError('GitHub 분석 중 오류가 발생했습니다.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        기업 추천
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={analyzing ? <CircularProgress size={16} /> : <GitHubIcon />}
          onClick={handleAnalyze}
          disabled={analyzing}
        >
          {analyzing ? 'GitHub 분석 중...' : 'GitHub 분석'}
        </Button>
        {analyzing && (
          <Typography variant="body2" color="text.secondary">
            레포지토리를 하나씩 분석하고 있습니다. 잠시 기다려주세요.
          </Typography>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {repos.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              분석 완료
            </Typography>
            <Chip label={`${repos.length}개 레포`} size="small" />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {repos.map((repo) => (
              <Card key={repo.repo_name} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <GitHubIcon fontSize="small" color="action" />
                    <Typography fontWeight={600}>{repo.repo_name}</Typography>
                    <Link
                      href={repo.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </Link>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {repo.analysis}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CompaniesPage;
