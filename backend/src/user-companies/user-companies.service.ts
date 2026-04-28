import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompany } from './entities/user-company.entity';

@Injectable()
export class UserCompaniesService {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepository: Repository<UserCompany>,
  ) {}

  findAll() {
    return this.userCompanyRepository.find();
  }

  findOne(id: string) {
    return this.userCompanyRepository.findOne({ where: { id } });
  }

  async getSummary(studentId: string): Promise<{ total: number; byStatus: Record<string, number> }> {
    const rows = await this.userCompanyRepository
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
}
