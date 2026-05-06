import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompany } from './entities/user-company.entity';
import { Memo } from './entities/memo.entity';
import { AiAnalysis } from './entities/ai-analysis.entity';
import { SelectionProcess } from '../selection-processes/entities/selection-process.entity';
import { InterviewDetail } from '../selection-processes/entities/interview-detail.entity';
import { CodingTestDetail } from '../selection-processes/entities/coding-test-detail.entity';
import { SpiDetail } from '../selection-processes/entities/spi-detail.entity';
import { Interviewer } from '../selection-processes/entities/interviewer.entity';
import { UserTechStack } from '../tech-stacks/entities/user-tech-stack.entity';
import { SelectionDetailDto } from './dto/selection-detail.dto';

type ProcessWithDetails = {
  process: SelectionProcess;
  interviewDetail: InterviewDetail | null;
  codingDetail: CodingTestDetail | null;
  spiDetail: SpiDetail | null;
  interviewers: Interviewer[];
};

@Injectable()
export class UserCompaniesService {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepo: Repository<UserCompany>,
    @InjectRepository(Memo)
    private readonly memoRepo: Repository<Memo>,
    @InjectRepository(AiAnalysis)
    private readonly aiAnalysisRepo: Repository<AiAnalysis>,
    @InjectRepository(SelectionProcess)
    private readonly selectionProcessRepo: Repository<SelectionProcess>,
    @InjectRepository(InterviewDetail)
    private readonly interviewDetailRepo: Repository<InterviewDetail>,
    @InjectRepository(CodingTestDetail)
    private readonly codingTestDetailRepo: Repository<CodingTestDetail>,
    @InjectRepository(SpiDetail)
    private readonly spiDetailRepo: Repository<SpiDetail>,
    @InjectRepository(Interviewer)
    private readonly interviewerRepo: Repository<Interviewer>,
    @InjectRepository(UserTechStack)
    private readonly userTechStackRepo: Repository<UserTechStack>,
  ) {}

  findAll() {
    return this.userCompanyRepo.find();
  }

  findOne(id: string) {
    return this.userCompanyRepo.findOne({ where: { id } });
  }

  async getSummary(studentId: string): Promise<{ total: number; byStatus: Record<string, number> }> {
    const rows = await this.userCompanyRepo
      .createQueryBuilder('uc')
      .select('uc.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('uc.student_id = :studentId', { studentId })
      .groupBy('uc.status')
      .getRawMany();

    const byStatus: Record<string, number> = {};
    let total = 0;

    for (const row of rows) {
      const count = Number(row.count);
      byStatus[row.status ?? 'その他'] = count;
      total += count;
    }

    return { total, byStatus };
  }

  async getDetail(id: string): Promise<SelectionDetailDto> {
    // 1. UserCompany + job_posting + company + translations + tech_stacks 를 한 번에 로드
    const uc = await this.userCompanyRepo
      .createQueryBuilder('uc')
      .leftJoinAndSelect('uc.user', 'u')
      .leftJoinAndSelect('uc.job_posting', 'jp')
      .leftJoinAndSelect('jp.company', 'co')
      .leftJoinAndSelect('co.translations', 'cot')
      .leftJoinAndSelect('co.techStacks', 'cts')
      .leftJoinAndSelect('cts.tech_stack', 'ts')
      .leftJoinAndSelect('jp.translations', 'jpt')
      .where('uc.id = :id', { id })
      .getOne();

    if (!uc) {
      throw new NotFoundException(`UserCompany ${id} not found`);
    }

    const studentId = uc.user?.student_id ?? null;

    // 2. 나머지 데이터를 병렬 조회
    const [aiAnalysis, memos, processes, userTechStacks] = await Promise.all([
      this.aiAnalysisRepo.findOne({ where: { user_company: { id } } }),
      this.memoRepo.find({
        where: { user_company: { id } },
        order: { created_at: 'DESC' },
      }),
      this.selectionProcessRepo.find({
        where: { user_company: { id } },
        order: { stage_order: 'ASC' },
      }),
      studentId
        ? this.userTechStackRepo
            .createQueryBuilder('uts')
            .innerJoin('uts.github_profile', 'gp')
            .innerJoin('gp.user', 'u')
            .leftJoinAndSelect('uts.tech_stack', 'ts')
            .where('u.student_id = :studentId', { studentId })
            .getMany()
        : Promise.resolve([]),
    ]);

    // 3. 전형 단계별 상세 정보 조회 (각 process마다 병렬 처리)
    const processesWithDetails = await Promise.all(
      processes.map(async (p) => {
        const [interviewDetail, codingDetail, spiDetail] = await Promise.all([
          this.interviewDetailRepo.findOne({ where: { selection_process: { id: p.id } } }),
          this.codingTestDetailRepo.findOne({ where: { selection_process: { id: p.id } } }),
          this.spiDetailRepo.findOne({ where: { selection_process: { id: p.id } } }),
        ]);

        let interviewers: Interviewer[] = [];
        if (interviewDetail) {
          interviewers = await this.interviewerRepo.find({
            where: { interview_detail: { id: interviewDetail.id } },
          });
        }

        return { process: p, interviewDetail, codingDetail, spiDetail, interviewers };
      }),
    );

    // 4. 응답 DTO 매핑
    const jp = uc.job_posting;
    const co = jp.company;
    const coKo = co.translations?.find((t) => t.lang === 'ko');
    const coJa = co.translations?.find((t) => t.lang === 'ja');
    const jpKo = jp.translations?.find((t) => t.lang === 'ko');
    const jpJa = jp.translations?.find((t) => t.lang === 'ja');
    const companyTechStacks = co.techStacks?.map((cts) => cts.tech_stack.name) ?? [];

    const toDateStr = (d: Date | string | null | undefined): string | null => {
      if (!d) return null;
      const date = d instanceof Date ? d : new Date(d);
      return date.toISOString().split('T')[0];
    };

    return {
      id: uc.id,
      status: uc.status ?? null,
      is_bookmarked: uc.is_bookmarked,
      is_applying: uc.is_applying,
      company: {
        id: co.id,
        name_ja: coJa?.name ?? null,
        name_ko: coKo?.name ?? null,
        industry: co.industry ?? null,
        region: co.region ?? null,
        hp_url: co.hp_url ?? null,
        logo_url: co.logo_url ?? null,
        description_ja: coJa?.description ?? null,
        description_ko: coKo?.description ?? null,
        mvv_ja: coJa?.mvv ?? null,
        mvv_ko: coKo?.mvv ?? null,
        tech_stacks: companyTechStacks,
      },
      job_posting: {
        id: jp.id,
        position_ja: jpJa?.position ?? null,
        position_ko: jpKo?.position ?? null,
        description_ja: jpJa?.description ?? null,
        description_ko: jpKo?.description ?? null,
        employment_type: jp.employment_type ?? null,
        is_remote: jp.is_remote,
        salary_min: jp.salary_min ?? null,
        salary_max: jp.salary_max ?? null,
        term: jp.term ?? null,
        start_date: toDateStr(jp.start_date),
        end_date: toDateStr(jp.end_date),
        application_deadline: toDateStr(jp.application_deadline),
        work_hours: jp.work_hours ?? null,
        major_requirement_ja: jpJa?.major_requirement ?? null,
        major_requirement_ko: jpKo?.major_requirement ?? null,
        other_requirements_ja: jpJa?.other_requirements ?? null,
        other_requirements_ko: jpKo?.other_requirements ?? null,
        recruit_url: jp.recruit_url ?? null,
      },
      ai_analysis: aiAnalysis
        ? { match_score: aiAnalysis.match_score, match_summary: aiAnalysis.match_summary }
        : null,
      user_tech_stacks: userTechStacks.map((uts) => ({
        name: uts.tech_stack.name,
        level: uts.level ?? 0,
      })),
      selection_processes: processesWithDetails.map(({ process: p, interviewDetail, codingDetail, spiDetail, interviewers }: ProcessWithDetails) => ({
        id: p.id,
        stage_type: p.stage_type,
        stage_order: p.stage_order,
        date: toDateStr(p.date),
        result: p.result ?? null,
        memo: p.memo ?? null,
        is_shared: p.is_shared,
        interview_detail: interviewDetail
          ? {
              interview_type: interviewDetail.interview_type,
              interviewers: interviewers.map((iv) => ({
                role: iv.role,
                count: iv.count,
                memo: iv.memo ?? null,
              })),
            }
          : null,
        coding_test_detail: codingDetail
          ? {
              platform: codingDetail.platform,
              problem_count: codingDetail.problem_count,
              duration_minutes: codingDetail.duration_minutes,
              problems: codingDetail.problems,
              difficulty: codingDetail.difficulty,
            }
          : null,
        spi_detail: spiDetail
          ? {
              platform: spiDetail.platform,
              duration_minutes: spiDetail.duration_minutes,
              memo: spiDetail.memo ?? null,
            }
          : null,
      })),
      memos: memos.map((m) => ({
        id: m.id,
        title: m.title ?? '',
        content: m.content ?? '',
        created_at: m.created_at.toISOString().split('T')[0],
      })),
    };
  }
}
