import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  findAll() {
    return this.scheduleRepository.find();
  }

  findOne(id: string) {
    return this.scheduleRepository.findOne({ where: { id } });
  }

  async findUpcoming(studentId: string) {
    // 임시: mock data 날짜 기준 (운영에서는 new Date()로 변경)
    const today = new Date('2024-05-01T00:00:00Z');

    const rows = await this.scheduleRepository
      .createQueryBuilder('s')
      .where('s.user = :studentId', { studentId })
      .andWhere('s.start_at >= :today', { today })
      .orderBy('s.start_at', 'ASC')
      .getRawMany();

    return rows.map((row: Record<string, unknown>) => ({
      id: row.s_id,
      title: row.s_title,
      schedule_type: row.s_schedule_type ?? null,
      start_at: row.s_start_at,
      end_at: row.s_end_at ?? null,
      user_company_id: row.s_user_company_id ?? null,
    }));
  }
}
