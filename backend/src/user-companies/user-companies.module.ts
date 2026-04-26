import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompany } from './entities/user-company.entity';
import { UserCompaniesController } from './user-companies.controller';
import { UserCompaniesService } from './user-companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompany])],
  controllers: [UserCompaniesController],
  providers: [UserCompaniesService],
})
export class UserCompaniesModule {}
