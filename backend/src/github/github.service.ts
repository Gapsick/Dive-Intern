import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Anthropic from '@anthropic-ai/sdk';
import { GithubProfile } from './entities/github-profile.entity';
import { Repo } from './entities/repo.entity';

@Injectable()
export class GithubService {
  private readonly anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  constructor(
    @InjectRepository(GithubProfile)
    private readonly githubProfileRepository: Repository<GithubProfile>,
    @InjectRepository(Repo)
    private readonly repoRepository: Repository<Repo>,
  ) {}

  findAll() {
    return this.githubProfileRepository.find();
  }

  findOne(id: string) {
    return this.githubProfileRepository.findOne({ where: { id } });
  }

  // 레포 파일 목록 조회 (Claude Tool 구현체)
  private async getFileTree(username: string, repoName: string): Promise<string> {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/git/trees/HEAD?recursive=1`,
    );
    if (!res.ok) return '파일 목록을 가져올 수 없습니다.';

    const data: any = await res.json();
    if (!data.tree) return '비어 있는 레포입니다.';

    // 소스 파일만 필터링 (바이너리, 패키지 잠금 파일 제외)
    const excluded = ['node_modules', 'dist', 'build', '.git', 'package-lock.json', 'yarn.lock'];
    const files = data.tree
      .filter((f: any) => f.type === 'blob')
      .filter((f: any) => !excluded.some((ex) => f.path.includes(ex)))
      .map((f: any) => f.path)
      .slice(0, 80);

    return files.join('\n');
  }

  // 파일 내용 조회 (Claude Tool 구현체)
  private async getFileContent(username: string, repoName: string, filePath: string): Promise<string> {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`,
    );
    if (!res.ok) return '파일을 읽을 수 없습니다.';

    const data: any = await res.json();

    // 50KB 초과 파일은 스킵
    if (data.size > 50000) return '파일이 너무 큽니다 (50KB 초과).';
    if (!data.content) return '내용이 없습니다.';

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    // 토큰 절약을 위해 10000자로 제한
    return content.slice(0, 10000);
  }

  // 레포 1개를 Claude Agent로 분석
  private async analyzeRepo(username: string, repoName: string): Promise<string> {
    const tools: Anthropic.Tool[] = [
      {
        name: 'get_file_tree',
        description: '레포지토리의 파일 목록을 가져옵니다.',
        input_schema: {
          type: 'object' as const,
          properties: {
            repo_name: { type: 'string', description: '레포지토리 이름' },
          },
          required: ['repo_name'],
        },
      },
      {
        name: 'get_file_content',
        description: '특정 파일의 내용을 읽어옵니다.',
        input_schema: {
          type: 'object' as const,
          properties: {
            repo_name: { type: 'string', description: '레포지토리 이름' },
            file_path: { type: 'string', description: '읽을 파일의 경로' },
          },
          required: ['repo_name', 'file_path'],
        },
      },
    ];

    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: `GitHub 레포지토리 "${repoName}" (작성자: ${username})의 코드를 분석해주세요.
파일 목록을 먼저 확인하고, 핵심 소스 파일 2~4개를 읽어서 다음을 평가해주세요:
- 사용 기술 및 언어
- 코드 구조와 설계 수준
- 눈에 띄는 패턴이나 특징
- 전반적인 개발자 역량 수준 (초급 / 중급 / 고급)

한국어로 간결하게 3~5문장으로 작성해주세요.`,
      },
    ];

    // Claude Agent Tool Use 루프
    // stop_reason이 end_turn이 될 때까지 tool 호출을 처리
    for (let i = 0; i < 10; i++) {
      const response = await this.anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        tools,
        messages,
      });

      if (response.stop_reason === 'end_turn') {
        const textBlock = response.content.find((b: Anthropic.ContentBlock) => b.type === 'text');
        return (textBlock as Anthropic.TextBlock)?.text ?? '분석 결과 없음';
      }

      if (response.stop_reason === 'tool_use') {
        // assistant 응답을 메시지 히스토리에 추가
        messages.push({ role: 'assistant', content: response.content });

        // 요청된 tool들을 실행하고 결과 수집
        const toolResults: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type !== 'tool_use') continue;

          const input = block.input as Record<string, string>;
          let result = '';

          if (block.name === 'get_file_tree') {
            result = await this.getFileTree(username, input.repo_name);
          } else if (block.name === 'get_file_content') {
            result = await this.getFileContent(username, input.repo_name, input.file_path);
          }

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result,
          });
        }

        messages.push({ role: 'user', content: toolResults });
      }
    }

    return '분석 루프 초과';
  }

  // 전체 분석 진입점 — 레포 목록 가져와서 1개씩 AI 분석 후 DB 저장
  async analyze(studentId: string) {
    const profile = await this.githubProfileRepository.findOne({
      where: { user: { student_id: studentId } },
    });

    if (!profile || !profile.github_username) {
      throw new NotFoundException('GitHub 프로필을 찾을 수 없습니다.');
    }

    const username = profile.github_username;

    // 레포 목록 조회
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );
    if (!reposRes.ok) throw new Error(`GitHub API 오류: ${reposRes.status}`);

    const repos: any[] = await reposRes.json();

    // 기존 데이터 삭제
    await this.repoRepository.delete({ github_profile: { id: profile.id } });

    // 레포 1개씩 분석
    const results: { repo_name: string; repo_url: string; analysis: string }[] = [];

    for (const repo of repos) {
      const analysis = await this.analyzeRepo(username, repo.name);

      await this.repoRepository.save(
        this.repoRepository.create({
          github_profile: profile,
          repo_name: repo.name,
          repo_url: repo.html_url,
          analysis,
        }),
      );

      results.push({ repo_name: repo.name, repo_url: repo.html_url, analysis });
    }

    // 분석 완료 시각 기록
    await this.githubProfileRepository.update(profile.id, {
      analyzed_at: new Date(),
    });

    return { repo_count: repos.length, repos: results };
  }
}
