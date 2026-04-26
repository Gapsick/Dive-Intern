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
}
