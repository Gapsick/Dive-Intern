import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectionProcess } from './entities/selection-process.entity';
import { UserCompany } from '../user-companies/entities/user-company.entity';
import { InterviewDetail } from './entities/interview-detail.entity';
import { Interviewer } from './entities/interviewer.entity';
import { InterviewerQna } from './entities/interviewer-qna.entity';
import { SelectionItemDto } from './dto/selection-item.dto';
import { InterviewDetailResponseDto } from './dto/interview-detail.dto';

@Injectable()
export class SelectionProcessesService {
  constructor(
    @InjectRepository(SelectionProcess)
    private readonly selectionProcessRepository: Repository<SelectionProcess>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
    @InjectRepository(InterviewDetail)
    private readonly interviewDetailRepo: Repository<InterviewDetail>,
    @InjectRepository(Interviewer)
    private readonly interviewerRepo: Repository<Interviewer>,
    @InjectRepository(InterviewerQna)
    private readonly interviewerQnaRepo: Repository<InterviewerQna>,
  ) {}

  findAll() {
    return this.selectionProcessRepository.find();
  }

  findOne(id: string) {
    return this.selectionProcessRepository.findOne({ where: { id } });
  }

  // 면접 상세 정보 조회 메서드
  async getInterviewDetail(id: string): Promise<InterviewDetailResponseDto> {
    // 1. selection_process id 기준으로, 면접 상세 정보 조회
    // -> user_company_id, 회사명, 전형 단계, 날짜, 결과, 메모 등 포함
    const process = await this.selectionProcessRepository
      .createQueryBuilder('sp')
      .leftJoinAndSelect('sp.user_company', 'uc')
      .leftJoinAndSelect('uc.job_posting', 'jp')
      .leftJoinAndSelect('jp.company', 'co')
      .leftJoinAndSelect('co.translations', 'ct')
      .where('sp.id = :id', { id })
      .getOne();

    // 존재하지 않는 전형 단계 id인 경우 404 에러 반환
    if (!process) {
      throw new NotFoundException(`SelectionProcess ${id} not found`);
    }

    const company = process.user_company?.job_posting?.company;
    const companyName =
      company?.translations?.find((t) => t.lang === 'ja')?.name ?? null;

    // 2. interview_detail, interviewer, qna 정보는 selection_process id 기준으로 조회
    // -> 존재여부 체크: interview_detail이 존재하지 않는 경우, 면접 상세 정보가 없다는 의미이므로 404 에러 반환
    const interviewDetail = await this.interviewDetailRepo.findOne({
      where: { selection_process: { id } },
    });

    if (!interviewDetail) {
      throw new NotFoundException(
        `InterviewDetail for process ${id} not found`,
      );
    }

    const interviewers = await this.interviewerRepo.find({
      where: { interview_detail: { id: interviewDetail.id } },
    });

    const allQna = await this.interviewerQnaRepo.find({
      where: { interview_detail: { id: interviewDetail.id } },
      relations: ['interviewer'],
      order: { order_index: 'ASC' },
    });

    // 4. 조회한 정보들을 InterviewDetailResponseDto 형태로 매핑하여 반환
    const toDateStr = (d: Date | string | null | undefined): string | null => {
      if (!d) return null;
      const date = d instanceof Date ? d : new Date(d);
      return date.toISOString().split('T')[0];
    };

    return {
      selection_process_id: process.id,
      user_company_id: process.user_company?.id ?? '',
      company_name: companyName,
      stage_order: process.stage_order,
      stage_type: process.stage_type,
      date: toDateStr(process.date), // 날짜는 'YYYY-MM-DD' 형식의 문자열로 변환
      result: process.result ?? null,
      memo: process.memo ?? null,
      is_shared: process.is_shared,
      interview_type: interviewDetail.interview_type ?? null,
      interviewers: interviewers.map((iv) => ({
        id: iv.id,
        role: iv.role,
        count: iv.count,
        memo: iv.memo ?? null,
      })),
      qna_items: allQna
        .filter((q) => q.question != null)
        .map((q) => ({
          id: q.id,
          order_index: q.order_index,
          question: q.question,
          answer: q.answer,
          interviewer_id: q.interviewer?.id ?? null,
        })),
      reverse_qna_items: allQna
        .filter((q) => q.reverse_question != null)
        .map((q) => ({
          id: q.id,
          order_index: q.order_index,
          reverse_question: q.reverse_question,
          impression: q.impression ?? null,
          interviewer_id: q.interviewer?.id ?? null,
        })),
    };
  }

  // 학생의 지원 기업 리스트 + 각 기업별 최신 전형 단계, 
  // 다음 일정, AI 매칭 점수 등을 한 번에 조회하는 메서드
  async findByStudentId(studentId: string): Promise<SelectionItemDto[]> {
    type RawRow = {
      id: string;
      status: string;
      company_id: string;
      industry: string;
      region: string;
      logo_url: string;
      name_ko: string;
      name_ja: string;
      description_ko: string;
      description_ja: string;
      position_ko: string;
      position_ja: string;
      match_score: number;
    };

    // Query 1: user_companies + company + bilingual translations + ai_analysis (single round-trip)
    // 정보: 기업명, 산업, 지역, 로고, 설명, 포지션, 지원 상태, AI 매칭 점수
    const rows = (await this.userCompanyRepository
      .createQueryBuilder('uc')
      .innerJoin('uc.job_posting', 'jp')
      .innerJoin('jp.company', 'c')
      .leftJoin('c.translations', 'ct_ko', 'ct_ko.lang = :ko', { ko: 'ko' })
      .leftJoin('c.translations', 'ct_ja', 'ct_ja.lang = :ja', { ja: 'ja' })
      .leftJoin('jp.translations', 'jpt_ko', 'jpt_ko.lang = :ko')
      .leftJoin('jp.translations', 'jpt_ja', 'jpt_ja.lang = :ja')
      .leftJoin('ai_analyses', 'aa', 'aa.user_company_id = uc.id')
      .select('uc.id', 'id')
      .addSelect('uc.status', 'status')
      .addSelect('c.id', 'company_id')
      .addSelect('c.industry', 'industry')
      .addSelect('c.region', 'region')
      .addSelect('c.logo_url', 'logo_url')
      .addSelect('ct_ko.name', 'name_ko')
      .addSelect('ct_ja.name', 'name_ja')
      .addSelect('ct_ko.description', 'description_ko')
      .addSelect('ct_ja.description', 'description_ja')
      .addSelect('jpt_ko.position', 'position_ko')
      .addSelect('jpt_ja.position', 'position_ja')
      .addSelect('aa.match_score', 'match_score')
      .where('uc.user = :studentId', { studentId })
      .getRawMany()) as RawRow[];

    if (rows.length === 0) return [];

    // id를 기준으로 user_company 레코드들이 그룹화되어야 하므로, 
    // 이후 쿼리에서 사용할 id 리스트 추출
    const ucIds = rows.map((r) => r.id);
    const companyIds = [...new Set(rows.map((r) => r.company_id))];
    // 이후 N+1 방지 위해, 기업별 기술 스택과 전형 단계, 다음 일정 정보를 미리 한 번에 조회
    const manager = this.userCompanyRepository.manager;

    // Query 2: 기업별 기술 스택 리스트 (for tech_stacks field)
    const tsBulk: { company_id: string; name: string }[] = companyIds.length
      ? await manager.query(
          `SELECT cts.company_id, ts.name
           FROM company_tech_stacks cts
           INNER JOIN tech_stacks ts ON ts.id = cts.tech_stack_id
           WHERE cts.company_id IN (${companyIds.map(() => '?').join(',')})`,
          companyIds,
        )
      : [];
    const techStackMap = new Map<string, string[]>();
    for (const { company_id, name } of tsBulk) {
      const arr = techStackMap.get(company_id) ?? [];
      arr.push(name);
      techStackMap.set(company_id, arr);
    }

    // Query 3: latest selection_process stage per user_company (for current_stage_label)
    // 정보 : 전형 단계 (stage_type) - 서류, 면접, 코테 등
    const spBulk: { user_company_id: string; stage_type: string }[] = await manager.query(
      `SELECT sp.user_company_id, sp.stage_type
       FROM selection_processes sp
       INNER JOIN (
         SELECT user_company_id, MAX(stage_order) AS max_order
         FROM selection_processes
         WHERE user_company_id IN (${ucIds.map(() => '?').join(',')})
         GROUP BY user_company_id
       ) latest ON sp.user_company_id = latest.user_company_id
         AND sp.stage_order = latest.max_order`,
        ucIds,
      );
    const stageMap = new Map<string, string>();
    for (const { user_company_id, stage_type } of spBulk) {
      stageMap.set(user_company_id, stage_type);
    }

    // Query 4: earliest upcoming schedule per user_company (for next_event)
    // 정보: 다음 일정의 종류 (schedule_type) - 면접, 과제 제출 등 + 날짜
    // !!! 날짜 필터링: 오늘 이후 일정 
    // -> mock 데이터 기준으로 2024-05-01로 고정 -> NOW()로 변경 예정
    const schedBulk: { user_company_id: string; schedule_type: string; start_at: string }[] =
      await manager.query(
        `SELECT s.user_company_id, s.schedule_type, s.start_at
         FROM schedules s
         INNER JOIN (
           SELECT user_company_id, MIN(start_at) AS next_at
           FROM schedules
           WHERE user_company_id IN (${ucIds.map(() => '?').join(',')})
             AND start_at >= '2024-05-01 00:00:00'
           GROUP BY user_company_id
         ) ns ON s.user_company_id = ns.user_company_id AND s.start_at = ns.next_at`,
        ucIds,
      );
    const scheduleMap = new Map<string, { label: string; date: string }>();
    for (const { user_company_id, schedule_type, start_at } of schedBulk) {
      scheduleMap.set(user_company_id, {
        label: schedule_type,
        date: new Date(start_at).toISOString().split('T')[0],
      });
    }
    // 최종 매핑: 각 user_company 레코드에 대해, 
    // 위에서 조회한 정보들을 조합하여 SelectionItemDto 형태로 반환
    return rows.map((row): SelectionItemDto => {
      // user_company_id 기준으로 다음 일정 정보 조회
      const nextEvent = scheduleMap.get(row.id); 

      return {
        id: row.id,
        name_ko: row.name_ko ?? null,
        name_ja: row.name_ja ?? null,
        industry: row.industry ?? null,
        region: row.region ?? null,
        logo_url: row.logo_url ?? null,
        description_ko: row.description_ko ?? null,
        description_ja: row.description_ja ?? null,
        position_ko: row.position_ko ?? null,
        position_ja: row.position_ja ?? null,
        tech_stacks: techStackMap.get(row.company_id) ?? [],
        status: row.status ?? null,
        current_stage_label: stageMap.get(row.id) ?? null,
        match_score: row.match_score != null ? Number(row.match_score) : null,
        next_event_label: nextEvent?.label ?? null,
        next_event_date: nextEvent?.date ?? null,
      };
    });
  }
}
