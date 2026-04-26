import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

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

  // SELECT * FROM companies
  findAll() {
    return this.companyRepository.find();
  }

  // SELECT * FROM companies WHERE id = ?
  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
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
