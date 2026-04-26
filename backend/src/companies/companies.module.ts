import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyTranslation } from './entities/company-translation.entity';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

// forFeature: 이 모듈 안에서 Company entity를 사용하겠다고 TypeORM에 등록
@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyTranslation])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
