import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyTranslation } from './entities/company-translation.entity';
import { CompanyTechStack } from './entities/company-tech-stack.entity';
import { JobPosting } from './entities/job-posting.entity';

// @Injectable() → NestJS의 DI(의존성 주입) 컨테이너에 등록
// Controller에서 constructor로 주입받아서 사용
@Injectable()
export class CompaniesService {
  constructor(
    // @InjectRepository(Company) → TypeORM이 자동으로 만들어주는 Repository 주입
    // Repository<Company> → Company entity에 대한 DB 접근 객체
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  // SELECT * FROM companies + translations + techStacks + jobPostings → flat 구조로 반환
  async findAll() {
    const companies = await this.companyRepository.find({
      select: {
        id: true,
        industry: true,
        region: true,
        logo_url: true,
        translations: { lang: true, name: true, description: true },
        techStacks: { id: true, tech_stack: { id: true, name: true } },
        jobPostings: { application_deadline: true },
      },
      relations: ['translations', 'techStacks', 'techStacks.tech_stack', 'jobPostings'],
    });

    return companies.map((company: Company) => {
      const translations = company.translations ?? [];
      const ja = translations.find((t: CompanyTranslation) => t.lang === 'ja');
      const ko = translations.find((t: CompanyTranslation) => t.lang === 'ko');
      const techStacks = company.techStacks ?? [];
      const jobPostings = company.jobPostings ?? [];

      return {
        id: company.id,
        name_ja: ja?.name ?? null,
        name_ko: ko?.name ?? null,
        industry: company.industry,
        region: company.region,
        logo_url: company.logo_url,
        description_ja: ja?.description ?? null,
        description_ko: ko?.description ?? null,
        tech_stacks: techStacks.map((cts: CompanyTechStack) => cts.tech_stack.name),
        application_deadline: jobPostings
          .map((jp: JobPosting) => jp.application_deadline)
          .filter((d: Date | null) => d !== null),
      };
    });
  }

  // SELECT * FROM companies WHERE id = ? + translations
  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id }, relations: ['translations'] });
  }

  // INSERT INTO companies ...
  // create(createCompanyDto: CreateCompanyDto) {
  //   const company = this.companyRepository.create(createCompanyDto);
  //   return this.companyRepository.save(company);
  // }

  // UPDATE companies SET ... WHERE id = ?
  // update(id: string, updateCompanyDto: UpdateCompanyDto) {
  //   return this.companyRepository.update(id, updateCompanyDto);
  // }

  // DELETE FROM companies WHERE id = ?
  // remove(id: string) {
  //   return this.companyRepository.delete(id);
  // }
}
